// QUEEN ♡ QUINCY — A Love Story Written by Fate
import http from "node:http";
import { existsSync, statSync, createReadStream } from "node:fs";
import path from "node:path";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Queen ♡ Quincy — A Love Story Written by Fate</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Great+Vibes&display=swap');

  :root {
    --rose: #ff4f8b;
    --crimson: #ff2d55;
    --silver: #d9d9d9;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  html, body { background: #000; }
  body {
    color: #fff;
    font-family: 'Cormorant Garamond', serif;
    overflow-x: hidden;
  }
  body.locked { overflow: hidden; }

  /* ---------- starfield canvas ---------- */
  #stars { position: fixed; inset: 0; z-index: 0; pointer-events: none; }

  .cursor-glow {
    position: fixed; width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,79,139,.10), transparent 70%);
    pointer-events: none; z-index: 1; transform: translate(-50%,-50%);
    transition: opacity .4s; opacity: 0;
  }

  section { position: relative; z-index: 2; }

  /* ---------- GATE / HERO ---------- */
  #gate {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 30px 24px;
    background: #0a0a0a;
  }
  .gate-heart {
    font-size: 44px; color: var(--rose);
    filter: drop-shadow(0 0 18px rgba(255,79,139,.9));
    animation: heartbeat 1.6s ease-in-out infinite;
    margin-bottom: 34px;
  }
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    12% { transform: scale(1.22); }
    24% { transform: scale(1); }
    36% { transform: scale(1.16); }
    48% { transform: scale(1); }
  }
  .gate-line {
    font-size: clamp(17px, 4.6vw, 22px);
    font-style: italic; color: var(--silver);
    line-height: 1.7; max-width: 460px;
    opacity: 0; animation: fadeUp 1.4s ease forwards;
  }
  .gate-line.g1 { animation-delay: .5s; }
  .gate-line.g2 { animation-delay: 2.1s; margin-top: 12px; }
  .gate-title {
    margin-top: 34px;
    font-size: clamp(38px, 11vw, 72px);
    font-weight: 500; letter-spacing: .04em;
    opacity: 0; animation: fadeUp 1.6s ease forwards;
    animation-delay: 3.9s;
  }
  .gate-title .hrt { color: var(--rose); text-shadow: 0 0 22px rgba(255,79,139,.8); }
  .gate-sub {
    margin-top: 14px;
    font-size: clamp(16px, 4.4vw, 20px);
    font-style: italic; color: var(--silver);
    opacity: 0; animation: fadeUp 1.6s ease forwards;
    animation-delay: 4.9s;
  }
  .enter-btn {
    margin-top: 46px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px; letter-spacing: .32em; text-transform: uppercase; text-indent: .32em;
    color: #fff; background: transparent;
    border: 1px solid rgba(255,79,139,.75);
    padding: 17px 40px; border-radius: 999px; cursor: pointer;
    box-shadow: 0 0 26px rgba(255,79,139,.35), inset 0 0 14px rgba(255,79,139,.12);
    transition: box-shadow .35s, transform .35s, background .35s;
    opacity: 0; animation: fadeUp 1.6s ease forwards;
    animation-delay: 5.9s;
  }
  .enter-btn:hover {
    background: rgba(255,79,139,.14);
    box-shadow: 0 0 44px rgba(255,79,139,.6), inset 0 0 18px rgba(255,79,139,.2);
    transform: translateY(-2px);
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  #gate.hide { animation: gateOut 1.4s ease forwards; pointer-events: none; }
  @keyframes gateOut { to { opacity: 0; transform: scale(1.06); visibility: hidden; } }

  /* ---------- shared section chrome ---------- */
  .wrap { max-width: 700px; margin: 0 auto; padding: 110px 26px; text-align: center; }
  .eyebrow {
    font-size: 11px; letter-spacing: .5em; text-transform: uppercase; text-indent: .5em;
    color: var(--rose); margin-bottom: 20px;
  }
  h2 {
    font-size: clamp(32px, 8vw, 48px); font-weight: 500;
    color: #fff; margin-bottom: 12px;
  }
  .lead { font-style: italic; color: var(--silver); font-size: clamp(16px, 4.4vw, 20px); line-height: 1.75; max-width: 520px; margin: 0 auto; }

  .reveal { opacity: 0; transform: translateY(34px); transition: opacity 1.1s ease, transform 1.1s ease; }
  .reveal.in { opacity: 1; transform: translateY(0); }

  .divider {
    width: 1px; height: 70px; margin: 0 auto;
    background: linear-gradient(to bottom, transparent, rgba(255,79,139,.6), transparent);
  }

  /* ---------- love letter ---------- */
  .glass {
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,79,139,.28);
    border-radius: 22px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 60px rgba(255,79,139,.12), inset 0 0 30px rgba(255,79,139,.04);
    padding: 48px 34px;
  }
  .handwriting {
    font-size: clamp(17px, 4.6vw, 21px);
    font-style: italic; line-height: 2.05;
    color: #f2e9ec; text-align: left; min-height: 430px; white-space: pre-wrap;
  }
  .handwriting::after {
    content: '❦'; color: var(--rose); font-size: 14px;
    animation: blink 1s steps(1) infinite; margin-left: 2px;
  }
  .handwriting.done::after { display: none; }
  @keyframes blink { 50% { opacity: 0; } }

  /* ---------- timeline ---------- */
  .timeline { margin-top: 54px; position: relative; text-align: left; }
  .timeline::before {
    content: ''; position: absolute; left: 15px; top: 6px; bottom: 6px; width: 1px;
    background: linear-gradient(to bottom, rgba(255,79,139,.7), rgba(255,79,139,.08));
  }
  .t-item { position: relative; padding: 0 0 34px 52px; }
  .t-item .dot {
    position: absolute; left: 8px; top: 6px;
    width: 15px; height: 15px; border-radius: 50%;
    background: #000; border: 1px solid var(--rose);
    box-shadow: 0 0 12px rgba(255,79,139,.7);
  }
  .t-card {
    background: rgba(255,255,255,.035);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 16px; padding: 22px 24px;
    transition: border-color .4s, box-shadow .4s, transform .4s;
  }
  .t-card:hover {
    border-color: rgba(255,79,139,.55);
    box-shadow: 0 0 34px rgba(255,79,139,.18);
    transform: translateY(-3px);
  }
  .t-card h3 { font-size: 21px; font-weight: 500; color: #fff; }
  .t-card h3 .spark { color: var(--rose); margin-right: 8px; }
  .t-card p { margin-top: 8px; font-style: italic; color: var(--silver); font-size: 16.5px; line-height: 1.7; }

  /* ---------- why queen is special ---------- */
  .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-top: 50px; }
  .q-card {
    background: rgba(255,255,255,.035);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: 18px; padding: 30px 20px; cursor: pointer;
    transition: border-color .4s, box-shadow .4s;
  }
  .q-card:hover { border-color: rgba(255,79,139,.55); box-shadow: 0 0 30px rgba(255,79,139,.16); }
  .q-card .glyph { font-size: 22px; color: var(--rose); }
  .q-card h3 { margin-top: 12px; font-size: 20px; font-weight: 500; }
  .q-card .more {
    max-height: 0; overflow: hidden; transition: max-height .6s ease, margin .6s ease;
    font-style: italic; color: var(--silver); font-size: 16px; line-height: 1.7;
  }
  .q-card.open .more { max-height: 200px; margin-top: 12px; }

  /* ---------- her video ---------- */
  .vid-card {
    max-width: 330px; margin: 44px auto 0;
    border-radius: 20px; overflow: hidden;
    border: 1px solid rgba(255,79,139,.4);
    box-shadow: 0 0 50px rgba(255,79,139,.25);
  }
  .vid-card video { display: block; width: 100%; }

  /* ---------- destiny ---------- */
  .destiny-quote {
    font-size: clamp(22px, 6.4vw, 34px);
    font-style: italic; line-height: 1.9; color: #fff;
    max-width: 560px; margin: 0 auto;
    text-shadow: 0 0 30px rgba(255,79,139,.35);
  }
  .destiny-quote .em { color: var(--rose); font-style: normal; }

  /* ---------- music ---------- */
  .music-pill {
    position: fixed; top: 18px; right: 18px; z-index: 40;
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase; text-indent: .26em;
    color: #fff; background: rgba(0,0,0,.5);
    border: 1px solid rgba(255,255,255,.35);
    padding: 11px 18px; border-radius: 999px; cursor: pointer;
    backdrop-filter: blur(6px); display: none;
  }
  .music-pill.on { display: block; border-color: rgba(255,79,139,.7); box-shadow: 0 0 18px rgba(255,79,139,.3); }

  /* ---------- her full-screen video moment ---------- */
  #herMoment {
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  #herV {
    position: absolute; top: 50%; left: 50%;
    min-width: 100%; min-height: 100%;
    width: auto; height: auto;
    transform: translate(-50%,-50%);
    object-fit: cover;
  }
  .hm-shade {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, rgba(0,0,0,.2), rgba(0,0,0,.55));
  }
  .hm-text { position: relative; z-index: 2; text-align: center; pointer-events: none; }
  .hm-eyebrow {
    font-size: 11px; letter-spacing: .45em; text-transform: uppercase; text-indent: .45em;
    color: var(--silver); text-shadow: 0 1px 10px rgba(0,0,0,.9);
  }
  .hm-big {
    margin-top: 14px;
    font-size: clamp(56px, 16vw, 100px); font-weight: 500;
    color: #f5eee9; letter-spacing: .01em; line-height: 1;
    text-shadow: 0 2px 26px rgba(0,0,0,.9);
  }
  .hm-big span { color: #e58aa2; font-style: italic; }
  .hm-sub {
    margin-top: 16px;
    font-style: italic; font-size: clamp(16px, 4.5vw, 21px);
    color: rgba(255,255,255,.9); line-height: 1.65;
    text-shadow: 0 1px 12px rgba(0,0,0,.9);
  }
  .hm-play {
    position: absolute; bottom: 34px; left: 50%; transform: translateX(-50%); z-index: 3;
    font-family: 'Cormorant Garamond', serif;
    font-size: 11px; letter-spacing: .26em; text-transform: uppercase; text-indent: .26em;
    color: #fff; background: rgba(0,0,0,.45);
    border: 1px solid rgba(255,79,139,.7);
    padding: 12px 24px; border-radius: 999px; cursor: pointer;
    backdrop-filter: blur(5px);
    box-shadow: 0 0 20px rgba(255,79,139,.3);
  }

  /* ---------- final ---------- */
  #final { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 110px 26px; }
  .final-heart {
    font-size: 40px; color: var(--crimson);
    filter: drop-shadow(0 0 22px rgba(255,45,85,.9));
    animation: heartbeat 1.8s ease-in-out infinite;
    margin-bottom: 30px;
  }
  .final-lines { font-size: clamp(18px, 5vw, 23px); font-style: italic; line-height: 2.1; color: #f2e9ec; }
  .final-lines .name { color: var(--rose); font-style: normal; }
  .forever {
    margin-top: 40px;
    font-family: 'Great Vibes', cursive;
    font-size: clamp(44px, 12vw, 76px);
    color: var(--rose); text-shadow: 0 0 34px rgba(255,79,139,.55);
  }
  .final-names { margin-top: 16px; letter-spacing: .3em; text-transform: uppercase; font-size: 14px; color: var(--silver); }
  .final-fate { margin-top: 26px; font-size: 12px; letter-spacing: .4em; text-transform: uppercase; text-indent: .4em; color: rgba(255,79,139,.85); }

  footer { position: relative; z-index: 2; text-align: center; padding: 30px 0 44px; font-size: 11px; letter-spacing: .3em; text-transform: uppercase; color: #555; }

  /* floating hearts + sparkles layer */
  #floaters { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
  .floater { position: absolute; bottom: -40px; will-change: transform; }
  @keyframes rise { to { transform: translateY(-115vh) rotate(40deg); opacity: 0; } }
  .sparkle { position: absolute; will-change: transform; animation: twinkle 2.6s ease-in-out infinite; }
  @keyframes twinkle { 0%,100% { opacity: .1; transform: scale(.7);} 50% { opacity: .9; transform: scale(1.15);} }
</style>
</head>
<body class="locked">
  <canvas id="stars"></canvas>
  <div class="cursor-glow" id="cglow"></div>
  <div id="floaters"></div>

  <button class="music-pill" id="musicBtn">♪&nbsp;&nbsp;Play music</button>
  <audio id="dateSong" src="/date_song.mp3" loop preload="none"></audio>

  <!-- GATE -->
  <section id="gate">
    <div class="gate-heart">♥</div>
    <div class="gate-line g1">Faith brought us together.</div>
    <div class="gate-line g2">Among billions of people in the world, my heart found you.</div>
    <div class="gate-title">QUEEN <span class="hrt">♡</span> QUINCY</div>
    <div class="gate-sub">You are the most beautiful chapter of my life.</div>
    <button class="enter-btn" id="enterBtn">Enter Our Universe</button>
  </section>

  <!-- LOVE LETTER -->
  <section id="letterSec">
    <div class="wrap">
      <div class="divider reveal"></div>
      <div class="eyebrow reveal">A letter, written by my heart</div>
      <div class="glass reveal">
        <div class="handwriting" id="hand"></div>
      </div>
    </div>
  </section>

  <!-- TIMELINE -->
  <section id="timelineSec">
    <div class="wrap">
      <div class="eyebrow reveal">Every step was fate</div>
      <h2 class="reveal">Our Story</h2>
      <div class="timeline">
        <div class="t-item reveal"><span class="dot"></span><div class="t-card"><h3><span class="spark">✨</span>The Day We Met</h3><p>A WAEC hall, a power bank, and one small charge that started everything. Faith clearly had a plan — and a sense of humour. 😄</p></div></div>
        <div class="t-item reveal"><span class="dot"></span><div class="t-card"><h3><span class="spark">✨</span>The First Conversation</h3><p>All it took was "can I charge my phone?" — and my heart quietly knew you would matter.</p></div></div>
        <div class="t-item reveal"><span class="dot"></span><div class="t-card"><h3><span class="spark">✨</span>The Moment We Became Close</h3><p>Somewhere between laughter and late talks, you became my home.</p></div></div>
        <div class="t-item reveal"><span class="dot"></span><div class="t-card"><h3><span class="spark">✨</span>Every Laugh We Shared</h3><p>Each one a treasure. Each one proof that joy sounds like you.</p></div></div>
        <div class="t-item reveal"><span class="dot"></span><div class="t-card"><h3><span class="spark">✨</span>Every Memory We Created</h3><p>Written in my heart permanently. I would not trade one of them.</p></div></div>
      </div>
    </div>
  </section>

  <!-- WHY QUEEN IS SPECIAL -->
  <section id="queenSec">
    <div class="wrap">
      <div class="eyebrow reveal">Dedicated only to her</div>
      <h2 class="reveal">Why Queen Is Special</h2>
      <div class="cards">
        <div class="q-card reveal" onclick="this.classList.toggle('open')"><div class="glyph">♡</div><h3>Her Smile</h3><div class="more">One smile from you and the whole day becomes worth it.</div></div>
        <div class="q-card reveal" onclick="this.classList.toggle('open')"><div class="glyph">♡</div><h3>Her Heart</h3><div class="more">So pure, so warm — the kindest heart I have ever known.</div></div>
        <div class="q-card reveal" onclick="this.classList.toggle('open')"><div class="glyph">♡</div><h3>Her Kindness</h3><div class="more">You care in a way this world does not deserve.</div></div>
        <div class="q-card reveal" onclick="this.classList.toggle('open')"><div class="glyph">♡</div><h3>Her Strength</h3><div class="more">Quiet, unshaken, powerful. You carry grace through everything.</div></div>
        <div class="q-card reveal" onclick="this.classList.toggle('open')"><div class="glyph">♡</div><h3>Her Presence</h3><div class="more">Rooms get brighter. Days get lighter. Just because you are there.</div></div>
      </div>
      <div class="vid-card reveal"><video id="qv" src="/queen_video.mp4" muted loop playsinline preload="metadata"></video></div>
      <p class="lead reveal" style="margin-top:18px">And this is you — my favourite person, forever.</p>
    </div>
  </section>

  <!-- DESTINY -->
  <section id="destinySec">
    <div class="wrap">
      <div class="divider reveal"></div>
      <p class="destiny-quote reveal">Some people meet by chance.<br>Some people meet because of destiny.<br><br>And some people meet because <span class="em">God decided their paths should cross.</span></p>
    </div>
  </section>

  <!-- HER MOMENT: full-screen video with sound -->
  <section id="herMoment">
    <video id="herV" src="/queen_video.mp4" muted loop playsinline preload="metadata"></video>
    <div class="hm-shade"></div>
    <div class="hm-text">
      <div class="hm-eyebrow">Faith brought us together</div>
      <div class="hm-big">Quin<span>c</span>y</div>
      <div class="hm-sub">My best friend. My Queen.<br>The best in the whole world.</div>
    </div>
    <button class="hm-play" id="herPlay">♪&nbsp;&nbsp;Tap for music</button>
  </section>

  <!-- FINAL -->
  <section id="final">
    <div style="text-align:center">
      <div class="final-heart reveal">♥</div>
      <div class="final-lines reveal">
        <span class="name">Queen,</span><br><br>
        Thank you for existing.<br>
        Thank you for every conversation.<br>
        Thank you for every smile.<br>
        Thank you for every memory.<br><br>
        No matter what tomorrow brings,<br>
        you will always be someone special to me.
      </div>
      <div class="forever reveal">Forever ♡</div>
      <div class="final-names reveal">Queen &nbsp;&amp;&nbsp; Quincy</div>
      <div class="final-fate reveal">Faith Brought Us Together</div>
    </div>
  </section>

  <footer>Written by hand, for the most important girl in the world</footer>

<script>
  /* ---------- gate ---------- */
  document.getElementById('enterBtn').addEventListener('click', () => {
    const g = document.getElementById('gate');
    g.classList.add('hide');
    document.body.classList.remove('locked');
    document.getElementById('musicBtn').classList.add('on');
    setTimeout(() => g.remove(), 1500);
  });

  /* ---------- starfield ---------- */
  const cv = document.getElementById('stars'), cx = cv.getContext('2d');
  let W, H, stars = [];
  function sizeCv() {
    W = cv.width = innerWidth; H = cv.height = innerHeight;
    stars = Array.from({length: Math.min(160, innerWidth/6)}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*1.3 + .2, s: Math.random()*.15 + .03,
      t: Math.random()*Math.PI*2
    }));
  }
  sizeCv(); addEventListener('resize', sizeCv);
  (function draw() {
    cx.clearRect(0,0,W,H);
    for (const s of stars) {
      s.y -= s.s; s.t += .02;
      if (s.y < -4) { s.y = H + 4; s.x = Math.random()*W; }
      const a = .25 + Math.sin(s.t)*.2;
      cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 7);
      cx.fillStyle = 'rgba(255,255,255,' + a.toFixed(2) + ')';
      cx.fill();
    }
    requestAnimationFrame(draw);
  })();

  /* ---------- cursor glow ---------- */
  const cg = document.getElementById('cglow');
  addEventListener('pointermove', (e) => { cg.style.opacity = 1; cg.style.left = e.clientX+'px'; cg.style.top = e.clientY+'px'; });

  /* ---------- floating hearts & sparkles while scrolling ---------- */
  const fl = document.getElementById('floaters');
  const glyphs = ['♥','♡','✦','✧','💖'];
  let lastFloat = 0;
  addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastFloat < 320 || document.body.classList.contains('locked')) return;
    lastFloat = now;
    const f = document.createElement('div');
    f.className = 'floater';
    f.textContent = glyphs[Math.floor(Math.random()*glyphs.length)];
    f.style.left = Math.random()*95 + 'vw';
    f.style.fontSize = (12 + Math.random()*20) + 'px';
    f.style.color = Math.random() < .7 ? 'rgba(255,79,139,.75)' : 'rgba(255,255,255,.7)';
    f.style.animation = 'rise ' + (8 + Math.random()*7) + 's linear forwards';
    fl.appendChild(f);
    setTimeout(() => f.remove(), 16000);
  }, {passive:true});

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) en.target.classList.add('in'); }), {threshold:.18});
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- handwriting ---------- */
  const text = "My Queen,\\n\\nIf I could choose a friend a thousand times,\\nI would still choose you.\\n\\nYou came into my life unexpectedly,\\nyet somehow it feels like you were always meant to be here.\\n\\nYou make ordinary days feel special.\\nYou make my heart smile.\\n\\nNo matter where life takes us,\\na part of me will always be grateful\\nthat fate allowed our paths to cross.\\n\\nYou are precious to me.\\nYou are unforgettable.\\nYou are Queen.";
  const hand = document.getElementById('hand');
  let started = false;
  const hio = new IntersectionObserver((es) => {
    if (es[0].isIntersecting && !started) { started = true; typeIt(); }
  }, {threshold:.35});
  hio.observe(hand.parentElement);
  function typeIt() {
    let i = 0;
    (function step() {
      if (i <= text.length) {
        hand.textContent = text.slice(0, i);
        i += 1 + (Math.random() < .3 ? 1 : 0);
        setTimeout(step, 34 + Math.random()*40);
      } else { hand.classList.add('done'); }
    })();
  }

  /* ---------- her video plays when visible ---------- */
  const qv = document.getElementById('qv');
  new IntersectionObserver((es) => es.forEach((en) => { en.isIntersecting ? qv.play().catch(()=>{}) : qv.pause(); }), {threshold:.35}).observe(qv);

  /* ---------- her moment: tap for sound ---------- */
  const herV = document.getElementById('herV');
  const herPlay = document.getElementById('herPlay');
  herPlay.addEventListener('click', () => {
    herV.muted = false;
    herV.play().catch(()=>{});
    herPlay.innerHTML = '♪&nbsp;&nbsp;Music on';
  });
  herV.addEventListener('click', () => {
    herV.muted = !herV.muted;
    herPlay.innerHTML = herV.muted ? '♪&nbsp;&nbsp;Tap for music' : '♪&nbsp;&nbsp;Music on';
  });
  new IntersectionObserver((es) => es.forEach((en) => {
    if (!en.isIntersecting && !herV.paused) herV.pause();
    else if (en.isIntersecting && !herV.muted && herV.paused) herV.play().catch(()=>{});
  }), {threshold:.4}).observe(herV);

  /* ---------- real romantic song (Pixabay: Soulful Serenade, free for any use) ---------- */
  const song = document.getElementById('dateSong');
  const musicBtn = document.getElementById('musicBtn');
  let musicWanted = false;

  function songPlay() {
    song.volume = 0;
    song.play().catch(()=>{});
    const f = setInterval(() => {
      song.volume = Math.min(1, song.volume + .04);
      if (song.volume >= 1) clearInterval(f);
    }, 80);
  }
  function songStop() {
    const f = setInterval(() => {
      song.volume = Math.max(0, song.volume - .08);
      if (song.volume <= 0) { clearInterval(f); song.pause(); }
    }, 80);
  }
  musicBtn.addEventListener('click', () => {
    musicWanted = !musicWanted;
    if (musicWanted) {
      songPlay();
      musicBtn.innerHTML = '♪&nbsp;&nbsp;Music on';
      musicBtn.classList.add('on');
    } else {
      songStop();
      musicBtn.innerHTML = '♪&nbsp;&nbsp;Play music';
    }
  });

  /* video sound priority: song ducks when her video is unmuted */
  function duckCheck() {
    const videoLoud = !herV.muted && !herV.paused;
    if (videoLoud && !song.paused) songStop();
    else if (!videoLoud && musicWanted && song.paused) songPlay();
  }
  herV.addEventListener('unmute', duckCheck);
  herV.addEventListener('play', duckCheck);
  herV.addEventListener('pause', duckCheck);
  // 'unmute' isn't a real event; watch muted flips via a tiny poll
  let lastMuted = herV.muted;
  setInterval(() => { if (herV.muted !== lastMuted) { lastMuted = herV.muted; duckCheck(); } }, 400);
