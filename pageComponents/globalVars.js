export const setInitialState = () => {
  return {
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
      cursorKeys: null,
    },
    playerState: {
      ship: null,
      alive: true,
      score: 0,
      velocity: 200,
      lives: 3000,
      fireRate: 800,
      canFire: true,
      godMode: false,
      totalKillCount: 0,
      animation: null,
      fireBullet: function () {},
    },
    textState: {
      levelText: null,
      playerData: null,
    },
    alienState: {
      collisionHandler: null,
      spawnRate: 1,
      fireRate: 1,
    },
    bulletState: {
      createCallback: null,
      disableBulletFromBody: null,
    },
    enemies: {
      update: null,
      bullets: null,
    },

    audio: {
      playerShot: "playerShot",
      enemyHit: "enemyHit",
    },
  };
};

const p = setInitialState();
export default p;
