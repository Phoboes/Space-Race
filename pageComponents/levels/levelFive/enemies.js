import p from "../../globalVars";
import utils from "../../utilityFunctions";

const enemy = {
  populate: () => {
    // Top
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        const asteroid = p.aliens.create(
          utils.random(50, 750),
          -50,
          "asteroidLargeLevelThree"
        );
        asteroid.body.velocity.y = 60;
      },
      repeat: 4,
    });

    // Bottom
    p.game.time.addEvent({
      delay: 5000,
      callback: () => {
        const asteroid = p.aliens.create(
          utils.random(50, 750),
          800,
          "asteroidLargeLevelThree"
        );
        asteroid.body.velocity.y = -60;
      },
      repeat: 4,
    });

    // Right
    p.game.time.addEvent({
      delay: 6000,
      callback: () => {
        const asteroid = p.aliens.create(
          800,
          utils.random(50, 750),
          "asteroidLargeLevelThree"
        );
        asteroid.body.velocity.x = -60;
      },
      repeat: 4,
    });

    // Left
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        const asteroid = p.aliens.create(
          -50,
          utils.random(50, 750),
          "asteroidLargeLevelThree"
        );
        console.log(asteroid);
        asteroid.body.velocity.x = 60;
      },
      repeat: 4,
    });
  },
};

export default enemy;
