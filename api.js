<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
$cfg = require __DIR__ . '/config.php';

function out($code, $arr) { http_response_code($code); echo json_encode($arr, JSON_UNESCAPED_UNICODE); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(405, ['error' => 'Metode tidak diizinkan.']);

// Batas kecepatan sederhana agar kredit OpenRouter tidak terkuras
$now = microtime(true);
if (isset($_SESSION['last']) && $now - $_SESSION['last'] < 1.2) out(429, ['error' => 'Terlalu cepat, coba lagi sebentar.']);
$_SESSION['last'] = $now;
session_write_close();

$in = json_decode(file_get_contents('php://input'), true);
$msgs = [];
foreach (array_slice($in['messages'] ?? [], -12) as $m) {
  $r = $m['role'] ?? ''; $c = trim((string)($m['content'] ?? ''));
  if (!in_array($r, ['user', 'assistant'], true) || $c === '') continue;
  $msgs[] = ['role' => $r, 'content' => mb_substr($c, 0, 2000)];
}
if (!$msgs || end($msgs)['role'] !== 'user') out(400, ['error' => 'Pesan tidak valid.']);

$or  = $cfg['openrouter'];
$key = getenv('OPENROUTER_API_KEY') ?: $or['api_key'];
if (!$key || $key === 'ISI_API_KEY_OPENROUTER') out(500, ['error' => 'API key OpenRouter belum diisi di config.php.']);

$vm = $cfg['visimisi'];
$system = $cfg['ai']['system_prompt'] . "\n\nDATA JURUSAN:\n" . $cfg['ai']['knowledge']
  . "\n- Visi: " . $vm['visi'] . "\n- Misi: " . implode('; ', $vm['misi']);

$payload = [
  'model'       => $or['model'],
  'messages'    => array_merge([['role' => 'system', 'content' => $system]], $msgs),
  'temperature' => $or['temperature'],
  'max_tokens'  => $or['max_tokens'],
];
if (!empty($or['fallback'])) $payload['models'] = array_merge([$or['model']], $or['fallback']);

$body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE | JSON_PARTIAL_OUTPUT_ON_ERROR);
if ($body === false || empty($payload['messages'])) out(500, ['error' => 'Gagal menyusun permintaan: ' . json_last_error_msg() . '. Pastikan config.php disimpan dengan encoding UTF-8.']);

$ch = curl_init('https://openrouter.ai/api/v1/chat/completions');
curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 60,
  CURLOPT_HTTPHEADER => [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $key,
    'HTTP-Referer: ' . $or['site_url'],
    'X-Title: ' . $or['app_name'],
  ],
  CURLOPT_POSTFIELDS => $body,
]);
$res = curl_exec($ch);
$err = curl_error($ch);
curl_close($ch);

if ($res === false) out(502, ['error' => 'Tidak bisa terhubung ke OpenRouter: ' . $err]);
$data  = json_decode($res, true);
$reply = $data['choices'][0]['message']['content'] ?? null;
if (!$reply) out(502, ['error' => 'Model tidak merespons. ' . ($data['error']['message'] ?? '')]);

out(200, ['reply' => trim($reply)]);
