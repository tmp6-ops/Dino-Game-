const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const overlay = document.getElementById('overlay');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const gameBoard = document.getElementById('game-board');
const soundBtn = document.getElementById('sound-btn');

let isJumping = false;
let isGameOver = false;
let isPlaying = false;
let soundEnabled = true;
let score = 0;
let highScore = localStorage.getItem('dino_high_score') || 0;
let obstaclePosition = 650;
let obstacleSpeed = 6;
let animationFrameId = null;
let scoreIntervalId = null;

// --- Web Audio API (Retro 8-bit Sound Effects) ---
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playJumpSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  // Fast upward pitch sweep
  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.exponentialRampToValueAtTime(500, now + 0.12);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.12);
}

function playScoreSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc2.type = 'sine';

  osc1.frequency.setValueAtTime(587.33, now); // D5
  osc2.frequency.setValueAtTime(880.00, now + 0.08); // A5

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc1.stop(now + 0.08);
  osc2.start(now + 0.08);
  osc2.stop(now + 0.22);
}

function playGameOverSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  // Rapid downward tone
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);

  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.35);
}

// Sound toggle button
soundBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  soundEnabled = !soundEnabled;
  soundBtn.textContent = soundEnabled ? '🔊' : '🔇';
  if (soundEnabled) {
    getAudioContext();
  }
});

// Format score with leading zeros (e.g., 00120)
function formatScore(val) {
  return String(Math.floor(val)).padStart(5, '0');
}

highScoreDisplay.textContent = formatScore(highScore);

function jump() {
  getAudioContext();

  if (!isPlaying) {
    startGame();
    return;
  }
  if (isJumping || isGameOver) return;

  isJumping = true;
  playJumpSound();
  dino.classList.add('jump');

  setTimeout(() => {
    dino.classList.remove('jump');
    isJumping = false;
  }, 550);
}

function startGame() {
  if (isPlaying) return;
  getAudioContext();

  score = 0;
  obstaclePosition = gameBoard.offsetWidth;
  obstacleSpeed = 6;
  isGameOver = false;
  isPlaying = true;

  overlay.classList.add('hidden');
  scoreDisplay.textContent = formatScore(score);

  // Score counter increment
  clearInterval(scoreIntervalId);
  scoreIntervalId = setInterval(() => {
    if (!isGameOver && isPlaying) {
      score += 1;
      scoreDisplay.textContent = formatScore(score);

      // Play chime every 100 points and speed up
      if (score % 100 === 0) {
        playScoreSound();
        if (obstacleSpeed < 14) {
          obstacleSpeed += 0.5;
        }
      }
    }
  }, 100);

  cancelAnimationFrame(animationFrameId);
  gameLoop();
}

function gameOver() {
  isGameOver = true;
  isPlaying = false;
  clearInterval(scoreIntervalId);
  cancelAnimationFrame(animationFrameId);
  playGameOverSound();

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('dino_high_score', highScore);
    highScoreDisplay.textContent = formatScore(highScore);
  }

  message.textContent = 'G A M E   O V E R';
  restartBtn.style.display = 'block';
  overlay.classList.remove('hidden');
}

function gameLoop() {
  if (isGameOver) return;

  // Move cactus
  obstaclePosition -= obstacleSpeed;
  if (obstaclePosition < -30) {
    obstaclePosition = gameBoard.offsetWidth + Math.random() * 80;
  }
  cactus.style.left = `${obstaclePosition}px`;

  // Collision detection
  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();

  // Safety margin for fair gameplay
  const collision = !(
    dinoRect.right - 10 < cactusRect.left + 5 ||
    dinoRect.left + 10 > cactusRect.right - 5 ||
    dinoRect.bottom - 4 < cactusRect.top + 6 ||
    dinoRect.top + 4 > cactusRect.bottom
  );

  if (collision) {
    gameOver();
    return;
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

// Input Handlers
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp' || e.key === 'ArrowUp') {
    e.preventDefault();
    jump();
  }
});

// Click / Tap support for mouse and mobile
gameBoard.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  jump();
});

restartBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  startGame();
});
