// ── DATA ────────────────────────────────────────────────────────────────────

const ROCKS = {
  "amethyst": { name: "Amethyst", emoji: "💜", color: "Purple / Violet", hardness: "7 (Mohs)", type: "Quartz Variety", origin: "Brazil, Uruguay, Africa", rarity: "uncommon", description: "Amethyst is a violet variety of quartz often used in jewelry. Its distinctive purple hue is caused by iron impurities and natural irradiation. Ancient Greeks believed it prevented intoxication.", healing: "Promotes calm, clarity, and inner peace. Often used for stress relief and improving sleep. Associated with the crown chakra." },
  "rose quartz": { name: "Rose Quartz", emoji: "🌸", color: "Pale Pink", hardness: "7 (Mohs)", type: "Quartz", origin: "Brazil, Madagascar, USA", rarity: "common", description: "Rose quartz is a pale pink form of quartz. It is one of the most common gemstones and has been carved into jewelry and ornamental objects since antiquity.", healing: "The stone of unconditional love. Opens the heart chakra, promotes compassion, self-love, and emotional healing." },
  "diamond": { name: "Diamond", emoji: "💎", color: "Clear / Various", hardness: "10 (Mohs)", type: "Native Element", origin: "South Africa, Russia, Australia", rarity: "sacrit", description: "Diamond is the hardest natural material on Earth. Formed deep within the Earth's mantle under extreme heat and pressure, diamonds are brought to the surface by volcanic activity.", healing: "Amplifies energy and intentions. Symbolizes clarity, strength, and eternal love. Enhances other crystals' properties." },
  "obsidian": { name: "Obsidian", emoji: "🖤", color: "Black / Dark Brown", hardness: "5–5.5 (Mohs)", type: "Volcanic Glass", origin: "USA, Mexico, Iceland", rarity: "common", description: "Obsidian is a naturally occurring volcanic glass formed from rapidly cooling lava. Its sharp edges were used by ancient cultures for tools, weapons, and mirrors.", healing: "A powerful protective stone that shields against negativity. Helps reveal truth, promotes self-reflection and emotional release." },
  "lapis lazuli": { name: "Lapis Lazuli", emoji: "🔵", color: "Deep Blue with Gold", hardness: "5–6 (Mohs)", type: "Metamorphic Rock", origin: "Afghanistan, Chile, Russia", rarity: "uncommon", description: "Lapis lazuli is a deep-blue metamorphic rock prized since antiquity for its intense color. It was used in ancient Egypt for jewelry, amulets, and even ground into pigment for painting.", healing: "Enhances intellect, wisdom, and truth. Stimulates the third eye and throat chakras, aiding communication and intuition." },
  "ruby": { name: "Ruby", emoji: "❤️", color: "Deep Red", hardness: "9 (Mohs)", type: "Corundum", origin: "Myanmar, Thailand, Mozambique", rarity: "mythical", description: "Ruby is one of the most prized gemstones in the world. Its deep red color comes from chromium. High-quality rubies can be more valuable than diamonds of the same size.", healing: "The stone of passion and vitality. Stimulates the heart chakra, energizes and motivates, and strengthens courage." },
  "emerald": { name: "Emerald", emoji: "💚", color: "Vivid Green", hardness: "7.5–8 (Mohs)", type: "Beryl", origin: "Colombia, Zambia, Brazil", rarity: "mythical", description: "Emerald is a gemstone variety of beryl with a vivid green color caused by traces of chromium and sometimes vanadium. Ancient Egyptians mined emeralds as early as 1500 BC.", healing: "The stone of love and abundance. Opens the heart chakra, promotes loyalty, wisdom, and harmony in relationships." },
  "sapphire": { name: "Sapphire", emoji: "💙", color: "Deep Blue / Various", hardness: "9 (Mohs)", type: "Corundum", origin: "Sri Lanka, Myanmar, Kashmir", rarity: "mythical", description: "Sapphire is a precious gemstone, typically blue, made of corundum. The finest sapphires come from Kashmir and command extraordinary prices at auction.", healing: "Stone of wisdom and royalty. Calms the mind, attracts abundance, and enhances spiritual insight and focus." },
  "alexandrite": { name: "Alexandrite", emoji: "🔮", color: "Green (day) / Red (night)", hardness: "8.5 (Mohs)", type: "Chrysoberyl", origin: "Russia, Brazil, Sri Lanka", rarity: "secret", description: "Alexandrite is extraordinarily rare and valuable due to its remarkable color-change property — appearing green in daylight and red under incandescent light. Discovered in Russia's Ural Mountains in 1830.", healing: "A stone of good fortune and transformation. Strengthens intuition, inspires creativity, and aids in mental clarity." },
};

