import p from "../../globalVars";
import livesAndScore from "../../render/livesAndScore";

const collision = {
  enable: () => {
    // Adds collision detection between bullets and aliens.
    p.alienState.collisionHandler = p.game.physics.add.overlap(
      p.aliens,
      p.bullets,
      collision.playerShotAlienHandler,
      null,
      p.game
    );
  },

  playerShotAlienHandler: (alien, bullet) => {
    //  When a bullet hits an alien we kill them both
    bullet.body.gameObject.disableBody(true, true);
    alien.destroy();

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
      const explosionSprite = p.game.add.sprite(x, y, "kaboom");
      explosionSprite.setVisible(true);

      // If the animation hasn't been created, create it
      if (!p.game.anims.exists("kaboom")) {
        p.game.anims.create({
          key: "kaboom",
          frames: p.game.anims.generateFrameNumbers("kaboom", {
            start: 0,
            end: 3,
          }),
          frameRate: 16,
          repeat: 0,
        });
      }

      // Play the animation and destroy the sprite when done
      explosionSprite.play("kaboom");
      explosionSprite.on("animationcomplete", () => {
        explosionSprite.destroy();
      });
    },
  },
};

export default collision;
