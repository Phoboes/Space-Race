import p from "../../globalVars";
import utils from "../../utilityFunctions";

const enemy = {
  createSprite: (params) => {
    const { game, x, y, vx, vy, key, frames } = params;

    // Create an animation for access to sprite frames
    const anim = game.anims.create({
      key,
      frames: game.anims.generateFrameNumbers(frames, {
        start: 0,
        end: 4,
      }),
      frameRate: 50,
      repeat: 0,
    });

    //   Add an asteroid to the game group
    const asteroid = p.aliens.create(x, y);

    // This 'animation' gives access to random frame selections, the sprite in this case is just colour variations
    asteroid.play(anim.key);
    //   Once the animation runs once, randomly select a frame/colour
    asteroid.on("animationcomplete", () => {
      const frameNum = utils.random(0, 4);
      asteroid.setFrame(frameNum);
    });

    asteroid.body.velocity.y = vy;
    asteroid.body.velocity.x = vx;
  },

  createExplosion: (alien, size) => {
    const asteroidId = alien.frame.name;
    const { x, y } = alien;
    let explosionKey = null;

    // Explosion animation -- loaded offscreen and invisible
    const explosion = p.game.physics.add.sprite(-100, -100);

    // The ID is generated randomly when the alien is spawned -- it's the frame on which the sprite is frozen and determines the asteroid colour and is used to determine the explosion colour.
    if (asteroidId === 0) {
      // Yellow explosion
      explosionKey = p.game.anims.create({
        key: `levelSeven${size}AsteroidExplosionYellow`,
        frames: p.game.anims.generateFrameNumbers(
          `levelSeven${size}AsteroidExplosionYellow`,
          {
            start: 0,
            end: 15,
          }
        ),
        frameRate: 25,
        repeat: 0,
      });
    } else if (asteroidId === 1) {
      // Red explosion
      explosionKey = p.game.anims.create({
        key: `levelSeven${size}AsteroidExplosionRed`,
        frames: p.game.anims.generateFrameNumbers(
          `levelSeven${size}AsteroidExplosionRed`,
          {
            start: 0,
            end: 15,
          }
        ),
        frameRate: 25,
        repeat: 0,
      });
    } else if (asteroidId === 2) {
      // Green explosion
      explosionKey = p.game.anims.create({
        key: `levelSeven${size}AsteroidExplosionGreen`,
        frames: p.game.anims.generateFrameNumbers(
          `levelSeven${size}AsteroidExplosionGreen`,
          {
            start: 0,
            end: 15,
          }
        ),
        frameRate: 25,
        repeat: 0,
      });
    } else if (asteroidId === 3) {
      // Purple explosion
      explosionKey = p.game.anims.create({
        key: `levelSeven${size}AsteroidExplosionPurple`,
        frames: p.game.anims.generateFrameNumbers(
          `levelSeven${size}AsteroidExplosionPurple`,
          {
            start: 0,
            end: 15,
          }
        ),
        frameRate: 25,
        repeat: 0,
      });
    } else if (asteroidId === 4) {
      // Cyan explosion
      explosionKey = p.game.anims.create({
        key: `levelSeven${size}AsteroidExplosionCyan`,
        frames: p.game.anims.generateFrameNumbers(
          `levelSeven${size}AsteroidExplosionCyan`,
          {
            start: 0,
            end: 15,
          }
        ),
        frameRate: 25,
        repeat: 0,
      });
    }

    explosion.body.allowGravity = false;
    explosion.setPosition(x, y);
    explosion.play(explosionKey.key);
  },

  explosionHandler: (alien) => {
    if (alien.texture.key === "levelSevenAsteroidLarge") {
      enemy.createExplosion(alien, "Large");
    } else if (alien.texture.key === "levelSevenAsteroidsSmall") {
      enemy.createExplosion(alien, "Small");
    } else {
      enemy.createExplosion(alien, "Medium");
    }
  },

  populate: (game) => {
    // ----------------------
    // Large asteroids
    // ----------------------

    // Top spawn
    game.time.addEvent({
      delay: 4000,
      callback: () => {
        enemy.createSprite({
          game: game,
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
    game.time.addEvent({
      delay: 4000,
      callback: () => {
        enemy.createSprite({
          game: game,
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
    game.time.addEvent({
      delay: 5000,
      callback: () => {
        enemy.createSprite({
          game: game,
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
    game.time.addEvent({
      delay: 3500,
      callback: () => {
        enemy.createSprite({
          game: game,
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
    game.time.addEvent({
      delay: 3000,
      callback: () => {
        enemy.createSprite({
          game: game,
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
    game.time.addEvent({
      delay: 2000,
      callback: () => {
        enemy.createSprite({
          game: game,
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
    game.time.addEvent({
      delay: 2700,
      callback: () => {
        enemy.createSprite({
          game: game,
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
    game.time.addEvent({
      delay: 4000,
      callback: () => {
        enemy.createSprite({
          game: game,
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
