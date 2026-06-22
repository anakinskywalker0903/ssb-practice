/**
 * SSB Psychology Simulator — Main Application Controller
 * Manages both WAT and PPDT test flows.
 */

import WORD_BANK from './words.js';
import PPDT_IMAGES from './images.js';
import WATTimer from './timer.js';
import { playBeep, playTick, playStartChime, setMuted, getMuted } from './audio.js';

// ─── Constants ────────────────────────────────────────────────────────────────
const RING_RADIUS = 54;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const PPDT_VIEW_SECONDS = 30;
const PPDT_WRITE_SECONDS = 4 * 60; // 4 minutes
const PPDT_STORAGE_KEY = 'ssb_ppdt_seen';

// ─── Screen Registry ──────────────────────────────────────────────────────────
const screens = {
  home:          document.getElementById('screen-home'),
  watLanding:    document.getElementById('screen-wat-landing'),
  watTest:       document.getElementById('screen-wat-test'),
  watComplete:   document.getElementById('screen-wat-complete'),
  ppdtLanding:   document.getElementById('screen-ppdt-landing'),
  ppdtView:      document.getElementById('screen-ppdt-view'),
  ppdtComplete:  document.getElementById('screen-ppdt-complete'),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ─── Utility ──────────────────────────────────────────────────────────────────
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

// ─── Fullscreen ───────────────────────────────────────────────────────────────
function enterFullscreen() {
  const e = document.documentElement;
  if (e.requestFullscreen) e.requestFullscreen();
  else if (e.webkitRequestFullscreen) e.webkitRequestFullscreen();
}

function exitFullscreen() {
  if (document.exitFullscreen) document.exitFullscreen();
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
}

function toggleFullscreen(muteIconId) {
  const isFull = document.fullscreenElement || document.webkitFullscreenElement;
  if (isFull) exitFullscreen(); else enterFullscreen();
}

// ─── Mute ────────────────────────────────────────────────────────────────────
const ICON_SOUND_ON  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;
const ICON_SOUND_OFF = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;

function applyMuteIcon(iconEl, btnEl) {
  const muted = getMuted();
  iconEl.innerHTML = muted ? ICON_SOUND_OFF : ICON_SOUND_ON;
  btnEl.classList.toggle('muted', muted);
}

function toggleMuteAll() {
  setMuted(!getMuted());
  applyMuteIcon(
    document.getElementById('wat-mute-icon'),
    document.getElementById('btn-wat-mute')
  );
  applyMuteIcon(
    document.getElementById('ppdt-mute-icon'),
    document.getElementById('btn-ppdt-mute')
  );
}

// ─── Ring Helpers ─────────────────────────────────────────────────────────────
function updateRing(ringEl, numberEl, remaining, total) {
  const progress = remaining / total;
  const offset = RING_CIRCUMFERENCE * (1 - progress);
  ringEl.style.strokeDashoffset = offset;

  if (progress > 0.5) {
    ringEl.style.stroke = 'var(--gold)';
  } else if (progress > 0.25) {
    ringEl.style.stroke = '#e07b39';
  } else {
    ringEl.style.stroke = '#e03939';
  }

  numberEl.textContent = remaining > 60
    ? `${Math.floor(remaining / 60)}:${String(remaining % 60).padStart(2, '0')}`
    : remaining;

  if (remaining <= 5 && remaining > 0) {
    numberEl.classList.add('pulse-warn');
  } else {
    numberEl.classList.remove('pulse-warn');
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//  WAT MODULE
// ══════════════════════════════════════════════════════════════════════════════

const watState = {
  wordCount:    60,
  timePerWord:  15,
  sessionWords: [],
  currentIndex: 0,
  startTime:    null,
  running:      false,
};

const watEl = {
  wordDisplay:   document.getElementById('word-display'),
  timerNumber:   document.getElementById('wat-timer-number'),
  timerRing:     document.getElementById('wat-timer-ring'),
  progressText:  document.getElementById('wat-progress-text'),
  progressBar:   document.getElementById('wat-progress-bar-fill'),
  btnMute:       document.getElementById('btn-wat-mute'),
  btnFullscreen: document.getElementById('btn-wat-fullscreen'),
  btnExit:       document.getElementById('btn-wat-exit'),
  muteIcon:      document.getElementById('wat-mute-icon'),
  btnStart:      document.getElementById('btn-wat-start'),
  btnBack:       document.getElementById('btn-wat-back'),
  btnRestart:    document.getElementById('btn-wat-restart'),
  btnHome:       document.getElementById('btn-wat-home'),
  statWords:     document.getElementById('wat-stat-words'),
  statDuration:  document.getElementById('wat-stat-duration'),
  selectedWords: document.getElementById('selected-words'),
  selectedTime:  document.getElementById('selected-time'),
  totalDuration: document.getElementById('total-duration'),
  wordCountBtns: document.querySelectorAll('.opt-btn[data-group="word-count"]'),
  timeBtns:      document.querySelectorAll('.opt-btn[data-group="time"]'),
};

const watTimer = new WATTimer({
  onTick:   (rem, tot) => {
    updateRing(watEl.timerRing, watEl.timerNumber, rem, tot);
    if (rem > 0 && rem < tot) playTick();
  },
  onExpire: () => { playBeep(); watAdvanceWord(); },
});

function watUpdateDuration() {
  const totalSec = watState.wordCount * watState.timePerWord;
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  watEl.totalDuration.textContent = m > 0 ? (s === 0 ? `${m} min` : `${m}m ${s}s`) : `${s}s`;
}

function watInitSettings() {
  watEl.wordCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      watEl.wordCountBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      watState.wordCount = parseInt(btn.dataset.value, 10);
      watEl.selectedWords.textContent = watState.wordCount;
      watUpdateDuration();
    });
  });
  watEl.timeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      watEl.timeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      watState.timePerWord = parseInt(btn.dataset.value, 10);
      watEl.selectedTime.textContent = watState.timePerWord;
      watUpdateDuration();
    });
  });
}

