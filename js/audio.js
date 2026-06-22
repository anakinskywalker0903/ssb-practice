/**
 * SSB WAT Simulator — Audio Module
 * Uses Web Audio API to generate buzzer beeps without external files.
 */

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a short military-style buzzer beep.
 * Two-tone descending beep for a distinctive alert sound.
 */
function playBeep() {
  if (isMuted) return;

  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Create oscillator nodes for a two-tone effect
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    // First tone: 880Hz
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.setValueAtTime(660, now + 0.08);

    // Second tone: slightly detuned for richness
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(883, now);
    osc2.frequency.setValueAtTime(663, now + 0.08);

    // Gain envelope: sharp attack, quick decay
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01);
    gainNode.gain.setValueAtTime(0.3, now + 0.08);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.12);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.2);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.22);
    osc2.stop(now + 0.22);
  } catch (e) {
    console.warn('Audio playback failed:', e);
  }
}

/**
 * Play a softer tick sound on each second countdown.
 */
function playTick() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.005);
    gain.gain.linearRampToValueAtTime(0, now + 0.04);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    // Silently fail
  }
}

/**
 * Play a calming chime for test start.
 */
function playStartChime() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.12;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.02);
      gain.gain.linearRampToValueAtTime(0, t + 0.35);
      osc.start(t);
      osc.stop(t + 0.4);
    });
  } catch (e) {
    // Silently fail
  }
}

function setMuted(val) {
  isMuted = val;
}

function getMuted() {
  return isMuted;
}

export { playBeep, playTick, playStartChime, setMuted, getMuted };
