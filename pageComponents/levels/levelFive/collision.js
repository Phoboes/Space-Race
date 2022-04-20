import p from "../../globalVars";
import livesAndScore from "../../render/livesAndScore";

const collision = {
  enable: () => {
    // Phaser gets iffy about overwriting physics, so we have to force its hand here
    p.alienState.collisionHandler.collideCallback =
      collision.playerShotAlienHandler;

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
    //  When an alien hits the player, kill it and take a life
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

    //AUDIO enemy is hit by bullet
    const hitAudio = p.game.sound.add(p.audio.enemyHit);
    hitAudio.play();
    //  And create an explosion
    collision.explosion.create(player);
  },

  playerShotAlienHandler: (alien, bullet) => {
    const { x, y } = alien;
    //  When a bullet hits an alien we kill them both
    bullet.body.gameObject.disableBody(true, true);
    alien.destroy();

    // If it's a large asteroid, generate some fragments
    if (alien.texture.key === "invaderLarge") {
      // Create 2 children that split left and right from the parent
      const leftSplitAlien = p.aliens.create(x - 10, y).setVisible(false);
      const rightSplitAlien = p.aliens.create(x + 10, y).setVisible(false);

      // Create the animation for the children
      p.game.anims.create({
        key: "invaderSmall",
        frames: p.game.anims.generateFrameNumbers("invaderSmall", {
          start: 0,
          end: 1,
        }),
        frameRate: 3,
        repeat: -1,
      });

      // Once the explosion is done, play the animation
      p.game.time.addEvent({
        delay: 200,
        callback: () => {
          leftSplitAlien.play("invaderSmall").setVisible(true);
          rightSplitAlien.play("invaderSmall").setVisible(true);
          leftSplitAlien.body.velocity.y = 60;
          leftSplitAlien.body.velocity.x = -10;
          rightSplitAlien.body.velocity.y = 60;
          rightSplitAlien.body.velocity.x = 10;
        },
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

    create: (target) => {
      const { x, y } = target;
      // Create the explosion group
        const explosionSprite = p.game.physics.add.sprite({
          x: -100,
          y: -100,
        });
        // And hide it offscreen until needed
        explosionSprite.setVisible(false);
      

      // Create the explosion animation
        collision.explosion.animation = p.game.anims.create({
          key: "levelThreeKaboom",
          frames: p.game.anims.generateFrameNumbers("levelThreeKaboom", {
            start: 0,
            end: 3,
          }),
          frameRate: 8,
          repeat: 0,
        });

      //  Place the explosion, play the animation, hide it again.
      explosionSprite.setPosition(x, y);
      explosionSprite.setVisible(true);
      explosionSprite.play("levelThreeKaboom");
      //   Once the animation finishes, remove it from the scene
      explosionSprite.on("animationcomplete", () => {
        explosionSprite.setVisible(false);
        explosionSprite.destroy();
      });
      explosionSprite.body.allowGravity = false;
    },
    animation: null,
  },
};

export default collision;