function watShowWord(word, index, total) {
  watEl.wordDisplay.classList.remove('word-enter');
  void watEl.wordDisplay.offsetWidth;
  watEl.wordDisplay.textContent = word;
  watEl.wordDisplay.classList.add('word-enter');
  watEl.progressText.textContent = `${index + 1} / ${total}`;
  watEl.progressBar.style.width = `${((index + 1) / total) * 100}%`;
}

function watAdvanceWord() {
  watState.currentIndex += 1;
  if (watState.currentIndex >= watState.sessionWords.length) {
    watEndTest();
    return;
  }
  watShowWord(watState.sessionWords[watState.currentIndex], watState.currentIndex, watState.sessionWords.length);
  watTimer.start(watState.timePerWord);
}

function watStartTest() {
  const shuffled = shuffle(WORD_BANK);
  watState.sessionWords = shuffled.slice(0, watState.wordCount);
  watState.currentIndex = 0;
  watState.startTime = Date.now();
  watState.running = true;

  showScreen('watTest');
  enterFullscreen();

  watEl.timerRing.style.strokeDasharray  = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
  watEl.timerRing.style.strokeDashoffset = 0;

  playStartChime();
  watShowWord(watState.sessionWords[0], 0, watState.sessionWords.length);
  watEl.progressBar.style.width = `${(1 / watState.sessionWords.length) * 100}%`;

  setTimeout(() => watTimer.start(watState.timePerWord), 300);
}

function watEndTest() {
  watTimer.stop();
  watState.running = false;
  const duration = Date.now() - watState.startTime;
  watEl.statWords.textContent = watState.sessionWords.length;
  watEl.statDuration.textContent = formatDuration(duration);
  exitFullscreen();
  showScreen('watComplete');
}

// WAT event listeners
watEl.btnBack.addEventListener('click', () => showScreen('home'));
watEl.btnStart.addEventListener('click', watStartTest);
watEl.btnMute.addEventListener('click', toggleMuteAll);
watEl.btnFullscreen.addEventListener('click', toggleFullscreen);
watEl.btnExit.addEventListener('click', () => {
  watTimer.stop();
  watState.running = false;
  exitFullscreen();
  showScreen('watLanding');
});
watEl.btnRestart.addEventListener('click', watStartTest);
watEl.btnHome.addEventListener('click', () => showScreen('home'));

// ══════════════════════════════════════════════════════════════════════════════
//  PPDT MODULE
// ══════════════════════════════════════════════════════════════════════════════

const ppdtState = {
  currentImage: null,
  phase: 'idle', // 'view' | 'write' | 'done'
  startTime: null,
  running: false,
  seenIndices: [],
};

