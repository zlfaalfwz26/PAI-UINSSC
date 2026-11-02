(() => {
  const $ = s => document.querySelector(s);
  const cfg = JSON.parse($('#cfg').textContent);
  const hero = $('#beranda'), landing = $('.landing'), chat = $('.chat');
  const thread = $('#thread'), input = $('#input'), form = $('#composer'), sendBtn = $('#send'), quick = $('#quick');
  let history = [], busy = false, started = false;

  /* ---------- format teks sederhana (aman dari XSS) ---------- */
  const esc = t => t.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const inl = s => s.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  function fmt(text) {
    let out = '', list = false;
    for (const l of esc(text).split('\n')) {
      const m = l.match(/^\s*[-*•]\s+(.*)/);
      if (m) { if (!list) { out += '<ul>'; list = true; } out += '<li>' + inl(m[1]) + '</li>'; }
      else { if (list) { out += '</ul>'; list = false; } if (l.trim()) out += '<p>' + inl(l) + '</p>'; }
    }
    return out + (list ? '</ul>' : '');
  }

  function addMsg(role, text, cls = '') {
    const el = document.createElement('div');
    el.className = 'msg ' + role + ' ' + cls;
    if (role === 'user') el.textContent = text; else el.innerHTML = fmt(text);
    thread.appendChild(el);
    thread.classList.add('has');
    thread.scrollTop = thread.scrollHeight;
    return el;
  }

  /* ---------- mulai: satu-satunya transisi besar ---------- */
  function start() {
    if (started) return;
    started = true;
    hero.classList.add('is-chat');
    landing.inert = true; chat.inert = false;
    setTimeout(() => addMsg('ai', cfg.greeting), 450);
    setTimeout(() => input.focus({ preventScroll: true }), 800);
  }
  function openChat() { start(); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  async function send(text) {
    text = (text || '').trim();
    if (!text || busy) return;
    start();
    busy = true; sendBtn.disabled = true;
    addMsg('user', text);
    history.push({ role: 'user', content: text });
    input.value = ''; input.style.height = '';
    const typing = addMsg('ai', '');
    typing.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>';
    try {
      const r = await fetch('api.php', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history }) });
      const d = await r.json();
      if (!r.ok || !d.reply) throw new Error(d.error || cfg.error);
      typing.innerHTML = fmt(d.reply);
      history.push({ role: 'assistant', content: d.reply });
    } catch (e) {
      typing.className = 'msg ai err';
      typing.textContent = e.message || cfg.error;
      history.pop();
    }
    thread.scrollTop = thread.scrollHeight;
    busy = false; sendBtn.disabled = false;
    input.focus({ preventScroll: true });
  }

  /* ---------- event ---------- */
  $('#startBtn').addEventListener('click', start);
  $('#navAsk').addEventListener('click', openChat);
  $('#ctaAsk').addEventListener('click', openChat);
  form.addEventListener('submit', e => { e.preventDefault(); send(input.value); });
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); } });
  input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 160) + 'px'; });
  $('#reset').addEventListener('click', () => {
    if (busy) return;
    history = []; thread.innerHTML = ''; thread.classList.remove('has');
    addMsg('ai', cfg.greeting);
  });
  cfg.suggestions.forEach(q => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'tap'; b.textContent = q;
    b.addEventListener('click', () => send(q));
    quick.appendChild(b);
  });

  /* ---------- animasi scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: .15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));

  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
})();
