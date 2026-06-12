/* ═══════════════════════════════════════════════════════════
   F1 Quiz Challenge — script.js
   ═══════════════════════════════════════════════════════════ */

const API = 'http://localhost:3000/api';

// ── State ─────────────────────────────────────────────────
let lang        = 'en';
let sessionId   = null;
let questions   = [];
let currentIdx  = 0;
let score       = 0;
let answered    = false;
let timerHandle = null;
let timeLeft    = 30;
const TIMER_MAX = 30;

const CATEGORY_LABELS = {
  drivers  : { en: '🧑‍🏎️ Drivers',   ar: '🧑‍🏎️ سائقون' },
  teams    : { en: '🏭 Teams',      ar: '🏭 فرق' },
  circuits : { en: '🏁 Circuits',   ar: '🏁 حلبات' },
  history  : { en: '📖 History',    ar: '📖 تاريخ' },
  rules    : { en: '📋 Rules',      ar: '📋 قواعد' }
};

// ── DOM refs ──────────────────────────────────────────────
const $ = id => document.getElementById(id);

const screens = {
  home       : $('screen-home'),
  quiz       : $('screen-quiz'),
  result     : $('screen-result'),
  leaderboard: $('screen-leaderboard')
};

// ── Show screen ───────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Language toggle ───────────────────────────────────────
function applyLang() {
  const html = document.getElementById('html-root');
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  $('lang-label').textContent = lang === 'en' ? '🌐 العربية' : '🌐 English';

  // Translate all data-en / data-ar elements
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.en;
  });
  // Translate placeholders
  document.querySelectorAll('[data-placeholder-en]').forEach(el => {
    el.placeholder = lang === 'ar' ? el.dataset.placeholderAr : el.dataset.placeholderEn;
  });
}

$('lang-toggle').addEventListener('click', () => {
  lang = lang === 'en' ? 'ar' : 'en';
  applyLang();
  // Re-render current question if in quiz
  if (screens.quiz.classList.contains('active') && questions.length) {
    renderQuestion();
  }
});

// ── Loading overlay ───────────────────────────────────────
function setLoading(on) {
  $('loading-overlay').classList.toggle('hidden', !on);
}

// ── Start game ────────────────────────────────────────────
$('btn-start').addEventListener('click', startGame);
$('btn-replay').addEventListener('click', startGame);

async function startGame() {
  const name = $('player-name').value.trim() || 'Anonymous';
  setLoading(true);
  try {
    const res = await fetch(`${API}/session/start`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ playerName: name })
    });
    if (!res.ok) throw new Error('Server error');
    const data  = await res.json();
    sessionId   = data.sessionId;
    questions   = data.questions;
    currentIdx  = 0;
    score       = 0;
    $('live-score').textContent = 0;
    showScreen('quiz');
    renderQuestion();
  } catch (e) {
    alert(lang === 'en' ? '❌ Cannot connect to server. Make sure the server is running on port 3000.'
                        : '❌ لا يمكن الاتصال بالخادم. تأكد من تشغيله على المنفذ 3000.');
  } finally {
    setLoading(false);
  }
}

// ── Render question ───────────────────────────────────────
function renderQuestion() {
  stopTimer();
  answered = false;

  const q = questions[currentIdx];

  // Progress
  const pct = (currentIdx / questions.length) * 100;
  $('progress-bar').style.width = pct + '%';
  $('q-counter').textContent =
    lang === 'en'
      ? `Question ${currentIdx + 1} of ${questions.length}`
      : `السؤال ${currentIdx + 1} من ${questions.length}`;

  // Category badge
  const cat  = CATEGORY_LABELS[q.category] || { en: q.category, ar: q.category };
  $('q-category').textContent = cat[lang];

  // Question text
  $('question-text').textContent = lang === 'en' ? q.question_en : q.question_ar;

  // Options
  const opts = lang === 'en' ? q.options_en : q.options_ar;
  const labels = ['A', 'B', 'C', 'D'];
  const grid = $('options-grid');
  grid.innerHTML = '';
  opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.id = `opt-${i}`;
    btn.innerHTML = `<span class="option-label">${labels[i]}</span>${opt}`;
    btn.addEventListener('click', () => selectAnswer(opt, btn));
    grid.appendChild(btn);
  });

  // Feedback + next
  $('feedback-bar').className = 'feedback-bar hidden';
  $('btn-next').classList.add('hidden');

  // Timer
  startTimer();
}

