import p from "../../globalVars";

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
    p.playerState.lives--;

    //AUDIO enemy is hit by bullet
    const hitAudio = p.game.sound.add("enemyHit");
    hitAudio.play();
    //  And create an explosion
    collision.explosion.create(player);
  },
  explosion: {
    // todo: Maybe make this global
    // -------------------------------------------------------
    // Create an explosion model and replay it on request
    // -------------------------------------------------------

    create: (target) => {
      const { x, y } = target;
      // If the explosion group hasn't been created for this level, do so
      if (collision.explosion.sprite === null) {
        collision.explosion.sprite = p.game.physics.add.sprite({
          x: -100,
          y: -100,
        });
        // And hide it offscreen until needed
        collision.explosion.sprite.setVisible(false);
      }

      // If the animation hasn't been created, create it; prevents duplicate creations
      if (collision.explosion.animation === null) {
        collision.explosion.animation = p.game.anims.create({
          key: "kaboom",
          frames: p.game.anims.generateFrameNumbers("kaboom", {
            start: 0,
            end: 15,
          }),
          frameRate: 25,
          repeat: 0,
        });
      }

      //  Place the explosion, play the animation, hide it again.
      collision.explosion.sprite.setPosition(x, y);
      collision.explosion.sprite.setVisible(true);
      collision.explosion.sprite.play("kaboom");
      //   Once the animation finishes, remove it from the scene
      collision.explosion.sprite.on("animationcomplete", () => {
        collision.explosion.sprite.setVisible(false);
      });
      collision.explosion.sprite.body.allowGravity = false;
    },
    sprite: null,
    animation: null,
  },
};

export default collision;
