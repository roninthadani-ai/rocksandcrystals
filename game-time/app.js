// ── ELEMENTS ────────────────────────────────────────────────────────────────

const setupView = document.getElementById('setupView');
const runningView = document.getElementById('runningView');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const volumeSlider = document.getElementById('volumeSlider');
const startBtn = document.getElementById('startBtn');
const testAlarmBtn = document.getElementById('testAlarmBtn');
const pauseResumeBtn = document.getElementById('pauseResumeBtn');
const cancelBtn = document.getElementById('cancelBtn');
const timeDisplay = document.getElementById('timeDisplay');
const ringFg = document.getElementById('ringFg');
const alarmOverlay = document.getElementById('alarmOverlay');
const stopAlarmBtn = document.getElementById('stopAlarmBtn');
const gameOverOverlay = document.getElementById('gameOverOverlay');

const RING_CIRCUMFERENCE = 2 * Math.PI * 115;

// ── STATE ───────────────────────────────────────────────────────────────────

let totalSeconds = 0;
let remainingSeconds = 0;
let tickHandle = null;
let isPaused = false;
let audioCtx = null;
let sirenStop = null;

// ── AUDIO (loud siren via Web Audio API) ─────────────────────────────────────

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playSiren(durationMs) {
  const ctx = getAudioContext();
  const volume = Number(volumeSlider.value) / 100;

  // Compressor lets us push the gain way past 1.0 without clipping,
  // which is what makes this genuinely LOUD.
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 6;
  compressor.ratio.value = 20;
  compressor.attack.value = 0.002;
  compressor.release.value = 0.1;
  compressor.connect(ctx.destination);

  const masterGain = ctx.createGain();
  masterGain.gain.value = volume * 4;
  masterGain.connect(compressor);

  const osc1 = ctx.createOscillator();
  osc1.type = 'sawtooth';
  const osc2 = ctx.createOscillator();
  osc2.type = 'square';
  osc2.frequency.value = 880;
  const osc3 = ctx.createOscillator();
  osc3.type = 'square';
  osc3.frequency.value = 1760;

  osc1.connect(masterGain);
  osc2.connect(masterGain);
  osc3.connect(masterGain);

  osc1.start();
  osc2.start();
  osc3.start();

  const startTime = ctx.currentTime;
  let sweepTimer = null;
  let phase = 0;

  function sweep() {
    const t = ctx.currentTime;
    // wailing siren between 500Hz and 1200Hz
    phase += 0.12;
    const freq = 850 + Math.sin(phase) * 350;
    osc1.frequency.setValueAtTime(freq, t);
    osc3.frequency.setValueAtTime(freq * 2, t);
  }
  sweep();
  sweepTimer = setInterval(sweep, 60);

  function stop() {
    clearInterval(sweepTimer);
    try {
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    } catch (e) { /* ignore */ }
    setTimeout(() => {
      osc1.stop();
      osc2.stop();
      osc3.stop();
      osc1.disconnect();
      osc2.disconnect();
      osc3.disconnect();
      masterGain.disconnect();
      compressor.disconnect();
    }, 80);
  }

  if (durationMs) {
    setTimeout(stop, durationMs);
  }

  return stop;
}

function vibrateDevice() {
  if (navigator.vibrate) {
    navigator.vibrate([500, 200, 500, 200, 500]);
  }
}

// ── TIME FORMATTING ─────────────────────────────────────────────────────────

function pad(n) { return String(n).padStart(2, '0'); }

function formatTime(totalSecs) {
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = totalSecs % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function getInputSeconds() {
  const h = Number(hoursInput.value) || 0;
  const m = Number(minutesInput.value) || 0;
  const s = Number(secondsInput.value) || 0;
  return h * 3600 + m * 60 + s;
}

function setInputsFromMinutes(minutes) {
  hoursInput.value = Math.floor(minutes / 60);
  minutesInput.value = minutes % 60;
  secondsInput.value = 0;
}

// ── TIMER ───────────────────────────────────────────────────────────────────

function updateRing() {
  const progress = totalSeconds === 0 ? 0 : remainingSeconds / totalSeconds;
  const offset = RING_CIRCUMFERENCE * (1 - progress);
  ringFg.style.strokeDashoffset = offset;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingSeconds);
  updateRing();
}

function startTimer() {
  totalSeconds = getInputSeconds();
  if (totalSeconds <= 0) return;

  getAudioContext(); // unlock audio on user gesture

  remainingSeconds = totalSeconds;
  isPaused = false;

  setupView.classList.add('hidden');
  runningView.classList.remove('hidden');
  pauseResumeBtn.textContent = 'Pause';

  updateDisplay();
  tickHandle = setInterval(tick, 1000);
}

function tick() {
  if (isPaused) return;
  remainingSeconds--;
  updateDisplay();
  if (remainingSeconds <= 0) {
    clearInterval(tickHandle);
    tickHandle = null;
    triggerAlarm();
  }
}

function togglePauseResume() {
  isPaused = !isPaused;
  pauseResumeBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

function cancelTimer() {
  if (tickHandle) clearInterval(tickHandle);
  tickHandle = null;
  runningView.classList.add('hidden');
  setupView.classList.remove('hidden');
}

// ── ALARM ───────────────────────────────────────────────────────────────────

function triggerAlarm() {
  alarmOverlay.classList.remove('hidden');
  sirenStop = playSiren(null);
  vibrateDevice();

  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification("Game Time's up!", { body: 'Your timer has finished.' });
  }
}

function announceGameOver() {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance('Game time over');
    msg.volume = Number(volumeSlider.value) / 100;
    msg.rate = 0.85;
    msg.pitch = 0.9;
    speechSynthesis.speak(msg);
  }
}

function stopAlarm() {
  if (sirenStop) sirenStop();
  sirenStop = null;
  alarmOverlay.classList.add('hidden');
  runningView.classList.add('hidden');

  // "GAME TIME OVER" splash with voice announcement
  gameOverOverlay.classList.remove('hidden');
  announceGameOver();
  setTimeout(() => {
    gameOverOverlay.classList.add('hidden');
    setupView.classList.remove('hidden');
  }, 3000);
}

// ── EVENTS ──────────────────────────────────────────────────────────────────

document.querySelectorAll('.preset-btn').forEach(btn => {
  btn.addEventListener('click', () => setInputsFromMinutes(Number(btn.dataset.min)));
});

startBtn.addEventListener('click', startTimer);
testAlarmBtn.addEventListener('click', () => {
  getAudioContext();
  playSiren(1500);
  vibrateDevice();
});
pauseResumeBtn.addEventListener('click', togglePauseResume);
cancelBtn.addEventListener('click', cancelTimer);
stopAlarmBtn.addEventListener('click', stopAlarm);

if ('Notification' in window && Notification.permission === 'default') {
  startBtn.addEventListener('click', () => Notification.requestPermission(), { once: true });
}