const BIRTHSTONES = [
  { month: "January", stone: "Garnet", emoji: "🔴", color: "#c23b22", desc: "Deep red garnet symbolizes protection and strength. It is said to keep the traveler safe far from home." },
  { month: "February", stone: "Amethyst", emoji: "💜", color: "#9b59b6", desc: "Purple amethyst represents wisdom, clarity, and calm. Ancient Greeks wore it to prevent intoxication." },
  { month: "March", stone: "Aquamarine", emoji: "🩵", color: "#4aafd5", desc: "Sea-blue aquamarine is the stone of sailors and courage. It calms nerves and brings clarity." },
  { month: "April", stone: "Diamond", emoji: "💎", color: "#cce5ff", desc: "The hardest substance on Earth, diamonds symbolize eternal love and invincible strength." },
  { month: "May", stone: "Emerald", emoji: "💚", color: "#2ecc71", desc: "Lush green emerald represents rebirth, growth, and love. Cleopatra famously adored emeralds." },
  { month: "June", stone: "Pearl", emoji: "🤍", color: "#e8e8e4", desc: "Pearls represent purity and wisdom. They are the only gemstones created by living creatures." },
  { month: "July", stone: "Ruby", emoji: "❤️", color: "#e74c3c", desc: "Fiery red ruby is the king of gemstones, symbolizing passion, vitality, and protection." },
  { month: "August", stone: "Peridot", emoji: "🟢", color: "#9dbd45", desc: "Lime-green peridot is sometimes called 'the evening emerald.' It wards off nightmares and evil." },
  { month: "September", stone: "Sapphire", emoji: "💙", color: "#1a6bcc", desc: "Royal blue sapphire symbolizes loyalty, nobility, and wisdom. It is said to attract blessings." },
  { month: "October", stone: "Opal", emoji: "🌈", color: "#e8c0e0", desc: "Magical opal contains the colors of all other gemstones, symbolizing creativity and hope." },
  { month: "November", stone: "Citrine", emoji: "🌟", color: "#f1c40f", desc: "Golden citrine is the merchant's stone, attracting wealth, warmth, and positive energy." },
  { month: "December", stone: "Turquoise", emoji: "🩵", color: "#1abc9c", desc: "Turquoise is one of the oldest talismans, symbolizing protection, luck, and good fortune." }
];

const HEALING_CRYSTALS = [
  { name: "Clear Quartz", emoji: "🔮", tags: ["Amplifier","Clarity","Energy"], desc: "The master healer. Amplifies energy and intention, enhances psychic abilities, and harmonizes all chakras." },
  { name: "Black Tourmaline", emoji: "🖤", tags: ["Protection","Grounding","Shield"], desc: "The ultimate protective stone. Creates an energetic shield against negative forces and electromagnetic smog." },
  { name: "Carnelian", emoji: "🔶", tags: ["Courage","Motivation","Creativity"], desc: "A bold energy booster that restores vitality, stimulates creativity, and motivates for success." },
  { name: "Tiger's Eye", emoji: "🐯", tags: ["Confidence","Focus","Luck"], desc: "Combines Earth and Sun energies. Promotes courage, clarity, and self-confidence. A powerful luck stone." },
  { name: "Lepidolite", emoji: "🟣", tags: ["Anxiety","Sleep","Calm"], desc: "Contains natural lithium, making it excellent for calming anxiety, reducing stress, and improving sleep." },
  { name: "Chrysocolla", emoji: "🌊", tags: ["Communication","Empathy","Peace"], desc: "Teaches the power of words and inspires verbal expression. Promotes emotional balance and inner peace." },
  { name: "Sodalite", emoji: "🔵", tags: ["Logic","Truth","Intuition"], desc: "The stone of logic and truth. Brings order to the mind, promotes rational thought and objectivity." },
  { name: "Aventurine", emoji: "💚", tags: ["Luck","Opportunity","Prosperity"], desc: "Known as the 'stone of opportunity.' The luckiest of all crystals, especially for manifesting prosperity." },
];

