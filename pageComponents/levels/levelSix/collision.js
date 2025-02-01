import p from "../../globalVars";
import utils from "../../utilityFunctions";
import livesAndScore from "../../render/livesAndScore";

const collision = {
  enable: () => {
    // Phaser gets iffy about overwriting physics, so we have to force its hand here
    p.alienState.collisionHandler.collideCallback =
      collision.playerShotAlienHandler;

    // Adds collision detection between bullets and aliens.
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
    const hitAudio = p.game.sound.add("enemyHit");
    hitAudio.play();
  },

  playerShotAlienHandler: (alien, bullet) => {
    const { x, y } = alien;
    // Get the alien's velocity *before* removing it from the scene
    const velocity = alien.body.velocity;
    bullet.body.gameObject.disableBody(true, true);
    console.log(alien);
    alien.destroy();

    // If it's a large asteroid, generate some fragments
    if (alien.texture.key === "levelSixAsteroidLarge") {
      // Create the animation for the children
      p.game.anims.create({
        key: "levelSixAsteroidSmallSpin",
        frames: p.game.anims.generateFrameNumbers("levelSixAsteroidSmall", {
          start: 0,
          end: 3,
        }),
        frameRate: 3,
        repeat: -1,
      });

      // Rather than a fixed velocity, these children take the velocity angle from the parent asteroid
      // With that velocity they branch out from it randomly between -40 and 40 degrees and set their velocities to that angle
      const firstChildAsteroid = p.aliens.create(x, y, "levelSixAsteroidSmall");
      const firstChildVx = velocity.x + utils.random(-40, 40);
      const firstChildVy = velocity.y + utils.random(-40, 40);
      firstChildAsteroid.setVelocity(firstChildVx, firstChildVy);
      firstChildAsteroid.setVisible(false);

      const secondChildAsteroid = p.aliens.create(
        x,
        y,
        "levelSixAsteroidSmall"
      );
      const secondChildVx = velocity.x + utils.random(-40, 40);
      const secondChildVy = velocity.y + utils.random(-40, 40);
      secondChildAsteroid.setVelocity(secondChildVx, secondChildVy);
      secondChildAsteroid.setVisible(false);

      // Wait a tiny bit for the explosion animation to play before showing and animating the child asteroids
      p.game.time.addEvent({
        delay: 200,
        callback: () => {
          firstChildAsteroid.setVisible(true);
          secondChildAsteroid.setVisible(true);
          firstChildAsteroid.play("levelSixAsteroidSmallSpin");
          secondChildAsteroid.play("levelSixAsteroidSmallSpin");
        },
      });
    }

    //AUDIO enemy is hit by bullet
    const hitAudio = p.game.sound.add("enemyHit");
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

    create: (target) => {
      const { x, y } = target;
      // Create a new sprite without storing it in the collision object
      const explosionSprite = p.game.add.sprite(x, y, "levelSixKaboom");
      explosionSprite.setVisible(true);

      // If the animation hasn't been created, create it
      if (!p.game.anims.exists("levelSixKaboom")) {
        p.game.anims.create({
          key: "levelSixKaboom",
          frames: p.game.anims.generateFrameNumbers("levelSixKaboom", {
            start: 0,
            end: 3,
          }),
          frameRate: 16,
          repeat: 0,
        });
      }

      // Play the animation and destroy the sprite when done
      explosionSprite.play("levelSixKaboom");
      explosionSprite.on("animationcomplete", () => {
        explosionSprite.destroy();
      });
    },
  },
};

export default collision;
