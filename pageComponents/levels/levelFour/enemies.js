import p from "../../globalVars";
import utils from "../../utilityFunctions";

const enemy = {
  create: () => {
    const alien = p.aliens.create(utils.random(50, 750), -50);
    alien.body.velocity.y = 60;
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
  },
  populate: () => {
    enemy.create();
    // Top
    p.game.time.addEvent({
      delay: 2000,
      callback: () => {
        enemy.create();
      },
      repeat: 12,
    });
  },
};

export default enemy;