// ── Timer ─────────────────────────────────────────────────
function startTimer() {
  timeLeft = TIMER_MAX;
  updateRing(TIMER_MAX);
  $('timer-num').textContent = TIMER_MAX;
  $('timer-num').classList.remove('danger');
  $('ring-progress').classList.remove('danger');

  timerHandle = setInterval(() => {
    timeLeft--;
    updateRing(timeLeft);
    $('timer-num').textContent = timeLeft;

    if (timeLeft <= 8) {
      $('timer-num').classList.add('danger');
      $('ring-progress').classList.add('danger');
    }
    if (timeLeft <= 0) {
      stopTimer();
      timeExpired();
    }
  }, 1000);
}

function stopTimer() { clearInterval(timerHandle); }

function updateRing(remaining) {
  const circumference = 2 * Math.PI * 18; // r=18
  const offset = circumference - (remaining / TIMER_MAX) * circumference;
  $('ring-progress').style.strokeDashoffset = offset;
}

function timeExpired() {
  if (answered) return;
  answered = true;
  // Disable all options
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  // Submit "no answer" — show correct
  submitAnswer('__timeout__');
}

// ── Select answer ─────────────────────────────────────────
async function selectAnswer(opt, btn) {
  if (answered) return;
  answered = true;
  stopTimer();
  await submitAnswer(opt, btn);
}

async function submitAnswer(opt, clickedBtn) {
  try {
    const res = await fetch(`${API}/session/${sessionId}/answer`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ questionIndex: currentIdx, answer: opt, lang })
    });
    const data = await res.json();

    // Mark options
    document.querySelectorAll('.option-btn').forEach(b => {
      b.disabled = true;
      const optText = b.textContent.replace(/^[A-D]/, '').trim();
      const correctText = lang === 'en'
        ? questions[currentIdx].options_en.find((o, i) =>
            (lang === 'en' ? questions[currentIdx].options_en : questions[currentIdx].options_ar)[i] === data.correctAnswer)
        : null;
      // Mark correct
      const opts_cur = lang === 'en' ? questions[currentIdx].options_en : questions[currentIdx].options_ar;
      const correctIdx = opts_cur.indexOf(data.correctAnswer);
      if (b.id === `opt-${correctIdx}`) b.classList.add('correct');
    });
    if (clickedBtn && !data.correct) clickedBtn.classList.add('wrong');

    // Feedback
    const fb = $('feedback-bar');
    if (opt === '__timeout__') {
      fb.textContent = lang === 'en'
        ? `⏰ Time's up! Correct: ${data.correctAnswer}`
        : `⏰ انتهى الوقت! الصحيح: ${data.correctAnswer}`;
      fb.className = 'feedback-bar wrong-fb';
    } else if (data.correct) {
      score++;
      $('live-score').textContent = score;
      fb.textContent = lang === 'en' ? '✅ Correct! Great answer!' : '✅ صحيح! إجابة رائعة!';
      fb.className = 'feedback-bar correct-fb';
    } else {
      fb.textContent = lang === 'en'
        ? `❌ Wrong! Correct: ${data.correctAnswer}`
        : `❌ خطأ! الصحيح: ${data.correctAnswer}`;
      fb.className = 'feedback-bar wrong-fb';
    }

    $('btn-next').classList.remove('hidden');

    // Auto-advance on last question label change
    const isLast = currentIdx === questions.length - 1;
    const nextBtn = $('btn-next');
    if (isLast) {
      nextBtn.querySelector('span').textContent = lang === 'en' ? 'See Results 🏁' : 'عرض النتائج 🏁';
    } else {
      nextBtn.querySelector('span').textContent = lang === 'en' ? 'Next Question →' : 'السؤال التالي →';
    }

  } catch (e) {
    console.error('Answer submit error:', e);
  }
}

