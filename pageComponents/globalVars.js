import utils from "./utilityFunctions";
const p = {
  // Game logic
  game: null,
  player: null,
  aliens: null,
  bullets: null,
  gameState: {
    level: 1,
    stageText: null,
    levelPending: false,
    canAdvanceLevel: true,
  },
  playerState: {
    ship: null,
    alive: true,
    score: 0,
    velocity: 200,
    lives: 3,
    canFire: true,
    godMode: false,
    totalKillCount: 0,
    animation: null,
    fireBullet: function () {},
  },
  alienState: {
    collisionHandler: null,
  },
  bulletState: {
    createCallback: null,
    disableBulletFromBody: null,
  },
  // todo: review 'enemies'
  enemies: {
    group: null,
    update: null,
    bullets: null,
  },

  audio: {
    playerShot: "playerShot",
    enemyHit: "enemyHit",
  },

  // playerAnimation: null,
  // fireBulletFromPlayer: null,
  // playerVelocity: 200,
  // aliensVelocity: 1,
  // aliensSpawnTime: null,
  // bulletTime: 0,
  // bulletVelocity: 200,
  // bulletFireRate: 1000,
  cursorKeys: null,
  fireButton: null,
  fireRate: 800,
  explosions: null,
  starfield: null,
  score: 0,
  scoreString: "",
  scoreText: null,
  lives: 3,
  enemyBullet: null,
  firingTimer: 0,
  enemySeekerTimer: 0,
  stateText: null,
  smallStateText: null,
  livingEnemies: [],
  canFire: true,
  godMode: false,
  waveTimer: 7000,
  scoreLeading: null,
  aliensSpawned: 0,
  //----- Use this to count every level transition
  levelCounter: 1,
  // --- This will keep track of the total amount of enemies killed.
  totalKillCount: 0,

  // Alien logic:

  // --- These are for the split of asterids on collision

  smallAliens: [],
  smallAlienGroupCounter: 1,

  // -- These are the small alien split for level four/five/six/seven.

  smallAliensLeft: [],
  smallAliensRight: [],
  smallAliensDown: [],
  smallAliensUp: [],

  // -- Alien shooter bullets

  alienShooterbullets: null,
  alienShooterbulletTime: 0,
  alienShooterbulletVelocity: 200,
  alienShooterbulletFireRate: 1000,

  // Missiles

  alienMissilebullets: null,
  alienMissilebulletTime: 0,
  alienMissilebulletVelocity: 200,
  alienMissilebulletFireRate: 1000,
  alienMissileArray: [],
  alienMissileShipArray: [],
  alienShooterArray: [],
  alienShooterBulletsArray: [],
  alienShooter: null,
  alienMissileShip: null,
  alienShotgunner: null,
  alienSeekerArray: [],
  seekerAlien: null,
  alienShotgunnerArray: [],

  // Game bounds

  topX: utils.random(0, 800),
  topY: 0,
  leftX: 0,
  leftY: utils.random(0, 650),
  rightX: 800,
  rightY: utils.random(0, 650),
  bottomX: utils.random(0, 800),
  bottomY: 800,
  diagonalTopLeftX: 0,
  diagonalTopLeftY: 0,
  diagonalTopRightX: 0,
  diagonalTopRightY: 650,
  diagonalBottomLeftX: 0,
  diagonalBottomLeftY: 650,
  diagonalBottomRightX: 800,
  diagonalBottomRightY: 650,
};

export default p;
