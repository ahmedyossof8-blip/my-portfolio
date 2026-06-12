const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ── In-memory stores (no DB dependency) ────────────────────
let leaderboard = [];          // { name, score, total, time, date }
let sessions    = {};          // sessionId -> { questions, answers, startTime }

// ── Helpers ─────────────────────────────────────────────────
function loadQuestions() {
  const raw = fs.readFileSync(path.join(__dirname, 'questions.json'), 'utf8');
  return JSON.parse(raw);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ── API: Start a new game session (10 random questions) ─────
app.post('/api/session/start', (req, res) => {
  const all  = loadQuestions();
  const selected = shuffle(all).slice(0, 10);
  const id   = generateId();

  sessions[id] = {
    questions : selected,
    answers   : [],
    startTime : Date.now(),
    finished  : false
  };

  // Return questions WITHOUT answers
  const safe = selected.map(({ id, question_en, question_ar,
                               options_en, options_ar, category }, idx) => ({
    index: idx,
    id,
    question_en,
    question_ar,
    options_en,
    options_ar,
    category
  }));

  res.json({ sessionId: id, questions: safe });
});

// ── API: Submit an answer for a specific question ───────────
app.post('/api/session/:sessionId/answer', (req, res) => {
  const { sessionId }  = req.params;
  const { questionIndex, answer, lang } = req.body;
  const session = sessions[sessionId];

  if (!session) return res.status(404).json({ error: 'Session not found' });
  if (session.finished) return res.status(400).json({ error: 'Session already finished' });

  const q = session.questions[questionIndex];
  if (!q) return res.status(404).json({ error: 'Question not found' });

  const correctAnswer = lang === 'ar' ? q.answer_ar : q.answer_en;
  const isCorrect     = answer === correctAnswer;

  session.answers.push({ questionIndex, answer, isCorrect });

  res.json({
    correct       : isCorrect,
    correctAnswer : lang === 'ar' ? q.answer_ar : q.answer_en,
    explanation_en: `The correct answer is: ${q.answer_en}`,
    explanation_ar: `الإجابة الصحيحة هي: ${q.answer_ar}`
  });
});

// ── API: Finish session & calculate score ───────────────────
app.post('/api/session/:sessionId/finish', (req, res) => {
  const { sessionId } = req.params;
  const { playerName } = req.body;
  const session = sessions[sessionId];

  if (!session) return res.status(404).json({ error: 'Session not found' });

  session.finished = true;
  const elapsed = Math.round((Date.now() - session.startTime) / 1000);
  const score   = session.answers.filter(a => a.isCorrect).length;
  const total   = session.questions.length;

  const entry = {
    name  : playerName || 'Anonymous',
    score,
    total,
    time  : elapsed,
    date  : new Date().toISOString()
  };

  leaderboard.push(entry);
  leaderboard.sort((a, b) => b.score - a.score || a.time - b.time);
  leaderboard = leaderboard.slice(0, 50); // keep top 50

  res.json({ score, total, time: elapsed, rank: leaderboard.indexOf(entry) + 1 });
});

// ── API: Get leaderboard ────────────────────────────────────
app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard.slice(0, 20));
});

// ── API: Get all questions (admin) ──────────────────────────
app.get('/api/questions', (req, res) => {
  const cat  = req.query.category;
  const lang = req.query.lang || 'en';
  let qs = loadQuestions();
  if (cat) qs = qs.filter(q => q.category === cat);
  res.json(qs);
});

// ── API: Health check ───────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), sessions: Object.keys(sessions).length });
});

// ── Start ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🏎️  F1 Quiz Server running → http://localhost:${PORT}`);
});