// ── Next question ──────────────────────────────────────────
$('btn-next').addEventListener('click', () => {
  currentIdx++;
  if (currentIdx >= questions.length) {
    finishGame();
  } else {
    renderQuestion();
  }
});

// ── Finish game ───────────────────────────────────────────
async function finishGame() {
  setLoading(true);
  try {
    const name = $('player-name').value.trim() || 'Anonymous';
    const res  = await fetch(`${API}/session/${sessionId}/finish`, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ playerName: name })
    });
    const data = await res.json();

    // Progress bar to 100%
    $('progress-bar').style.width = '100%';

    // Trophy & title
    let trophy, title_en, title_ar;
    if (data.score === 10) {
      trophy = '🏆'; title_en = 'Perfect Race! Champion!'; title_ar = 'سباق مثالي! أنت بطل!';
    } else if (data.score >= 7) {
      trophy = '🥇'; title_en = 'Great Drive! Podium Finish!'; title_ar = 'قيادة رائعة! منصة التتويج!';
    } else if (data.score >= 5) {
      trophy = '🥈'; title_en = 'Good Effort! Keep Racing!'; title_ar = 'جهد جيد! استمر في السباق!';
    } else {
      trophy = '🏁'; title_en = 'Race Complete! Try Again!'; title_ar = 'السباق انتهى! حاول مرة أخرى!';
    }

    $('result-trophy').textContent = trophy;
    $('result-title').textContent  = lang === 'en' ? title_en : title_ar;
    $('result-score-num').textContent = data.score;
    $('result-time').textContent      = data.time;
    $('result-rank').textContent      = `#${data.rank}`;
    $('result-correct').textContent   = `${data.score}/10`;

    showScreen('result');
  } catch (e) {
    console.error('Finish error:', e);
  } finally {
    setLoading(false);
  }
}

// ── Leaderboard ───────────────────────────────────────────
async function showLeaderboard() {
  setLoading(true);
  try {
    const res  = await fetch(`${API}/leaderboard`);
    const data = await res.json();
    renderLeaderboard(data);
    showScreen('leaderboard');
  } catch (e) {
    $('lb-list').innerHTML = `<p class="lb-empty">${lang === 'en' ? 'Could not load leaderboard.' : 'تعذّر تحميل القائمة.'}</p>`;
    showScreen('leaderboard');
  } finally {
    setLoading(false);
  }
}

function renderLeaderboard(data) {
  const list = $('lb-list');
  if (!data.length) {
    list.innerHTML = `<p class="lb-empty">${lang === 'en' ? 'No scores yet. Be the first!' : 'لا توجد نتائج بعد. كن الأول!'}</p>`;
    return;
  }
  const rankClass = i => i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
  list.innerHTML = data.map((entry, i) => `
    <div class="lb-row">
      <span class="lb-rank ${rankClass(i)}">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '#' + (i + 1)}</span>
      <span class="lb-name">${entry.name}</span>
      <span class="lb-score">${entry.score}/${entry.total} pts</span>
      <span class="lb-time">⏱ ${entry.time}s</span>
    </div>
  `).join('');
}

// ── Navigation buttons ────────────────────────────────────
$('btn-leaderboard').addEventListener('click', showLeaderboard);
$('btn-result-lb').addEventListener('click', showLeaderboard);
$('btn-lb-back').addEventListener('click', () => showScreen(sessionId ? 'result' : 'home'));
$('btn-home').addEventListener('click', () => showScreen('home'));

// ── Init ──────────────────────────────────────────────────
applyLang();
showScreen('home');