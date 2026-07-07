/* ============================================================
   BIRTHDAY SURPRISE — script.js
   ============================================================ */

// ============================================================
// ✏️ KONFIGURASI — ganti tanggal ulang tahun di sini
// ============================================================
const BIRTHDAY = { day: 8, month: 7, year: 2008 };

const CONFIG = {
  starsPage0: 40,
  starsPage1: 55,
  starsPage2: 70,
  confettiCount: 60,
  floaterCount: 18,
  confettiColors: ["#ff8fab", "#ffd700", "#ff63a0", "#ffe066", "#ffb6c1", "#e63362", "#fff0f5"],
  floaterEmojis: ["❤️", "🌸", "✨", "💕", "⭐", "🌷", "💖", "🌟", "💗"],
  // Emoji/karakter yang keluar dari kotak hadiah
  burstParticles: ["⭐", "💫", "✨", "🌟", "💛", "🤍", "❤️", "💕", "💖", "🚀", "🧑‍🚀", "🌌", "🪐", "💥", "🌠", "💗", "⚡", "🌸"],
  burstCount: 32,
};

// ============================================================
// HALAMAN 0 — CEK TANGGAL
// ============================================================
function checkDate() {
  const day = parseInt(document.getElementById("inputDay").value, 10);
  const month = parseInt(document.getElementById("inputMonth").value, 10);
  const year = parseInt(document.getElementById("inputYear").value, 10);
  const errEl = document.getElementById("dateError");

  // Reset error
  errEl.textContent = "";

  if (!day || !month || !year) {
    showError("Isi tanggal, bulan, dan tahun dulu ya 🥺");
    return;
  }

  if (day === BIRTHDAY.day && month === BIRTHDAY.month && year === BIRTHDAY.year) {
    // Benar! ✨ transisi ke halaman gift box
    errEl.textContent = "";
    goToPage(0, 1);
  } else {
    showError("Hmm, kayanya bukan tanggalmu deh... 🤔 Coba lagi! 💕");
  }
}

function showError(msg) {
  const errEl = document.getElementById("dateError");
  errEl.textContent = msg;
  // Re-trigger shake animation
  errEl.style.animation = "none";
  errEl.offsetHeight; // reflow
  errEl.style.animation = "shake 0.4s ease";
}

// Tekan Enter untuk submit
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.getElementById("page0").classList.contains("active")) {
    checkDate();
  }
});

// Auto-focus pindah antar input
document.addEventListener("DOMContentLoaded", () => {
  const day = document.getElementById("inputDay");
  const month = document.getElementById("inputMonth");
  const year = document.getElementById("inputYear");

  day.addEventListener("input", () => {
    if (day.value.length >= 2) month.focus();
  });
  month.addEventListener("input", () => {
    if (month.value.length >= 2) year.focus();
  });
});

// ============================================================
// NAVIGASI ANTAR HALAMAN
// ============================================================
function goToPage(fromId, toId) {
  const from = document.getElementById("page" + fromId);
  const to = document.getElementById("page" + toId);

  from.style.transition = "opacity 0.7s ease";
  from.style.opacity = "0";

  setTimeout(() => {
    from.classList.remove("active");
    from.style.pointerEvents = "none";
    to.classList.add("active");
    to.scrollTop = 0;
  }, 700);
}

// ============================================================
// BINTANG LATAR
// ============================================================
function createStars(containerId, count) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.className = "star-dot";
    const size = Math.random() * 5 + 2;
    star.style.cssText = `
      width:${size}px; height:${size}px;
      top:${Math.random() * 100}%; left:${Math.random() * 100}%;
      --dur:${(Math.random() * 2 + 1.5).toFixed(2)}s;
      --delay:${(Math.random() * 3).toFixed(2)}s;
    `;
    container.appendChild(star);
  }
}

// ============================================================
// CONFETTI
// ============================================================
function spawnConfetti() {
  const container = document.getElementById("confetti-container");
  if (!container) return;
  for (let i = 0; i < CONFIG.confettiCount; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const color = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
    const size = Math.random() * 10 + 6;
    const dx = (Math.random() - 0.5) * 200;
    piece.style.cssText = `
      left:${Math.random() * 100}vw; top:${Math.random() * 30}vh;
      width:${size}px; height:${size}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      --dur:${(Math.random() * 1.2 + 0.8).toFixed(2)}s;
      --delay:${(Math.random() * 0.6).toFixed(2)}s;
      --dx:${dx}px;
    `;
    container.appendChild(piece);
  }
  setTimeout(() => {
    container.innerHTML = "";
  }, 2500);
}

