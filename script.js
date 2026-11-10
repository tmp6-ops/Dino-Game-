// Halloween Escape: Monster Chase 3D Runner

// --- Web Audio Synthesizer (Atmospheric horror sounds, jumps, rolls, boosts, coins, roars) ---
class SoundSystem {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // High pitched jump whoosh
    playJump() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(260, now);
            osc.frequency.exponentialRampToValueAtTime(700, now + 0.16);

            gain.gain.setValueAtTime(0.28, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.19);
        } catch (e) {}
    }

    // Quick whoosh for roll / slide
    playRoll() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(450, now);
            osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

            gain.gain.setValueAtTime(0.25, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.19);
        } catch (e) {}
    }

    // Quick lane switch swoosh
    playSwitchLane() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);

            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.09);
        } catch (e) {}
    }

    // Sweet candy pickup chime
    playCandy() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            [0, 0.07].forEach((delay, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(idx === 0 ? 659.25 : 987.77, now + delay); // E5, B5
                gain.gain.setValueAtTime(0.2, now + delay);
                gain.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.14);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now + delay);
                osc.stop(now + delay + 0.15);
            });
        } catch (e) {}
    }

    // Speed boost rocket sound
    playBoost() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.35);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.46);
        } catch (e) {}
    }

    // Scary monster growl when it gets closer
    playMonsterGrowl() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(80, now);
            osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.6);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.62);
        } catch (e) {}
    }

    // Level up fanfare
    playLevelUp() {
        if (!this.enabled) return;
        this.init();
        try {
            const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
            notes.forEach((f, i) => {
                const now = this.ctx.currentTime + (i * 0.1);
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, now);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.22);
            });
        } catch (e) {}
    }

    // Crash / caught sound
    playCaught() {
        if (!this.enabled) return;
        this.init();
        try {
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(280, now);
            osc.frequency.exponentialRampToValueAtTime(30, now + 0.55);

            gain.gain.setValueAtTime(0.45, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.58);
        } catch (e) {}
    }
}

// --- 5 PROGRESSIVE CHALLENGE STAGES ---
const STAGES = [
    {
        level: 1,
        name: "STAGE 1: HAUNTED SUBURBS",
        targetScore: 400,
        baseSpeed: 10,
        spawnRate: 90,
        skyGrad: "linear-gradient(to bottom, #070312 0%, #20103b 70%, #3f1d6b 100%)",
        roadBorder: "#ff7700"
    },
    {
        level: 2,
        name: "STAGE 2: THE ANCIENT GRAVEYARD",
        targetScore: 1000,
        baseSpeed: 12.5,
        spawnRate: 75,
        skyGrad: "linear-gradient(to bottom, #031514 0%, #0d3835 70%, #155e58 100%)",
        roadBorder: "#00e5ff"
    },
    {
        level: 3,
        name: "STAGE 3: SHADOW WITCH WOODS",
        targetScore: 1800,
        baseSpeed: 14.5,
        spawnRate: 65,
        skyGrad: "linear-gradient(to bottom, #1a0324 0%, #400a58 70%, #6d1594 100%)",
        roadBorder: "#d500f9"
    },
    {
        level: 4,
        name: "STAGE 4: INFERNAL PUMPKIN CRYPT",
        targetScore: 2800,
        baseSpeed: 17,
        spawnRate: 55,
        skyGrad: "linear-gradient(to bottom, #2b0606 0%, #5c1414 70%, #9e1f1f 100%)",
        roadBorder: "#ff1744"
    },
    {
        level: 5,
        name: "STAGE 5: APOCALYPTIC CASTLE ESCAPE",
        targetScore: 4200,
        baseSpeed: 20,
        spawnRate: 45,
        skyGrad: "linear-gradient(to bottom, #11001c 0%, #290038 70%, #4a0066 100%)",
        roadBorder: "#ffd700"
    }
];

// --- GAME STATE ---
const sound = new SoundSystem();

let isPlaying = false;
let score = 0;
let candies = 0;
let currentStageIndex = 0;
let currentLane = 1; // 0 = Left, 1 = Center, 2 = Right
const lanePositions = [16.66, 50, 83.33]; // percentage positions on road

let isJumping = false;
let isRolling = false;
let boostEnergy = 0; // 0 to 100
let isBoosting = false;
let monsterDistance = 15; // 0 (caught) to 100 (far ahead)

