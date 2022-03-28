import p from "../../globalVars";
import bullets from "../levelTen/bullets";

const collision = {
  player: {
    // -------------------------------------------------------
    // Collisions with any 'alien' type
    // -------------------------------------------------------

    alienCollisionHandler: function (player, alien) {
      p.totalKillCount += 1;
      // The alien explodes and takes a life.
      alien.destroy();
      p.lives -= 1;
      p.totalKillCount++;

      //AUDIO enemy is hit by player

      const hitAudio = this.sound.add("enemyHit");
      hitAudio.play();

      //  Increase the score
      p.score += 20;

      //  And create an explosion
      collision.explosion.create(alien);
    },
    // -------------------------------------------------------
    // Collisions with projectiles shot by 'Shooter' enemies
    // -------------------------------------------------------

    playerShooterBulletCollisionHandler: (player, bullet) => {
      p.totalKillCount += 1;

      // The bullet explodes and takes a life.
      p.lives -= 1;

      const hitAudio = p.game.sound.add("enemyHit");
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
      p.totalKillCount += 1;
      //  When a bullet hits an alien we kill them both
      bullets.player.disableBulletFromBody(bullet.body);
      alien.destroy();
      p.totalKillCount++;

      //AUDIO enemy is hit by bullet

      const hitAudio = this.sound.add("enemyHit");
      hitAudio.play();
      if (!alien.texture.key.includes("MissileSeeker")) {
        //  Increase the score unless it's a missile
        p.updateReactState({
          ...p,
          score: (p.score += 20),
        });
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
          key: "nineExplosion",
          frames: p.game.anims.generateFrameNumbers("levelNineKaboom", {
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
      collision.explosion.sprite.play("nineExplosion");
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