const RARITY_DATA = [
  { name: "Painite", rarity: "secret", badge: "🔴 Secret", why: "Once the rarest mineral on Earth. Only a handful of specimens known to exist." },
  { name: "Alexandrite", rarity: "secret", badge: "🔴 Secret", why: "Dramatic color change; gem-quality specimens are extraordinarily scarce." },
  { name: "Musgravite", rarity: "secret", badge: "🔴 Secret", why: "Fewer than 20 faceted stones known to exist worldwide." },
  { name: "Tanzanite", rarity: "mythical", badge: "🟠 Mythical", why: "Found only in a 4 km strip near Mt. Kilimanjaro, Tanzania." },
  { name: "Ruby", rarity: "mythical", badge: "🟠 Mythical", why: "Top-quality pigeon blood rubies from Myanmar are rarer than diamonds." },
  { name: "Sapphire", rarity: "mythical", badge: "🟠 Mythical", why: "Fine Kashmir sapphires fetch record auction prices; supply is extremely limited." },
  { name: "Emerald", rarity: "mythical", badge: "🟠 Mythical", why: "Flawless specimens are extremely rare; most have natural inclusions." },
  { name: "Opal", rarity: "sacrit", badge: "🟡 Sacrit", why: "Black opals from Lightning Ridge, Australia are among the most prized gems." },
  { name: "Turquoise", rarity: "sacrit", badge: "🟡 Sacrit", why: "High-quality, untreated turquoise is increasingly rare." },
  { name: "Diamond", rarity: "sacrit", badge: "🟡 Sacrit", why: "Common industrially but gem-quality stones require significant mining." },
];

const TUTORIALS = [
  { title: "How to Identify Quartz Varieties", duration: "12:45", views: 234000, youtube: "youtube.com/embed/dQw4w9WgXcQ" },
  { title: "The Science Behind Crystal Colors", duration: "18:30", views: 156000, youtube: "youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Polishing & Cutting Gemstones", duration: "15:20", views: 98000, youtube: "youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Where to Find Rocks & Minerals", duration: "22:10", views: 187000, youtube: "youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Caring for Your Crystal Collection", duration: "11:05", views: 212000, youtube: "youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Birthstones & Their Meanings", duration: "13:45", views: 145000, youtube: "youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Fake vs Real: Crystal Authentication", duration: "16:50", views: 267000, youtube: "youtube.com/embed/dQw4w9WgXcQ" },
  { title: "Building Your First Rock Collection", duration: "14:20", views: 132000, youtube: "youtube.com/embed/dQw4w9WgXcQ" },
];

// ── SPARKLES ────────────────────────────────────────────────────────────────

function createSparkles() {
  const container = document.getElementById('sparkles');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle' + (Math.random() > 0.8 ? ' large' : '') + (Math.random() > 0.6 ? ' gold' : '');
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
    s.style.setProperty('--delay', (Math.random() * 5) + 's');
    container.appendChild(s);
  }
}

// ── BIRTHSTONES ─────────────────────────────────────────────────────────────

function renderBirthstones() {
  const grid = document.getElementById('birthstoneGrid');
  grid.innerHTML = BIRTHSTONES.map(b => `
    <div class="card" style="border-color: ${b.color}33;">
      <div class="card-emoji">${b.emoji}</div>
      <div class="card-month">${b.month}</div>
      <h3>${b.stone}</h3>
      <p>${b.desc}</p>
    </div>
  `).join('');
}

// ── HEALING ─────────────────────────────────────────────────────────────────

function renderHealing() {
  const grid = document.getElementById('healingGrid');
  grid.innerHTML = HEALING_CRYSTALS.map(c => `
    <div class="card">
      <div class="card-emoji">${c.emoji}</div>
      <h3>${c.name}</h3>
      <p>${c.desc}</p>
      <div class="card-tags">${c.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
  `).join('');
}

