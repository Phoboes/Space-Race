import p from "../../globalVars";
import utils from "../../utilityFunctions";
import enemy from "../levelSeven/aliens";
import collision from "./collision";

const bullets = {
  alien: {
    create: {
      shooterBullet: (shooter) => {
        const { x, y, angle } = shooter;
        // Get the coordinates of the alien shooter
        // If the bullets group hasn't been created yet, do so
        if (p.enemies.bullets === null) {
          p.enemies.bullets = p.game.physics.add.group();

          // Listen for collisions between the player and bullets
          p.game.physics.add.overlap(
            p.enemies.bullets,
            p.player,
            collision.player.playerShooterBulletCollisionHandler,
            null,
            p.game
          );
        }

        // Create the instance of *this* bullet on the player
        const bullet = p.enemies.bullets.create(x, y);
        // Set its 'pulse' animation and play it.
        p.game.anims.create({
          key: "levelNineShooterBulletShot",
          frames: p.game.anims.generateFrameNumbers("levelNineShooterBullet", {
            start: 0,
            end: 1,
          }),
          frameRate: 4,
          repeat: -1,
        });
        bullet.play("levelNineShooterBulletShot");

        // Set the bullet to be the same angle as the ship that shot it
        bullet.angle = angle;
        // This offsets the bullet from the shooter's bodyt slightly so it doesn't fire straight from the middle of its body
        Phaser.Math.RotateAroundDistance(
          bullet,
          x,
          y,
          angle * Phaser.Math.DEG_TO_RAD,
          40
        );

        // Fires the bullet in its new direction
        const vec = p.game.physics.velocityFromAngle(angle, 1);
        const vx = vec.x * 100;
        const vy = vec.y * 100;
        bullet.setVelocity(vx, vy);
        bullet.body.allowGravity = false;
      },
    },
  },
  player: {
    createCallback: (bullet) => {
      bullet.body.onWorldBounds = true;
    },

    fireBullet: () => {
      const bullet = p.bullets.getFirstDead(false);
      if (bullet) {
        bullets.player.createBullet(bullet);
      }
    },
    createBullet: function (bullet) {
      // vector as direction only by setting the speed param to 1
      const vec = p.game.physics.velocityFromAngle(p.player.angle, 1);
      // bullet velocity using a magnitude of 10
      const vx = vec.x * 300;
      const vy = vec.y * 300;
      const { x, y } = p.player;
      bullet.enableBody(true, x, y, true, true);
      bullet.setVelocity(vx, vy);
      bullet.angle = p.player.angle;

      // If there's no bullet animation set yet, create one.
      if (bullets.player.animation === null) {
        p.game.anims.create({
          key: "levelNineShot",
          frames: p.game.anims.generateFrameNumbers("levelNineBullet", {
            start: 0,
            end: 1,
          }),
          frameRate: 4,
          repeat: -1,
        });
      }

      bullet.play("levelNineShot");

      bullet.setCollideWorldBounds(true);
      bullet.body.onWorldBounds = true;
      // Creates a reference to the "playerShot" sound file set in preload (and plays it).
      const playerShot = p.game.sound.add("shortPlayerShot8");
      playerShot.play();
    },
    disableBulletFromBody: function (body) {
      body.gameObject.disableBody(true, true);
    },
    animation: null,
  },
};

export default bullets;