let spawnedItems = []; // Array of active road items { id, element, lane, y, type }
let spawnTimer = 0;
let runAnimTimer = 0;
let animationFrameId = null;

// --- DOM ELEMENTS ---
const playerGirl = document.getElementById('playerGirl');
const girlSprite = document.getElementById('girlSprite');
const boostFlames = document.getElementById('boostFlames');
const monsterChaser = document.getElementById('monsterChaser');
const entityLayer = document.getElementById('entityLayer');
const skyBg = document.getElementById('skyBg');
const roadSurface = document.getElementById('roadSurface');

const stageTag = document.getElementById('stageTag');
const candyVal = document.getElementById('candyVal');
const scoreVal = document.getElementById('scoreVal');
const targetVal = document.getElementById('targetVal');
const monsterFill = document.getElementById('monsterFill');
const boostFill = document.getElementById('boostFill');
const floatingBanner = document.getElementById('floatingBanner');
const soundToggleBtn = document.getElementById('soundToggleBtn');

const startOverlay = document.getElementById('startOverlay');
const levelUpOverlay = document.getElementById('levelUpOverlay');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const nextLevelName = document.getElementById('nextLevelName');
const finalScoreMsg = document.getElementById('finalScoreMsg');
const finalCandiesMsg = document.getElementById('finalCandiesMsg');
const stageReachedMsg = document.getElementById('stageReachedMsg');

const startBtn = document.getElementById('startBtn');
const nextLevelBtn = document.getElementById('nextLevelBtn');
const restartBtn = document.getElementById('restartBtn');

// Sound toggle
soundToggleBtn.addEventListener('click', () => {
    const on = sound.toggle();
    soundToggleBtn.innerText = on ? "🔊 Sound: ON" : "🔇 Sound: OFF";
});

// Update lane position visually
function updateGirlPosition() {
    playerGirl.style.left = lanePositions[currentLane] + '%';
    // Monster trails behind slightly tracking girl's lane
    monsterChaser.style.left = lanePositions[currentLane] + '%';
}

// Lane Switch
function moveLeft() {
    if (!isPlaying) return;
    if (currentLane > 0) {
        currentLane--;
        sound.playSwitchLane();
        updateGirlPosition();
    }
}

function moveRight() {
    if (!isPlaying) return;
    if (currentLane < 2) {
        currentLane++;
        sound.playSwitchLane();
        updateGirlPosition();
    }
}

// Jump Action
function jump() {
    if (!isPlaying || isJumping || isRolling) return;
    isJumping = true;
    sound.playJump();
    playerGirl.classList.add('jumping');

    setTimeout(() => {
        playerGirl.classList.remove('jumping');
        isJumping = false;
    }, 650);
}

// Roll / Slide Action
function roll() {
    if (!isPlaying || isJumping || isRolling) return;
    isRolling = true;
    sound.playRoll();
    playerGirl.classList.add('rolling');

    setTimeout(() => {
        playerGirl.classList.remove('rolling');
        isRolling = false;
    }, 600);
}

// Activate Nitro Boost
function activateBoost() {
    if (!isPlaying || isBoosting || boostEnergy < 30) return;
    isBoosting = true;
    sound.playBoost();
    boostFlames.classList.remove('hidden');
    showFloatingBanner("⚡ SUPER SPEED BOOST! ⚡");

    // Push monster back
    monsterDistance = Math.min(85, monsterDistance + 40);

    const boostInterval = setInterval(() => {
        boostEnergy = Math.max(0, boostEnergy - 3);
        boostFill.style.width = boostEnergy + '%';
        if (boostEnergy <= 0) {
            clearInterval(boostInterval);
            isBoosting = false;
            boostFlames.classList.add('hidden');
        }
    }, 100);
}

// Floating notification banner
function showFloatingBanner(text) {
    floatingBanner.innerText = text;
    floatingBanner.classList.remove('hidden');
    setTimeout(() => {
        floatingBanner.classList.add('hidden');
    }, 2000);
}

