/**
 * SSB WAT Simulator — Main Application Controller
 */

import WORD_BANK from './words.js';
import WATTimer from './timer.js';
import { playBeep, playTick, playStartChime, setMuted, getMuted } from './audio.js';

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  wordCount: 60,
  timePerWord: 15,
  sessionWords: [],
  currentIndex: 0,
  startTime: null,
  testRunning: false,
};

// ─── DOM References ───────────────────────────────────────────────────────────
const screens = {
  landing: document.getElementById('screen-landing'),
  test:    document.getElementById('screen-test'),
  complete: document.getElementById('screen-complete'),
};

const el = {
  // Landing
  btnStart:         document.getElementById('btn-start'),
  wordCountBtns:    document.querySelectorAll('.opt-btn[data-group="word-count"]'),
  timeBtns:         document.querySelectorAll('.opt-btn[data-group="time"]'),
  selectedWords:    document.getElementById('selected-words'),
  selectedTime:     document.getElementById('selected-time'),
  totalDuration:    document.getElementById('total-duration'),

  // Test
  wordDisplay:      document.getElementById('word-display'),
  timerNumber:      document.getElementById('timer-number'),
  timerRing:        document.getElementById('timer-ring'),
  progressText:     document.getElementById('progress-text'),
  progressBar:      document.getElementById('progress-bar-fill'),
  btnMute:          document.getElementById('btn-mute'),
  btnFullscreen:    document.getElementById('btn-fullscreen'),
  btnExit:          document.getElementById('btn-exit'),
  muteIcon:         document.getElementById('mute-icon'),

  // Complete
  statWords:        document.getElementById('stat-words'),
  statDuration:     document.getElementById('stat-duration'),
  btnRestart:       document.getElementById('btn-restart'),
  btnNewRandom:     document.getElementById('btn-new-random'),
};

// SVG ring circumference for timer ring
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// ─── Timer ────────────────────────────────────────────────────────────────────
const timer = new WATTimer({
  onTick: handleTick,
  onExpire: handleExpire,
});

// ─── Utility: Fisher-Yates Shuffle ───────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatDuration(ms) {
  const totalSec = Math.round(ms / 1000);
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

// ─── Screen Management ────────────────────────────────────────────────────────
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function updateTotalDuration() {
  const totalSec = state.wordCount * state.timePerWord;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  el.totalDuration.textContent = m > 0 ? (s === 0 ? `${m} min` : `${m}m ${s}s`) : `${s}s`;
}

function initSettings() {
  el.wordCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      el.wordCountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.wordCount = parseInt(btn.dataset.value, 10);
      el.selectedWords.textContent = state.wordCount;
      updateTotalDuration();
    });
  });

  el.timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      el.timeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.timePerWord = parseInt(btn.dataset.value, 10);
      el.selectedTime.textContent = state.timePerWord;
      updateTotalDuration();
    });
  });
}

// ─── Fullscreen ───────────────────────────────────────────────────────────────
function enterFullscreen() {
  const el_fs = document.documentElement;
  if (el_fs.requestFullscreen) el_fs.requestFullscreen();
  else if (el_fs.webkitRequestFullscreen) el_fs.webkitRequestFullscreen();
  else if (el_fs.mozRequestFullScreen) el_fs.mozRequestFullScreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
}

