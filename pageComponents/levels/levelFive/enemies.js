import p from "../../globalVars";
import utils from "../../utilityFunctions";

const enemy = {
  create: (x, y) => {
    const alien = p.aliens.create(x, y, "asteroidLargeLevelThree");

    p.game.anims.create({
      key: "invaderLarge",
      frames: p.game.anims.generateFrameNumbers("invaderLarge", {
        start: 0,
        end: 1,
      }),
      frameRate: 3,
      repeat: -1,
    });
    alien.play("invaderLarge");

    return alien;
  },
  populate: () => {
    // Top
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        const alien = enemy.create(utils.random(50, 750), -50);
        alien.body.velocity.y = 60;
      },
      repeat: 4,
    });

    // Bottom
    p.game.time.addEvent({
      delay: 5000,
      callback: () => {
        const alien = enemy.create(utils.random(50, 750), 650);
        alien.body.velocity.y = -60;
      },
      repeat: 4,
    });

    // Right
    p.game.time.addEvent({
      delay: 6000,
      callback: () => {
        const alien = enemy.create(800, utils.random(50, 700));
        alien.body.velocity.x = -60;
      },
      repeat: 4,
    });

    // Left
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        const alien = enemy.create(-50, utils.random(50, 700));
        alien.body.velocity.x = 60;
      },
      repeat: 4,
    });
  },
};

export default enemy;