const ppdtEl = {
  image:          document.getElementById('ppdt-image'),
  imageFrame:     document.getElementById('ppdt-image-frame'),
  imageOverlay:   document.getElementById('ppdt-image-overlay'),
  timerNumber:    document.getElementById('ppdt-timer-number'),
  timerRing:      document.getElementById('ppdt-timer-ring'),
  timerLabel:     document.getElementById('ppdt-timer-label'),
  progressBar:    document.getElementById('ppdt-progress-bar-fill'),
  phaseBadge:     document.getElementById('ppdt-phase-badge'),
  phaseInstruct:  document.getElementById('ppdt-phase-instruction'),
  btnStart:       document.getElementById('btn-ppdt-start'),
  btnBack:        document.getElementById('btn-ppdt-back'),
  btnExit:        document.getElementById('btn-ppdt-exit'),
  btnMute:        document.getElementById('btn-ppdt-mute'),
  btnFullscreen:  document.getElementById('btn-ppdt-fullscreen'),
  muteIcon:       document.getElementById('ppdt-mute-icon'),
  btnNext:        document.getElementById('btn-ppdt-next'),
  btnHome:        document.getElementById('btn-ppdt-home'),
  statDuration:   document.getElementById('ppdt-stat-duration'),
  statRemaining:  document.getElementById('ppdt-stat-remaining'),
  sessionInfo:    document.getElementById('ppdt-session-info'),
};

const ppdtTimer = new WATTimer({
  onTick:   (rem, tot) => {
    updateRing(ppdtEl.timerRing, ppdtEl.timerNumber, rem, tot);
    ppdtEl.progressBar.style.width = `${((tot - rem) / tot) * 100}%`;
    if (rem > 0 && rem < tot && ppdtState.phase === 'view') playTick();
  },
  onExpire: () => {
    playBeep();
    if (ppdtState.phase === 'view') {
      ppdtStartWritePhase();
    } else if (ppdtState.phase === 'write') {
      ppdtEndSession();
    }
  },
});

// Load / save seen indices from localStorage
function ppdtLoadSeen() {
  try {
    const raw = localStorage.getItem(PPDT_STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr.filter(i => i < PPDT_IMAGES.length);
    }
  } catch (_) {}
  return [];
}

function ppdtSaveSeen(arr) {
  try { localStorage.setItem(PPDT_STORAGE_KEY, JSON.stringify(arr)); } catch (_) {}
}

function ppdtPickImage() {
  ppdtState.seenIndices = ppdtLoadSeen();
  let pool = PPDT_IMAGES.map((_, i) => i).filter(i => !ppdtState.seenIndices.includes(i));

  // If all images seen, reset
  if (pool.length === 0) {
    ppdtState.seenIndices = [];
    ppdtSaveSeen([]);
    pool = PPDT_IMAGES.map((_, i) => i);
  }

  const pick = pool[Math.floor(Math.random() * pool.length)];
  ppdtState.seenIndices.push(pick);
  ppdtSaveSeen(ppdtState.seenIndices);
  ppdtState.currentImage = PPDT_IMAGES[pick];
}

function ppdtUpdateSessionInfo() {
  ppdtState.seenIndices = ppdtLoadSeen();
  const remaining = PPDT_IMAGES.length - ppdtState.seenIndices.length;
  ppdtEl.sessionInfo.innerHTML = `
    <div class="ppdt-info-pills">
      <span class="ppdt-pill"><strong>${ppdtState.seenIndices.length}</strong> seen this cycle</span>
      <span class="ppdt-pill"><strong>${remaining > 0 ? remaining : PPDT_IMAGES.length}</strong> images remaining</span>
      <span class="ppdt-pill ppdt-pill-total"><strong>${PPDT_IMAGES.length}</strong> total images</span>
    </div>`;
}

function ppdtStartSession() {
  ppdtPickImage();
  ppdtState.phase = 'view';
  ppdtState.startTime = Date.now();
  ppdtState.running = true;

  // Set image and reset overlay
  ppdtEl.image.src = ppdtState.currentImage.file;
  ppdtEl.imageOverlay.style.opacity = '0';
  ppdtEl.imageOverlay.classList.remove('overlay-active');

  // Reset ring
  ppdtEl.timerRing.style.strokeDasharray  = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
  ppdtEl.timerRing.style.strokeDashoffset = 0;
  ppdtEl.timerRing.style.stroke           = 'var(--gold)';

  // Phase UI
  ppdtEl.phaseBadge.innerHTML = `<span class="phase-dot phase-view"></span>VIEWING PHASE`;
  ppdtEl.phaseInstruct.textContent = 'Observe the image carefully. Note the characters, mood, and setting.';
  ppdtEl.timerLabel.textContent = 'seconds remaining';
  ppdtEl.progressBar.style.width = '0%';
  ppdtEl.progressBar.classList.remove('ppdt-bar-write');

  showScreen('ppdtView');
  enterFullscreen();
  playStartChime();

  setTimeout(() => ppdtTimer.start(PPDT_VIEW_SECONDS), 300);
}

