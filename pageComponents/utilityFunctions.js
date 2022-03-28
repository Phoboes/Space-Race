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
    p.canFire = false;
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  },

  drawDebugFrame: (alien) => {
    const graphics = p.game.add.graphics();
    graphics.lineStyle(1, 0x00ff00, 1);
    alien.body.drawDebug(graphics);
  },

  reset: {
    groups: () => {
      // p.aliens = null;
    },
    player: () => {},
  },
};

export default utils;
