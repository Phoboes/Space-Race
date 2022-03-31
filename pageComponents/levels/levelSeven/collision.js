import p from "../../globalVars";
import utils from "../../utilityFunctions";
import enemy from "./enemies";
import livesAndScore from "../../render/livesAndScore";

const collision = {
  enable: () => {
    // Phaser gets iffy about overwriting physics, so we have to force its hand here
    p.alienState.collisionHandler.collideCallback =
      collision.playerShotAlienHandler;

    // New explosion; new collison
    p.alienState.collisionHandler = p.game.physics.add.overlap(
      p.aliens,
      p.bullets,
      collision.playerShotAlienHandler,
      null,
      p.game
    );

    // Adds collision detection between player and aliens.
    p.game.physics.add.overlap(
      p.aliens,
      p.player,
      collision.playerAlienCollisionHandler,
      null,
      p.game
    );
  },
  playerAlienCollisionHandler: (player, alien) => {
    //  When an alien hits the player, kill it, take a player life away, render an explosion
    collision.explosion.create(alien);
    alien.destroy();

    // remove a life from the player
    if (p.playerState.lives > 0) {
      p.playerState.lives--;
    }

    // Update the react state and the phaser text up the top of the screen
    p.updateReactState({
      ...p,
    });
    livesAndScore.update();

    // Play an explosion sound
    const hitAudio = p.game.sound.add(p.audio.enemyHit);
    hitAudio.play();
  },

  playerShotAlienHandler: (alien, bullet) => {
    const { x, y } = alien;
    // Get the alien's velocity *before* removing it from the scene
    const velocity = alien.body.velocity;
    bullet.body.gameObject.disableBody(true, true);
    alien.destroy();

    // If it's a large asteroid, generate some fragments
    // If it's a large asteroid, generate some fragments
    if (alien.texture.key === "levelSevenAsteroidLarge") {
      // Create 2 children that split left and right from the parent
      enemy.create({
        game: p.game,
        x: x - 10,
        y,
        vx: utils.random(-60, 60),
        vy: utils.random(-60, 60),
        key: "levelSevenAsteroidSmall",
        frames: "levelSevenAsteroidsSmall",
      });

      enemy.create({
        game: p.game,
        x: x + 10,
        y,
        vx: utils.random(-60, 60),
        vy: utils.random(-60, 60),
        key: "levelSevenAsteroidSmall",
        frames: "levelSevenAsteroidsSmall",
      });
    }

    //AUDIO enemy is hit by bullet
    const hitAudio = p.game.sound.add(p.audio.enemyHit);
    hitAudio.play();

    //  Increase the score,
    const playerState = {
      ...p.playerState,
      score: (p.playerState.score += 20),
      totalKillCount: p.playerState.totalKillCount++,
    };
    // update react states,
    p.updateReactState({
      ...p,
      playerState,
    });
    // and update the phaser text for scores/lives
    livesAndScore.update();

    //  And create an explosion
    collision.explosion.create(alien);
  },
  explosion: {
    // -------------------------------------------------------
    // Create an explosion model and replay it on request
    // -------------------------------------------------------

    create: (alien) => {
      // Set the explosion type based on the size and colour of the enemy
      if (alien.texture.key === "levelSevenAsteroidLarge") {
        collision.explosion.render(alien, "Large");
      } else if (alien.texture.key === "levelSevenAsteroidsSmall") {
        collision.explosion.render(alien, "Small");
      } else {
        collision.explosion.render(alien, "Medium");
      }
    },

    render: (alien, size) => {
      const { x, y } = alien;

      // Explosion animation -- loaded offscreen and invisible
      const explosion = p.game.physics.add.sprite(-100, -100);

      explosion.setPosition(x, y);
      const explosionAnimationKey = collision.explosion.getExplosionType(
        alien.frame.name,
        size
      );
      explosion.play(explosionAnimationKey.key);
      explosion.body.allowGravity = false;
    },
    getExplosionType: (asteroidId, size) => {
      // The ID is generated randomly when the alien is spawned -- it's the frame on which the sprite is frozen and determines the asteroid colour and is used to determine the explosion colour.

      let explosionKey = null;
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
      return explosionKey;
    },

    sprite: null,
    animation: null,
  },
};

export default collision;