</script>
</body>
</html>`;

const PUB = path.join(path.dirname(new URL(import.meta.url).pathname), "public");

const server = http.createServer((req, res) => {
  const url = (req.url || "/").split("?")[0];
  if (url === "/date_song.mp3") {
    const f = path.join(PUB, "date_song.mp3");
    if (existsSync(f)) {
      const range = req.headers.range;
      const size = statSync(f).size;
      if (range) {
        const m = range.match(/bytes=(\\d+)-(\\d*)/);
        const start = m ? parseInt(m[1], 10) : 0;
        const end = m && m[2] ? Math.min(parseInt(m[2], 10), size - 1) : size - 1;
        res.writeHead(206, { "content-type": "audio/mpeg", "accept-ranges": "bytes", "content-range": "bytes " + start + "-" + end + "/" + size, "content-length": end - start + 1 });
        createReadStream(f, { start, end }).pipe(res);
      } else {
        res.writeHead(200, { "content-type": "audio/mpeg", "accept-ranges": "bytes", "content-length": size });
        createReadStream(f).pipe(res);
      }
    } else { res.writeHead(404); res.end(); }
    return;
  }
  if (url === "/queen_video.mp4") {
    const f = path.join(PUB, "queen_video.mp4");
    if (existsSync(f)) {
      const range = req.headers.range;
      const size = statSync(f).size;
      if (range) {
        const m = range.match(/bytes=(\\d+)-(\\d*)/);
        const start = m ? parseInt(m[1], 10) : 0;
        const end = m && m[2] ? Math.min(parseInt(m[2], 10), size - 1) : size - 1;
        res.writeHead(206, {
          "content-type": "video/mp4", "accept-ranges": "bytes",
          "content-range": "bytes " + start + "-" + end + "/" + size,
          "content-length": end - start + 1,
        });
        createReadStream(f, { start, end }).pipe(res);
      } else {
        res.writeHead(200, { "content-type": "video/mp4", "accept-ranges": "bytes", "content-length": size });
        createReadStream(f).pipe(res);
      }
    } else { res.writeHead(404); res.end(); }
    return;
  }
  res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
  res.end(html);
});

server.listen(3001, () => console.log("QUEEN ♡ QUINCY universe on 3001"));
