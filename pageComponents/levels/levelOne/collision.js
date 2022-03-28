import p from "../../globalVars";

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

    //  Increase the score
    const playerState = {
      ...p.playerState,
      score: (p.playerState.score += 20),
      totalKillCount: p.playerState.totalKillCount++,
    };
    p.updateReactState({
      ...p,
      playerState,
    });

    //  And create an explosion
    collision.explosion.create(alien);
  },
  explosion: {
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