function ppdtStartWritePhase() {
  ppdtState.phase = 'write';

  // Fade-cover the image
  ppdtEl.imageOverlay.classList.add('overlay-active');

  // Phase UI
  ppdtEl.phaseBadge.innerHTML = `<span class="phase-dot phase-write"></span>WRITING PHASE`;
  ppdtEl.phaseInstruct.textContent = 'Write your story on paper. Include a hero, a plot, and a resolution.';
  ppdtEl.timerLabel.textContent = 'min remaining';
  ppdtEl.progressBar.style.width = '0%';
  ppdtEl.progressBar.classList.add('ppdt-bar-write');

  // Reset ring
  ppdtEl.timerRing.style.stroke = 'var(--gold)';

  setTimeout(() => ppdtTimer.start(PPDT_WRITE_SECONDS), 200);
}

function ppdtEndSession() {
  ppdtTimer.stop();
  ppdtState.phase = 'done';
  ppdtState.running = false;

  const duration = Date.now() - ppdtState.startTime;
  ppdtEl.statDuration.textContent = formatDuration(duration);

  const seen = ppdtLoadSeen();
  const remaining = PPDT_IMAGES.length - seen.length;
  ppdtEl.statRemaining.textContent = remaining >= 0 ? remaining : 0;

  exitFullscreen();
  showScreen('ppdtComplete');
}

// PPDT event listeners
ppdtEl.btnBack.addEventListener('click', () => showScreen('home'));
ppdtEl.btnStart.addEventListener('click', ppdtStartSession);
ppdtEl.btnMute.addEventListener('click', toggleMuteAll);
ppdtEl.btnFullscreen.addEventListener('click', toggleFullscreen);
ppdtEl.btnExit.addEventListener('click', () => {
  ppdtTimer.stop();
  ppdtState.running = false;
  exitFullscreen();
  showScreen('ppdtLanding');
});
ppdtEl.btnNext.addEventListener('click', () => {
  showScreen('ppdtLanding');
  ppdtUpdateSessionInfo();
});
ppdtEl.btnHome.addEventListener('click', () => showScreen('home'));

// ══════════════════════════════════════════════════════════════════════════════
//  HOME SCREEN
// ══════════════════════════════════════════════════════════════════════════════

document.getElementById('card-wat').addEventListener('click', () => {
  showScreen('watLanding');
});

document.getElementById('card-ppdt').addEventListener('click', () => {
  ppdtUpdateSessionInfo();
  showScreen('ppdtLanding');
});

// ─── Global Keyboard Shortcuts ────────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const activeWatLanding   = screens.watLanding.classList.contains('active');
  const activeWatTest      = screens.watTest.classList.contains('active');
  const activePpdtLanding  = screens.ppdtLanding.classList.contains('active');
  const activePpdtView     = screens.ppdtView.classList.contains('active');

  switch (e.code) {
    case 'Space':
      e.preventDefault();
      if (activeWatLanding)  watStartTest();
      if (activePpdtLanding) ppdtStartSession();
      break;
    case 'KeyF':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'KeyM':
      e.preventDefault();
      toggleMuteAll();
      break;
    case 'Escape':
      if (activeWatTest) {
        watTimer.stop();
        watState.running = false;
        exitFullscreen();
        showScreen('watLanding');
      }
      if (activePpdtView) {
        ppdtTimer.stop();
        ppdtState.running = false;
        exitFullscreen();
        showScreen('ppdtLanding');
      }
      break;
  }
});

// ─── Init ─────────────────────────────────────────────────────────────────────
function init() {
  // WAT ring init
  watEl.timerRing.style.strokeDasharray  = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
  watEl.timerRing.style.strokeDashoffset = 0;

  // PPDT ring init
  ppdtEl.timerRing.style.strokeDasharray  = `${RING_CIRCUMFERENCE} ${RING_CIRCUMFERENCE}`;
  ppdtEl.timerRing.style.strokeDashoffset = 0;

  // Mute icons
  applyMuteIcon(watEl.muteIcon, watEl.btnMute);
  applyMuteIcon(ppdtEl.muteIcon, ppdtEl.btnMute);

  // WAT settings
  watInitSettings();
  watUpdateDuration();

  showScreen('home');
}

init();
