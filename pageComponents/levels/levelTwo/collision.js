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
    // todo: Maybe make this global
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
      // Give it an animation
      collision.explosion.animation = p.game.anims.create({
        key: "kaboom",
        frames: p.game.anims.generateFrameNumbers("kaboom", {
          start: 0,
          end: 15,
        }),
        frameRate: 25,
        repeat: 0,
      });

      //  Place the explosion, play the animation, hide it again.
      explosionSprite.setPosition(x, y);
      explosionSprite.setVisible(true);
      explosionSprite.play("kaboom");
      //   Once the animation finishes, remove it from the scene
      explosionSprite.on("animationcomplete", () => {
        explosionSprite.setVisible(false);
        explosionSprite.destroy();
      });
      explosionSprite.body.allowGravity = false;
    },
    sprite: null,
    animation: null,
  },
};

export default collision;
