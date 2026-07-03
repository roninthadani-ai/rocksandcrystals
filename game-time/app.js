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
  const masterGain = ctx.createGain();
  const volume = Number(volumeSlider.value) / 100;
  masterGain.gain.value = volume;
  masterGain.connect(ctx.destination);

  const osc1 = ctx.createOscillator();
  osc1.type = 'sawtooth';
  const osc2 = ctx.createOscillator();
  osc2.type = 'square';
  osc2.frequency.value = 880;

  osc1.connect(masterGain);
  osc2.connect(masterGain);

  osc1.start();
  osc2.start();

  const startTime = ctx.currentTime;
  let sweepTimer = null;
  let phase = 0;

  function sweep() {
    const t = ctx.currentTime;
    // wailing siren between 500Hz and 1200Hz
    phase += 0.12;
    const freq = 850 + Math.sin(phase) * 350;
    osc1.frequency.setValueAtTime(freq, t);
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
      osc1.disconnect();
      osc2.disconnect();
      masterGain.disconnect();
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

function stopAlarm() {
  if (sirenStop) sirenStop();
  sirenStop = null;
  alarmOverlay.classList.add('hidden');
  runningView.classList.add('hidden');
  setupView.classList.remove('hidden');
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