// ── RARITY TABLE ─────────────────────────────────────────────────────────────

function renderRarity() {
  const list = document.getElementById('rarityList');
  list.innerHTML = RARITY_DATA.map(r => `
    <div class="rarity-row">
      <span class="name">${r.name}</span>
      <span><span class="rarity-badge rarity-${r.rarity}">${r.badge}</span></span>
      <span class="why">${r.why}</span>
    </div>
  `).join('');
}

// ── TUTORIALS ────────────────────────────────────────────────────────────────

function renderTutorials() {
  const grid = document.getElementById('tutorialsGrid');
  if (!grid) return;
  grid.innerHTML = TUTORIALS.map(t => `
    <div class="tutorial-card">
      <div class="tutorial-thumb" style="background: linear-gradient(135deg, #7b2d8b, #d4af37);">
        <div class="tutorial-play">▶️</div>
      </div>
      <div class="tutorial-info">
        <h3>${t.title}</h3>
        <div class="tutorial-meta">
          <span>⏱️ ${t.duration}</span>
          <span>👁️ ${(t.views / 1000).toFixed(0)}K views</span>
        </div>
        <button class="btn-watch" onclick="window.open('https://${t.youtube}', '_blank')">Watch on YouTube</button>
      </div>
    </div>
  `).join('');
}

// ── SCANNER ──────────────────────────────────────────────────────────────────

function findRock(query) {
  const q = query.toLowerCase().trim();
  if (ROCKS[q]) return ROCKS[q];
  const key = Object.keys(ROCKS).find(k => q.includes(k) || k.includes(q));
  return key ? ROCKS[key] : null;
}

function rarityLabel(r) {
  const map = { common: 'Common', uncommon: 'Uncommon', sacrit: 'Sacrit', mythical: 'Mythical', secret: 'Secret' };
  return map[r] || r;
}

function showResult(rock) {
  const el = document.getElementById('scanResult');
  el.className = 'scan-result';
  el.innerHTML = `
    <div class="result-header">
      <div class="result-emoji">${rock.emoji}</div>
      <div>
        <div class="result-name">${rock.name}</div>
        <span class="rarity-badge rarity-${rock.rarity}">${rarityLabel(rock.rarity)}</span>
      </div>
    </div>
    <div class="result-grid">
      <div class="result-stat"><label>Color</label><span>${rock.color}</span></div>
      <div class="result-stat"><label>Hardness</label><span>${rock.hardness}</span></div>
      <div class="result-stat"><label>Type</label><span>${rock.type}</span></div>
      <div class="result-stat"><label>Origin</label><span>${rock.origin}</span></div>
    </div>
    <p class="result-description">${rock.description}</p>
    <div class="result-healing">✨ <strong>Healing Properties:</strong> ${rock.healing}</div>
  `;
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showNotFound(name) {
  const el = document.getElementById('scanResult');
  el.className = 'scan-result';
  el.innerHTML = `
    <div class="result-header">
      <div class="result-emoji">🔍</div>
      <div><div class="result-name">Not Recognized</div></div>
    </div>
    <p class="result-description">We couldn't identify "<strong>${name}</strong>" in our database. Try common names like: Amethyst, Diamond, Obsidian, Rose Quartz, Lapis Lazuli, Ruby, Emerald, Opal, Turquoise, Moonstone...</p>
  `;
}

function doScan(name) {
  const el = document.getElementById('scanResult');
  el.className = 'scan-result';
  el.innerHTML = `<div class="scanning-anim"><div class="scan-ring"></div><p>Analyzing crystal structure...</p></div>`;
  setTimeout(() => {
    const rock = findRock(name);
    if (rock) showResult(rock);
    else showNotFound(name);
  }, 1200);
}

document.getElementById('scanBtn').addEventListener('click', () => {
  const name = document.getElementById('rockNameInput').value.trim();
  if (!name) { showToast('Please enter a rock or crystal name.'); return; }
  doScan(name);
});

document.getElementById('rockNameInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('scanBtn').click();
});

