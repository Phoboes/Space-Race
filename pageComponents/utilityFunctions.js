import p from "./globalVars";

const utils = {
  random: (min, max) => {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  },

  delay: (t) => {
    p.playerState.canFire = false;
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  },

  drawDebugFrame: (alien) => {
    const graphics = p.game.add.graphics();
    graphics.lineStyle(1, 0x00ff00, 1);
    alien.body.drawDebug(graphics);
  },

  resetGlobalVar: () => {
    p = {
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
        lives: 3,
        canFire: true,
        godMode: false,
        totalKillCount: 0,
        animation: null,
        fireBullet: function () {},
      },
      textState: {
        playerData: null,
      },
      alienState: {
        collisionHandler: null,
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
  },
};

export default utils;