// ============================================================
// BURST PARTICLES — keluar dari kotak hadiah
// ============================================================
function spawnBurstParticles() {
  const container = document.getElementById("burst-container");
  if (!container) return;

  // Posisi kotak hadiah di layar
  const box = document.getElementById("giftBox");
  const rect = box ? box.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const emojis = CONFIG.burstParticles;

  for (let i = 0; i < CONFIG.burstCount; i++) {
    const el = document.createElement("div");
    el.className = "burst-particle";

    // Pilih emoji acak
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Arah terbang: menyebar ke segala arah, lebih banyak ke atas
    const angle = (Math.random() * 300 - 150) * (Math.PI / 180); // -150° s/d +150° (lebih ke atas)
    const dist = Math.random() * 280 + 80;
    const tx = Math.cos(angle) * dist;
    const ty = -Math.abs(Math.sin(angle) * dist) - Math.random() * 120; // selalu ke atas-ish
    const size = Math.random() * 22 + 16;
    const dur = (Math.random() * 0.8 + 1.0).toFixed(2);
    const delay = (Math.random() * 0.4).toFixed(2);
    const rot = (Math.random() * 720 - 360).toFixed(0);
    const scale = (Math.random() * 0.8 + 0.8).toFixed(2);

    el.style.cssText = `
      left: ${originX}px;
      top:  ${originY}px;
      --size:  ${size}px;
      --tx:    ${tx}px;
      --ty:    ${ty}px;
      --dur:   ${dur}s;
      --delay: ${delay}s;
      --rot:   ${rot}deg;
      --scale: ${scale};
    `;

    container.appendChild(el);
  }

  // Bersihkan setelah selesai
  setTimeout(() => {
    container.innerHTML = "";
  }, 2200);
}

// ============================================================
// BUKA KOTAK HADIAH
// ============================================================
function openGift() {
  const giftBox = document.getElementById("giftBox");
  if (!giftBox || giftBox.dataset.opened) return;
  giftBox.dataset.opened = "true";

  giftBox.classList.add("opening");
  giftBox.classList.add("open");

  // ✨ Burst particles keluar dari kotak
  spawnBurstParticles();

  // 🎊 Confetti
  spawnConfetti();

  // 🎵 Musik
  startMusic();

  // Pindah ke halaman 2 (surat)
  setTimeout(() => {
    goToPage(1, 2);
  }, 1600);
}

// ============================================================
// FLOATERS (halaman 2)
// ============================================================
function createFloaters() {
  const container = document.getElementById("floaters");
  if (!container) return;
  for (let i = 0; i < CONFIG.floaterCount; i++) {
    const el = document.createElement("div");
    el.className = "floater";
    el.textContent = CONFIG.floaterEmojis[Math.floor(Math.random() * CONFIG.floaterEmojis.length)];
    el.style.cssText = `
      --size:${Math.random() * 16 + 14}px;
      --left:${Math.random() * 96}%;
      --dur:${(Math.random() * 6 + 5).toFixed(1)}s;
      --delay:${(Math.random() * 8).toFixed(1)}s;
      --rot:${Math.random() > 0.5 ? "180" : "-180"}deg;
    `;
    container.appendChild(el);
  }
}

// ============================================================
// MUSIK
// ============================================================
const audio = document.getElementById("bgMusic");
let musicPlaying = false;

function startMusic() {
  if (!audio) return;
  const p = audio.play();
  if (p !== undefined) {
    p.then(() => {
      musicPlaying = true;
      showMusicPill(false);
    }).catch(() => {
      musicPlaying = false;
      showMusicPill(true);
    });
  }
}

function showMusicPill(paused = false) {
  const pill = document.getElementById("musicPill");
  if (!pill) return;
  pill.classList.remove("hidden");
  if (paused) {
    document.getElementById("musicIcon").textContent = "▶";
    document.querySelector(".music-bars").classList.add("paused");
  }
}

function toggleMusic() {
  if (!audio) return;
  if (musicPlaying) {
    audio.pause();
    musicPlaying = false;
    document.getElementById("musicIcon").textContent = "▶";
    document.querySelector(".music-bars").classList.add("paused");
  } else {
    audio.play();
    musicPlaying = true;
    document.getElementById("musicIcon").textContent = "⏸";
    document.querySelector(".music-bars").classList.remove("paused");
  }
}

// ============================================================
// LIGHTBOX
// ============================================================
function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  lbImg.src = src;
  lb.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("show");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ============================================================
// INIT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  createStars("stars-bg-0", CONFIG.starsPage0);
  createStars("stars-bg-1", CONFIG.starsPage1);
  createStars("stars-bg-2", CONFIG.starsPage2);
  createFloaters();
});
