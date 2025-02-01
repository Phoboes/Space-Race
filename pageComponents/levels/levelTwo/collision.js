import p from "../../globalVars";
import livesAndScore from "../../render/livesAndScore";

const collision = {
  enable: () => {
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
