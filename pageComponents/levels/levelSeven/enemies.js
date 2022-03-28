import p from "../../globalVars";
import utils from "../../utilityFunctions";

const enemy = {
  create: () => {
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        const asteroid = p.aliens.create(utils.random(50, 750), -50);
        p.game.anims.create({
          key: "largeAsteroidSpin",
          frames: p.game.anims.generateFrameNumbers("levelSixAsteroidLarge", {
            start: 0,
            end: 3,
          }),
          frameRate: 3,
          repeat: -1,
        });

        asteroid.play("largeAsteroidSpin");
        asteroid.body.velocity.y = 60;
      },
      repeat: 4,
    });

    p.game.time.addEvent({
      delay: 5000,
      callback: () => {
        const asteroid = p.aliens.create(utils.random(50, 750), 800);
        p.game.anims.create({
          key: "largeAsteroidSpin",
          frames: p.game.anims.generateFrameNumbers("levelSixAsteroidLarge", {
            start: 0,
            end: 3,
          }),
          frameRate: 3,
          repeat: -1,
        });

        asteroid.play("largeAsteroidSpin");
        asteroid.body.velocity.y = -60;
      },
      repeat: 4,
    });

    p.game.time.addEvent({
      delay: 6000,
      callback: () => {
        const asteroid = p.aliens.create(800, utils.random(50, -750));
        p.game.anims.create({
          key: "largeAsteroidSpin",
          frames: p.game.anims.generateFrameNumbers("levelSixAsteroidLarge", {
            start: 0,
            end: 3,
          }),
          frameRate: 3,
          repeat: -1,
        });

        asteroid.play("largeAsteroidSpin");
        asteroid.body.velocity.x = -60;
      },
      repeat: 4,
    });

    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        const asteroid = p.aliens.create(800, utils.random(50, 750));
        p.game.anims.create({
          key: "largeAsteroidSpin",
          frames: p.game.anims.generateFrameNumbers("levelSixAsteroidLarge", {
            start: 0,
            end: 3,
          }),
          frameRate: 3,
          repeat: -1,
        });

        asteroid.play("largeAsteroidSpin");
        asteroid.body.velocity.x = -60;
      },
      repeat: 4,
    });
  },
};

export default enemy;
