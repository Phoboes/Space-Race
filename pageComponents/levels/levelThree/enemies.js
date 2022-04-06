import p from "../../globalVars";
import utils from "../../utilityFunctions";

const enemy = {
  populate: () => {
    // Todo: Make this a bit more space invadery
    // Create several large aliens that will drop at the player
    for (let i = 1; i <= 3; i++) {
      const alien = p.aliens.create(i * 200, -50, "asteroidLargeLevelThree");
      // Now the aliens will fall slowly towards the player.

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
      // Now the aliens will fall slowly towards the player.
      alien.body.velocity.y = 60;
    }
    // Do it again after a delay.
    p.game.time.addEvent({
      delay: 2000,
      callback: () => {
        for (let i = 1; i <= 3; i++) {
          const alien = p.aliens.create(
            i * 200,
            -50,
            "asteroidLargeLevelThree"
          );
          // Now the aliens will fall slowly towards the player.

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

          alien.body.velocity.y = 60;
        }
      },
    });
  },
};

export default enemy;