// File upload
const fileInput = document.getElementById('fileInput');
const previewImg = document.getElementById('previewImg');
const uploadArea = document.getElementById('uploadArea');

function handleFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.style.display = 'block';
  const hint = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
  document.getElementById('rockNameInput').value = hint;
  showToast('Image uploaded! Press Identify or refine the name.');
}

fileInput.addEventListener('change', e => handleFile(e.target.files[0]));

uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.style.borderColor = 'var(--gold)'; });
uploadArea.addEventListener('dragleave', () => { uploadArea.style.borderColor = ''; });
uploadArea.addEventListener('drop', e => {
  e.preventDefault();
  uploadArea.style.borderColor = '';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const dt = new DataTransfer();
    dt.items.add(file);
    fileInput.files = dt.files;
    handleFile(file);
  }
});

// ── CONTACT FORM ────────────────────────────────────────────────────────────

function submitContact(e) {
  e.preventDefault();
  e.target.reset();
  showToast('💌 Message sent! We\'ll get back to you soon.');
}

// ── COMMUNITY MEMBERS COUNTER ────────────────────────────────────────────────

const COMMUNITY_STATS = {
  total: 3847,
  monthly: 2104,
  yearly: 1743,
  countries: 62
};

function animateCount(id, target, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

function initMembersCounter() {
  const section = document.getElementById('population');
  if (!section) return;
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCount('membersCount', COMMUNITY_STATS.total, 2000);
      animateCount('statMonthly', COMMUNITY_STATS.monthly, 1600);
      animateCount('statYearly', COMMUNITY_STATS.yearly, 1800);
      animateCount('statCountries', COMMUNITY_STATS.countries, 1200);
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(section);
}

// ── COMMUNITY MODAL ──────────────────────────────────────────────────────────

function openCommunityModal(e) {
  e.preventDefault();
  document.getElementById('communityModal').classList.remove('hidden');
}

function closeCommunityModal(e) {
  if (e.target === document.getElementById('communityModal')) {
    document.getElementById('communityModal').classList.add('hidden');
  }
}

// ── TOAST ────────────────────────────────────────────────────────────────────

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 3500);
}

// ── GAME TIME (COUNTDOWN + LOUD ALARM) ───────────────────────────────────────

const GameTime = {
  remaining: 0,      // seconds left
  total: 0,          // seconds the timer was started with
  intervalId: null,
  running: false,
  audioCtx: null,
  alarmNodes: null,
  alarmTimer: null,
};

