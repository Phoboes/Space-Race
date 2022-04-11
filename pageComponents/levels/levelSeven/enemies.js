import p from "../../globalVars";
import utils from "../../utilityFunctions";

const enemy = {
  create: (asteroidData) => {
    const { x, y, vx, vy, key, frames } = asteroidData;

    // Keys and frames are used here so we can use this command to spawn both large and medium asteroids with the same function
    // Vx and VY are added to apply a little randomness to their trajectories on create

    // Create an animation for access to sprite frames
    const anim = p.game.anims.create({
      key,
      frames: p.game.anims.generateFrameNumbers(frames, {
        start: 0,
        end: 4,
      }),
      frameRate: 50,
      repeat: 0,
    });

    //   Add an asteroid to the game group
    const asteroid = p.aliens.create(x, y);

    // This 'animation' gives access to random frame selections, the sprite in this case is just colour variations of the same asteroid
    asteroid.play(anim.key);
    //   Once the animation runs once, randomly select a frame/colour
    asteroid.on("animationcomplete", () => {
      const frameNum = utils.random(0, 4);
      asteroid.setFrame(frameNum);
    });

    asteroid.body.velocity.y = vy;
    asteroid.body.velocity.x = vx;
  },

  populate: () => {
    // ----------------------
    // Large asteroids
    // ----------------------

    // Top spawn
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        enemy.create({
          game: p.game,
          x: utils.random(50, 750),
          y: -50,
          vx: 0,
          vy: 60,
          key: "levelSevenAsteroidsLarge",
          frames: "levelSevenAsteroidLarge",
        });
      },
      repeat: 4,
    });

    // Bottom Spawn
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        enemy.create({
          game: p.game,
          x: utils.random(50, 750),
          y: 800,
          vx: 0,
          vy: -60,
          key: "levelSevenAsteroidsLarge",
          frames: "levelSevenAsteroidLarge",
        });
      },
      repeat: 4,
    });

    // Left Spawn
    p.game.time.addEvent({
      delay: 5000,
      callback: () => {
        enemy.create({
          game: p.game,
          x: 800,
          y: utils.random(50, 750),
          vx: -60,
          vy: 0,
          key: "levelSevenAsteroidsLarge",
          frames: "levelSevenAsteroidLarge",
        });
      },
      repeat: 4,
    });
    // Right spawn
    p.game.time.addEvent({
      delay: 3500,
      callback: () => {
        enemy.create({
          game: p.game,
          x: -50,
          y: utils.random(50, 750),
          vx: 60,
          vy: 0,
          key: "levelSevenAsteroidsLarge",
          frames: "levelSevenAsteroidLarge",
        });
      },
      repeat: 4,
    });
    // ----------------------
    // Medium asteroids
    // ----------------------

    // Top spawn
    p.game.time.addEvent({
      delay: 3000,
      callback: () => {
        enemy.create({
          game: p.game,
          x: utils.random(50, 750),
          y: -50,
          vx: utils.random(-5, 5),
          vy: 60,
          key: "levelSevenAsteroid",
          frames: "levelSevenAsteroids",
        });
      },
      repeat: 4,
    });

    // Bottom Spawn
    p.game.time.addEvent({
      delay: 2000,
      callback: () => {
        enemy.create({
          game: p.game,
          x: utils.random(50, 750),
          y: 800,
          vx: utils.random(-5, 5),
          vy: -60,
          key: "levelSevenAsteroid",
          frames: "levelSevenAsteroids",
        });
      },
      repeat: 4,
    });

    // Left Spawn
    p.game.time.addEvent({
      delay: 2700,
      callback: () => {
        enemy.create({
          game: p.game,
          x: 800,
          y: utils.random(50, 750),
          vx: -60,
          vy: utils.random(-5, 5),
          key: "levelSevenAsteroid",
          frames: "levelSevenAsteroids",
        });
      },
      repeat: 4,
    });

    // Right spawn
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        enemy.create({
          game: p.game,
          x: -50,
          y: utils.random(50, 750),
          vx: 60,
          vy: utils.random(-5, 5),
          key: "levelSevenAsteroid",
          frames: "levelSevenAsteroids",
        });
      },
      repeat: 4,
    });
  },
};

export default enemy;