// Spawn random items on the 3D road
function spawnRoadItem() {
    const stage = STAGES[currentStageIndex];
    const lane = Math.floor(Math.random() * 3);
    const rand = Math.random();

    let itemType = 'tombstone';
    // 40% candy, 15% boostup, 45% obstacles (tombstone, pumpkin, or highweb)
    if (rand < 0.40) {
        itemType = 'candy';
    } else if (rand < 0.52) {
        itemType = 'boostup';
    } else if (rand < 0.75) {
        itemType = 'tombstone'; // jump or dodge
    } else if (rand < 0.90) {
        itemType = 'pumpkin'; // jump or dodge
    } else {
        itemType = 'highweb'; // MUST duck / roll or dodge!
    }

    const itemEl = document.createElement('div');
    itemEl.className = `road-item item-${itemType}`;
    itemEl.style.left = lanePositions[lane] + '%';
    itemEl.style.top = '0px';

    entityLayer.appendChild(itemEl);

    spawnedItems.push({
        element: itemEl,
        lane: lane,
        y: 0,
        type: itemType
    });
}

// Progress directly to the next level
function triggerLevelUp() {
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
    sound.playLevelUp();

    if (currentStageIndex < STAGES.length - 1) {
        currentStageIndex++;
        const nextStage = STAGES[currentStageIndex];
        nextLevelName.innerText = `NEXT: ${nextStage.name}`;
        levelUpOverlay.classList.remove('hidden');
    } else {
        // Game completed all 5 stages!
        showFloatingBanner("🏆 YOU SURVIVED HALLOWEEN NIGHT! 🏆");
        setTimeout(() => handleGameOver(true), 1500);
    }
}

// Continue to next stage
function continueNextStage() {
    levelUpOverlay.classList.add('hidden');
    applyStageTheme(currentStageIndex);
    // Clear road items
    clearAllRoadItems();
    monsterDistance = 35; // grant fresh distance advantage
    isPlaying = true;
    animationFrameId = requestAnimationFrame(gameLoop);
}

function applyStageTheme(idx) {
    const stage = STAGES[idx];
    stageTag.innerText = stage.name;
    targetVal.innerText = stage.targetScore;
    skyBg.style.background = stage.skyGrad;
    roadSurface.style.borderLeftColor = stage.roadBorder;
    roadSurface.style.borderRightColor = stage.roadBorder;
}

function clearAllRoadItems() {
    spawnedItems.forEach(item => {
        if (item.element && item.element.parentNode) {
            item.element.parentNode.removeChild(item.element);
        }
    });
    spawnedItems = [];
}

