import p from "../../globalVars";
import collision from "./collision";

const bullets = {
  create: () => {
    // Destroy the old instance of bullets; it's easier to start from scratch.
    p.bulletState = {};

    p.bulletState.createCallback = bullets.player.createBullet;
    p.bulletState.disableBulletFromBody = bullets.player.disableBulletFromBody;
    //   Initialise the bullet group to the game and give it to globalVars for global access from other stages
    p.bullets = p.game.physics.add.group({
      name: "bullets",
      enable: false,
      createCallback: p.bulletState.createBullet,
      allowGravity: false,
    });

    // Create a bullet pool to recycle bullets from -- key is irrelevant, it just needs a valid value otherwise it breaks.
    p.bullets.createMultiple({
      key: "levelSixBullet",
      quantity: 5,
      active: false,
      visible: false,
    });

    // If a bullet hits the world bounds, destroy it.
    p.game.physics.world.on(
      "worldbounds",
      bullets.player.disableBulletFromBody
    );

    // enables access to the firing function in globalvar, allowing it to be called from Update.
    p.playerState.fireBulletFromPlayer = function () {
      bullets.player.fireBullet(p.bullets, p.player.x, p.player.y, 0, -300);

      // Creates a reference to the "playerShot" sound file set in preload (and plays it).
      const playerShot = p.game.sound.add(p.audio.playerShot);
      playerShot.play();
    };
  },

  alien: {
    create: {
      shooterBullet: (shooter) => {
        const { x, y, angle } = shooter;
        // Get the coordinates of the alien shooter
        // If the bullets group hasn't been created yet, do so
        if (p.enemies.bullets === null) {
          p.enemies.bullets = p.game.physics.add.group();

          // Listen for collisions between the player and bullets; we create this here rather than in 'create' because this group doesn't exist att the start
          p.game.physics.add.overlap(
            p.enemies.bullets,
            p.player,
            collision.player.shooterBulletCollisionHandler,
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

      // This offsets the bullet from the shooter's body slightly so it doesn't fire straight from the middle of its body
      Phaser.Math.RotateAroundDistance(
        bullet,
        x,
        y,
        bullet.angle * Phaser.Math.DEG_TO_RAD,
        20
      );

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
      const playerShot = p.game.sound.add(p.audio.playerShot);
      playerShot.play();
    },
    disableBulletFromBody: function (body) {
      body.gameObject.disableBody(true, true);
    },
    animation: null,
  },
};

export default bullets;