function toggleFullscreen() {
  const isFull = document.fullscreenElement || document.webkitFullscreenElement;
  if (isFull) {
    exitFullscreen();
    el.btnFullscreen.title = 'Enter Fullscreen (F)';
    el.btnFullscreen.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
  } else {
    enterFullscreen();
    el.btnFullscreen.title = 'Exit Fullscreen (F)';
    el.btnFullscreen.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>`;
  }
}

// ─── Mute Toggle ──────────────────────────────────────────────────────────────
const ICON_SOUND_ON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
const ICON_SOUND_OFF = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;

function toggleMute() {
  const nowMuted = !getMuted();
  setMuted(nowMuted);
  el.muteIcon.innerHTML = nowMuted ? ICON_SOUND_OFF : ICON_SOUND_ON;
  el.btnMute.classList.toggle('muted', nowMuted);
  el.btnMute.title = nowMuted ? 'Unmute (M)' : 'Mute (M)';
}

// ─── Word Display ─────────────────────────────────────────────────────────────
function showWord(word, index, total) {
  // Trigger fade-out then fade-in
  el.wordDisplay.classList.remove('word-enter');
  void el.wordDisplay.offsetWidth; // reflow
  el.wordDisplay.textContent = word;
  el.wordDisplay.classList.add('word-enter');

  el.progressText.textContent = `${index + 1} / ${total}`;
  updateProgressBar((index + 1) / total);
}

function updateProgressBar(fraction) {
  el.progressBar.style.width = `${fraction * 100}%`;
}

// ─── Ring Timer ───────────────────────────────────────────────────────────────
function updateRing(remaining, total) {
  const progress = remaining / total;
  const offset = RING_CIRCUMFERENCE * (1 - progress);
  el.timerRing.style.strokeDashoffset = offset;

  // Color shift: green → amber → red
  if (progress > 0.5) {
    el.timerRing.style.stroke = 'var(--gold)';
  } else if (progress > 0.25) {
    el.timerRing.style.stroke = '#e07b39';
  } else {
    el.timerRing.style.stroke = '#e03939';
  }

  el.timerNumber.textContent = remaining;

  // Pulse animation on last 5 seconds
  if (remaining <= 5 && remaining > 0) {
    el.timerNumber.classList.add('pulse-warn');
  } else {
    el.timerNumber.classList.remove('pulse-warn');
  }
}

// ─── Timer Callbacks ──────────────────────────────────────────────────────────
function handleTick(remaining, total) {
  updateRing(remaining, total);
  // Tick sound on each second (but not at 0)
  if (remaining > 0 && remaining < total) {
    playTick();
  }
}

function handleExpire() {
  playBeep();
  advanceWord();
}

// ─── Core Test Logic ──────────────────────────────────────────────────────────
function advanceWord() {
  state.currentIndex += 1;

  if (state.currentIndex >= state.sessionWords.length) {
    endTest();
    return;
  }

  showWord(state.sessionWords[state.currentIndex], state.currentIndex, state.sessionWords.length);
  timer.start(state.timePerWord);
}

function startTest() {
  // Prepare session word list
  const shuffled = shuffle(WORD_BANK);
  state.sessionWords = shuffled.slice(0, state.wordCount);
  state.currentIndex = 0;
  state.startTime = Date.now();
  state.testRunning = true;

  showScreen('test');
  enterFullscreen();

  // Show first word and start timer
  playStartChime();
  showWord(state.sessionWords[0], 0, state.sessionWords.length);
  updateProgressBar(1 / state.sessionWords.length);

  // Small delay before starting timer so user can read the first word
  setTimeout(() => {
    timer.start(state.timePerWord);
  }, 300);
}

function endTest() {
  timer.stop();
  state.testRunning = false;

  const duration = Date.now() - state.startTime;

  el.statWords.textContent = state.sessionWords.length;
  el.statDuration.textContent = formatDuration(duration);

  // Exit fullscreen on test end
  exitFullscreen();
  showScreen('complete');
}

function restartTest() {
  // Restart with same settings
  startTest();
}

function newRandomTest() {
  // Same settings, new shuffle
  startTest();
}

// ─── Keyboard Shortcuts ───────────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  // Ignore if typing in an input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  switch (e.code) {
    case 'Space':
      e.preventDefault();
      if (!state.testRunning && screens.landing.classList.contains('active')) {
        startTest();
      }
      break;
    case 'KeyF':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'KeyM':
      e.preventDefault();
      toggleMute();
      break;
    case 'Escape':
      if (state.testRunning) {
        endTest();
      }
      break;
  }
});

// ─── Event Listeners ──────────────────────────────────────────────────────────
el.btnStart.addEventListener('click', startTest);
el.btnMute.addEventListener('click', toggleMute);
el.btnFullscreen.addEventListener('click', toggleFullscreen);
el.btnExit.addEventListener('click', () => {
  timer.stop();
  state.testRunning = false;
  exitFullscreen();
  showScreen('landing');
});
el.btnRestart.addEventListener('click', restartTest);
el.btnNewRandom.addEventListener('click', newRandomTest);

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  // Set initial ring dash
  el.timerRing.style.strokeDasharray = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
  el.timerRing.style.strokeDashoffset = 0;

  // Mute icon initial
  el.muteIcon.innerHTML = ICON_SOUND_ON;

  initSettings();
  updateTotalDuration();
  showScreen('landing');
}

init();