function gtFormat(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hrs = String(Math.floor(s / 3600)).padStart(2, '0');
  const mins = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const secs = String(s % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function gtRender() {
  const display = document.getElementById('gtDisplay');
  display.textContent = gtFormat(GameTime.remaining);
  const bar = document.getElementById('gtProgressBar');
  const pct = GameTime.total > 0 ? (GameTime.remaining / GameTime.total) * 100 : 0;
  bar.style.width = pct + '%';
  // Turn red and pulse in the final 10 seconds
  display.classList.toggle('gt-warning', GameTime.running && GameTime.remaining <= 10 && GameTime.remaining > 0);
}

function gtReadInputs() {
  const h = parseInt(document.getElementById('gtHours').value, 10) || 0;
  const m = parseInt(document.getElementById('gtMinutes').value, 10) || 0;
  const s = parseInt(document.getElementById('gtSeconds').value, 10) || 0;
  return h * 3600 + m * 60 + s;
}

function gtSetButtons(running) {
  document.getElementById('gtStartBtn').disabled = running;
  document.getElementById('gtPauseBtn').disabled = !running;
}

function gtStart() {
  // If not already counting down, load time from inputs.
  if (GameTime.remaining <= 0) {
    const total = gtReadInputs();
    if (total <= 0) { showToast('⏰ Set a time limit first!'); return; }
    GameTime.remaining = total;
    GameTime.total = total;
  }
  if (GameTime.running) return;
  gtStopAlarm();
  GameTime.running = true;
  gtSetButtons(true);
  gtRender();
  GameTime.intervalId = setInterval(() => {
    GameTime.remaining--;
    gtRender();
    if (GameTime.remaining <= 0) {
      gtPause();
      gtTimeUp();
    }
  }, 1000);
}

function gtPause() {
  GameTime.running = false;
  clearInterval(GameTime.intervalId);
  GameTime.intervalId = null;
  gtSetButtons(false);
  gtRender();
}

function gtReset() {
  gtPause();
  gtStopAlarm();
  GameTime.remaining = 0;
  GameTime.total = 0;
  document.getElementById('gtHours').value = '';
  document.getElementById('gtMinutes').value = '';
  document.getElementById('gtSeconds').value = '';
  gtRender();
}

function gtTimeUp() {
  gtPlayAlarm(); // starts fresh (clears any prior alarm/UI state internally)
  document.getElementById('gtStopBtn').classList.remove('hidden');
  document.getElementById('gtDisplay').classList.add('gt-alarming');
  showToast("⏰ TIME'S UP!");
}

// Generate a very loud oscillating siren with the Web Audio API — no audio files needed.
function gtPlayAlarm() {
  gtStopAlarm();
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    GameTime.audioCtx = ctx;
    if (ctx.state === 'suspended') ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 1.0; // maximum — very loud
    gain.connect(ctx.destination);

    // Two detuned oscillators for a harsh, attention-grabbing tone.
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'square';
    osc2.type = 'sawtooth';
    osc2.detune.value = 12;

    // LFO sweeps the pitch up and down like an emergency siren.
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 4;       // 4 sweeps per second
    lfoGain.gain.value = 500;      // sweep depth in Hz
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);
    osc1.frequency.value = 900;
    osc2.frequency.value = 900;

    osc1.connect(gain);
    osc2.connect(gain);

    const now = ctx.currentTime;
    osc1.start(now);
    osc2.start(now);
    lfo.start(now);

    GameTime.alarmNodes = { ctx, osc1, osc2, lfo, gain };

    // Pulse the volume on/off so it really grabs attention, and auto-stop after 30s.
    let on = true;
    GameTime.alarmTimer = setInterval(() => {
      on = !on;
      gain.gain.setTargetAtTime(on ? 1.0 : 0.0, ctx.currentTime, 0.02);
    }, 350);
    setTimeout(gtStopAlarm, 30000);
  } catch (err) {
    // Fallback: at least vibrate on supporting devices.
    if (navigator.vibrate) navigator.vibrate([400, 200, 400, 200, 400]);
  }
}

function gtStopAlarm() {
  if (GameTime.alarmTimer) { clearInterval(GameTime.alarmTimer); GameTime.alarmTimer = null; }
  if (GameTime.alarmNodes) {
    const { osc1, osc2, lfo, ctx } = GameTime.alarmNodes;
    try { osc1.stop(); osc2.stop(); lfo.stop(); } catch (e) {}
    try { ctx.close(); } catch (e) {}
    GameTime.alarmNodes = null;
    GameTime.audioCtx = null;
  }
  document.getElementById('gtStopBtn').classList.add('hidden');
  document.getElementById('gtDisplay').classList.remove('gt-alarming');
}

function initGameTime() {
  if (!document.getElementById('gametime')) return;
  document.getElementById('gtStartBtn').addEventListener('click', gtStart);
  document.getElementById('gtPauseBtn').addEventListener('click', gtPause);
  document.getElementById('gtResetBtn').addEventListener('click', gtReset);
  document.getElementById('gtStopBtn').addEventListener('click', gtStopAlarm);

  document.querySelectorAll('.gt-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const secs = parseInt(btn.dataset.seconds, 10);
      gtReset();
      document.getElementById('gtHours').value = Math.floor(secs / 3600) || '';
      document.getElementById('gtMinutes').value = Math.floor((secs % 3600) / 60) || '';
      document.getElementById('gtSeconds').value = secs % 60 || '';
      GameTime.remaining = secs;
      GameTime.total = secs;
      gtRender();
    });
  });

  gtRender();
}

// ── INIT ─────────────────────────────────────────────────────────────────────

createSparkles();
renderBirthstones();
renderHealing();
renderRarity();
renderTutorials();
initMembersCounter();
initGameTime();
