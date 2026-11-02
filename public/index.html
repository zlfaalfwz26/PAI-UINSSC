<?php
$c = require __DIR__ . '/config.php';
$s = $c['site']; $ai = $c['ai']; $t = $c['tujuan']; $v = $c['visimisi'];
function e($x) { return htmlspecialchars($x, ENT_QUOTES, 'UTF-8'); }
$js = [
  'greeting'    => $ai['greeting'],
  'suggestions' => array_slice($ai['suggestions'], 0, 3),
  'error'       => 'Maaf, terjadi gangguan. Coba lagi sebentar.',
];
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($s['title']) ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/style.css">
<style>:root{--blue:<?= e($s['accent']) ?>}</style>
</head>
<body>
<div class="bg" aria-hidden="true"></div>

<header class="nav" id="nav">
  <a class="logo tap" href="#beranda">
    <svg width="30" height="22" viewBox="0 0 30 22" fill="none"><path d="M2 6c4-5 9-5 13-1 4-4 9-4 13 1-1 8-7 14-13 14S3 14 2 6Z" fill="currentColor"/><circle cx="10" cy="9" r="1.6" fill="#fff"/></svg>
    <?= e($s['logo_text']) ?>
  </a>
  <nav class="links">
    <a href="#tujuan" class="tap"><?= e($t['judul']) ?></a>
    <a href="#visimisi" class="tap"><?= e($v['judul']) ?></a>
    <button type="button" id="navAsk" class="tap pill-dark">Tanya AI</button>
  </nav>
</header>

<main>
<section class="hero" id="beranda">
  <div class="stage">

    <!-- LANDING -->
    <div class="landing">
      <p class="notice"><span class="spark">✦</span> <?= e($s['notice']) ?></p>
      <h1><?= e($s['hero_title']) ?></h1>
      <p class="sub"><?= e($s['hero_sub']) ?></p>
      <button type="button" id="startBtn" class="btn-start tap"><?= e($s['start_label']) ?></button>
    </div>

    <!-- CHAT -->
    <div class="chat" inert>
      <h2><?= e($s['chat_title']) ?></h2>
      <div class="thread" id="thread" aria-live="polite"></div>
      <form class="composer" id="composer">
        <textarea id="input" rows="2" maxlength="600" placeholder="<?= e($s['placeholder']) ?>" aria-label="Pesan"></textarea>
        <div class="row">
          <div class="chips">
            <button type="button" class="chip tap" id="reset">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg> Percakapan baru
            </button>
            <a class="chip tap" href="#visimisi">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg> Visi &amp; Misi
            </a>
          </div>
          <button type="submit" class="send tap" id="send" aria-label="Kirim">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
          </button>
        </div>
      </form>
      <div class="quick" id="quick"></div>
    </div>

  </div>
  <a class="scroll-hint tap" href="#tujuan" aria-label="Gulir ke bawah">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
  </a>
</section>

<section class="section" id="tujuan">
  <div class="wrap">
    <h2 data-reveal><?= e($t['judul']) ?></h2>
    <p class="lead" data-reveal style="--d:.08s"><?= e($t['intro']) ?></p>
    <div class="grid">
      <?php foreach ($t['items'] as $i => $it): ?>
      <article class="card tap" data-reveal style="--d:<?= .1 + $i * .09 ?>s">
        <h3><?= e($it['judul']) ?></h3>
        <p><?= e($it['isi']) ?></p>
      </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<section class="section" id="visimisi">
  <div class="wrap">
    <h2 data-reveal><?= e($v['judul']) ?></h2>
    <div class="visi tap" data-reveal style="--d:.08s">
      <h3>Visi</h3>
      <p><?= e($v['visi']) ?></p>
    </div>
    <h3 class="misi-title" data-reveal style="--d:.1s">Misi</h3>
    <ul class="misi">
      <?php foreach ($v['misi'] as $i => $m): ?>
      <li class="tap" data-reveal style="--d:<?= .12 + $i * .08 ?>s">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="13" fill="var(--blue)" opacity=".14"/><path d="M8 13.5l3.5 3.5L18 10" stroke="var(--blue)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span><?= e($m) ?></span>
      </li>
      <?php endforeach; ?>
    </ul>
    <div class="cta" data-reveal>
      <button type="button" id="ctaAsk" class="btn-start tap">Tanya asisten AI</button>
    </div>
  </div>
</section>
</main>

<footer class="foot"><?= e($s['footer']) ?></footer>

<script type="application/json" id="cfg"><?= json_encode($js, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
<script src="assets/app.js"></script>
</body>
</html>