// Main Game Engine Loop
function gameLoop() {
    if (!isPlaying) return;

    const currentStage = STAGES[currentStageIndex];
    const speed = (isBoosting ? currentStage.baseSpeed * 1.8 : currentStage.baseSpeed);

    // Increase score
    score += (isBoosting ? 2 : 1);
    scoreVal.innerText = String(Math.floor(score)).padStart(4, '0');

    // Running stride leg animation for girl
    runAnimTimer++;
    if (runAnimTimer % 8 === 0) {
        girlSprite.classList.toggle('running-step');
    }

    // Check level progression directly when fixed score target reached
    if (score >= currentStage.targetScore) {
        triggerLevelUp();
        return;
    }

    // Spawn road obstacles and pickups
    spawnTimer++;
    if (spawnTimer >= (isBoosting ? currentStage.spawnRate * 0.7 : currentStage.spawnRate)) {
        spawnRoadItem();
        spawnTimer = 0;
    }

    // Move road items towards player (Z/Y perspective illusion)
    for (let i = spawnedItems.length - 1; i >= 0; i--) {
        const item = spawnedItems[i];
        item.y += speed;
        item.element.style.top = item.y + 'px';

        // Scale up items as they approach for 3D depth
        const scale = 0.5 + (item.y / 580) * 0.7;
        item.element.style.transform = `translate(-50%, -50%) scale(${scale})`;

        // Collision Window (player girl is around y: 460 - 520)
        if (item.y >= 460 && item.y <= 520) {
            if (item.lane === currentLane) {
                // Collectible: Candy
                if (item.type === 'candy') {
                    candies++;
                    score += 50;
                    candyVal.innerText = candies;
                    boostEnergy = Math.min(100, boostEnergy + 10);
                    boostFill.style.width = boostEnergy + '%';
                    sound.playCandy();
                    removeRoadItem(i);
                    continue;
                }
                // Collectible: Boost Up Potion
                else if (item.type === 'boostup') {
                    boostEnergy = 100;
                    boostFill.style.width = '100%';
                    sound.playCandy();
                    showFloatingBanner("⚡ NITRO READY! PRESS 'E'");
                    removeRoadItem(i);
                    continue;
                }
                // Obstacle: High Web (Slide / Roll under it!)
                else if (item.type === 'highweb') {
                    if (!isRolling) {
                        handleCollision();
                        removeRoadItem(i);
                        continue;
                    }
                }
                // Obstacle: Tombstone / Pumpkin (Jump over it!)
                else if (item.type === 'tombstone' || item.type === 'pumpkin') {
                    if (!isJumping) {
                        handleCollision();
                        removeRoadItem(i);
                        continue;
                    }
                }
            }
        }

        // Cleanup offscreen items
        if (item.y > 600) {
            removeRoadItem(i);
        }
    }

    // Monster mechanics (creeps closer over time, pushed back by boost/candy)
    if (!isBoosting) {
        monsterDistance -= 0.05;
    }
    monsterDistance = Math.max(0, Math.min(90, monsterDistance));

    // Update Proximity Meter (0% = far, 100% = caught)
    const proximity = Math.floor(100 - (monsterDistance / 90 * 100));
    monsterFill.style.width = proximity + '%';

    // Visual position of monster behind girl
    const monsterBottom = -25 + (proximity * 0.45);
    monsterChaser.style.bottom = monsterBottom + 'px';

    if (proximity > 80 && Math.random() < 0.02) {
        sound.playMonsterGrowl();
    }

    if (monsterDistance <= 5) {
        handleGameOver(false);
        return;
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

function removeRoadItem(index) {
    const item = spawnedItems[index];
    if (item && item.element && item.element.parentNode) {
        item.element.parentNode.removeChild(item.element);
    }
    spawnedItems.splice(index, 1);
}

// When colliding with an obstacle: slow down and monster closes in immediately
function handleCollision() {
    sound.playCaught();
    monsterDistance = Math.max(0, monsterDistance - 25);
    playerGirl.style.filter = "brightness(2) contrast(1.5)";
    setTimeout(() => { playerGirl.style.filter = ""; }, 300);

    showFloatingBanner("⚠️ STUMBLED! MONSTER CLOSING IN!");
}

// Start New Game
function startGame() {
    sound.init();
    score = 0;
    candies = 0;
    currentStageIndex = 0;
    currentLane = 1;
    boostEnergy = 40;
    monsterDistance = 30;
    isJumping = false;
    isRolling = false;
    isBoosting = false;

    candyVal.innerText = "0";
    scoreVal.innerText = "0000";
    boostFill.style.width = "40%";

    applyStageTheme(0);
    updateGirlPosition();
    clearAllRoadItems();

    startOverlay.classList.add('hidden');
    levelUpOverlay.classList.add('hidden');
    gameOverOverlay.classList.add('hidden');

    isPlaying = true;
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(gameLoop);
}

// Game Over
function handleGameOver(won = false) {
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
    sound.playCaught();

    finalScoreMsg.innerText = `Final Score: ${String(Math.floor(score)).padStart(4, '0')}`;
    finalCandiesMsg.innerText = `Candies Gathered: ${candies} 🍬`;
    stageReachedMsg.innerText = won ? "🎉 ESCAPED THE HORROR!" : `Defeated in: ${STAGES[currentStageIndex].name}`;

    gameOverOverlay.classList.remove('hidden');
}

// --- CONTROLS / KEYBOARD LISTENERS ---
window.addEventListener('keydown', (e) => {
    if (!isPlaying) {
        if (e.code === 'Space' && !startOverlay.classList.contains('hidden')) {
            startGame();
        }
        return;
    }

    switch(e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            e.preventDefault();
            moveLeft();
            break;
        case 'ArrowRight':
        case 'KeyD':
            e.preventDefault();
            moveRight();
            break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
            e.preventDefault();
            jump();
            break;
        case 'ArrowDown':
        case 'KeyS':
            e.preventDefault();
            roll();
            break;
        case 'KeyE':
        case 'ShiftLeft':
        case 'ShiftRight':
            e.preventDefault();
            activateBoost();
            break;
    }
});

// UI Button handlers
startBtn.addEventListener('click', () => startGame());
nextLevelBtn.addEventListener('click', () => continueNextStage());
restartBtn.addEventListener('click', () => startGame());

// Mobile On-Screen Controls
document.getElementById('mobLeft').addEventListener('click', () => moveLeft());
document.getElementById('mobRight').addEventListener('click', () => moveRight());
document.getElementById('mobJump').addEventListener('click', () => jump());
document.getElementById('mobRoll').addEventListener('click', () => roll());
document.getElementById('mobBoost').addEventListener('click', () => activateBoost());
