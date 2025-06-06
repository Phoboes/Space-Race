import p from "../../globalVars";
import bullets from "../levelTen/bullets";
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
      collision.enemy.playerBulletCollisionHandler,
      null,
      p.game
    );

    // Adds collision detection between player and aliens.
    p.game.physics.add.overlap(
      p.aliens,
      p.player,
      collision.player.alienCollisionHandler,
      null,
      p.game
    );

    // Listen for collisions between the player and enemy bullets
    p.game.physics.add.overlap(
      p.enemies.bullets,
      p.player,
      collision.player.shooterBulletCollisionHandler,
      null,
      p.game
    );
  },
  player: {
    // -------------------------------------------------------
    // Collisions with any 'alien' type
    // -------------------------------------------------------

    alienCollisionHandler: function (player, alien) {
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
    // -------------------------------------------------------
    // Collisions with projectiles shot by 'Shooter' enemies
    // -------------------------------------------------------

    shooterBulletCollisionHandler: (player, bullet) => {
      // remove a life from the player
      if (p.playerState.lives > 0) {
        p.playerState.lives--;
      }

      // Update the react state and the phaser text up the top of the screen
      p.updateReactState({
        ...p,
      });
      livesAndScore.update();

      const hitAudio = p.game.sound.add(p.audio.enemyHit);
      hitAudio.play();
      collision.explosion.create(bullet);
      bullet.destroy();
    },
  },
  enemy: {
    // -------------------------------------------------------
    //   An alien is shot by the player
    // -------------------------------------------------------

    playerBulletCollisionHandler: function (alien, bullet) {
      //  When a bullet hits an alien we kill them both
      bullets.player.disableBulletFromBody(bullet.body);
      alien.destroy();

      //AUDIO enemy is hit by bullet

      const hitAudio = p.game.sound.add(p.audio.enemyHit);
      hitAudio.play();
      if (!alien.texture.key.includes("MissileSeeker")) {
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
      }

      //  And create an explosion
      collision.explosion.create(alien);
    },
  },
  explosion: {
    // -------------------------------------------------------
    // Create an explosion model and replay it on request
    // -------------------------------------------------------

    create: (target) => {
      const { x, y } = target;
      // Create a new sprite without storing it in the collision object
      const explosionSprite = p.game.add.sprite(x, y, "levelNineKaboom");
      explosionSprite.setVisible(true);

      // If the animation hasn't been created, create it
      if (!p.game.anims.exists("levelNineKaboom")) {
        p.game.anims.create({
          key: "levelNineKaboom",
          frames: p.game.anims.generateFrameNumbers("levelNineKaboom", {
            start: 0,
            end: 3,
          }),
          frameRate: 16,
          repeat: 0,
        });
      }

      // Play the animation and destroy the sprite when done
      explosionSprite.play("levelNineKaboom");
      explosionSprite.on("animationcomplete", () => {
        explosionSprite.destroy();
      });
    },
  },
};

export default collision;
