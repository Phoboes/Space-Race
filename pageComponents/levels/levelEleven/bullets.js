import p from "../../globalVars";
import utils from "../../utilityFunctions";
import collision from "./collision";

const bullets = {
  create: () => {
    // Destroy the old instance of bullets; it's easier to start from scratch.
    p.bulletState = {};

    // p.bulletState.disableBulletFromBody = bullets.player.disableBulletFromBody;
    // p.playerState.createCallback = bullets.player.fireBullet;

    //   Initialise the bullet group to thep. and give it to globalVars for global access from other stages
    p.bullets = p.game.physics.add.group({
      name: "bullets",
      enable: false,
      createCallback: bullets.player.createCallback,
      allowGravity: false,
    });

    p.bullets.createMultiple({
      key: "levelTenBullet",
      quantity: 10,
      active: false,
      visible: false,
    });

    // // If a bullet hits the world bounds, destroy it.
    // p.game.physics.world.on(
    //   "worldbounds",
    //   bullets.player.disableBulletFromBody
    // );

    // Todo: Look at revising the previous levels' firing mechanisms to this model
    // enables access to the firing function in globalvar, allowing it to be called from Update.
    p.playerState.fireBulletFromPlayer = bullets.player.fireBullet;
  },

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
            collision.player.shooterBulletCollisionHandler,
            null,
            p.game
          );
        }

        // Create the instance of *this* bullet on the shooter
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
        // This offsets the bullet from the shooter's body slightly so it doesn't fire straight from the middle of its body
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
        bullet.setSize(20, 20, true);
      },
      shotgunBullets: (shotgunner) => {
        const { x, y, angle } = shotgunner;
        // Get the coordinates of the alien shotgunner
        // If the bullets group hasn't been created yet, do so
        if (p.enemies.bullets === null) {
          p.enemies.bullets = p.game.physics.add.group();
        }

        for (let i = -15; i <= 15; i += 15) {
          // Create the instance of *this* bullet on the player
          const bullet = p.enemies.bullets.create(x, y);
          // Set its 'pulse' animation and play it.
          p.game.anims.create({
            key: "shotgunBullet",
            frames: p.game.anims.generateFrameNumbers(
              "levelTenAlienShotgunBullet",
              {
                start: 0,
                end: 1,
              }
            ),
            frameRate: 8,
            repeat: -1,
          });
          bullet.play("shotgunBullet");

          // Set the bullet to be the same angle as the ship that shot it
          bullet.angle = angle + i;
          // This offsets the bullet from the shotgunner's bodyt slightly so it doesn't fire straight from the middle of its body
          Phaser.Math.RotateAroundDistance(
            bullet,
            x,
            y,
            bullet.angle * Phaser.Math.DEG_TO_RAD,
            25
          );

          // Fires the bullet in its new direction
          const vec = p.game.physics.velocityFromAngle(bullet.angle, 1);
          const vx = vec.x * 100;
          const vy = vec.y * 100;
          bullet.setVelocity(vx, vy);
          bullet.body.allowGravity = false;
          bullet.setSize(15, 15, true);
        }

        // Listen for collisions between the player and bullets
        p.game.physics.add.overlap(
          p.enemies.bullets,
          p.player,
          collision.player.shooterBulletCollisionHandler,
          null,
          p.game
        );
      },
    },
  },
  player: {
    fireBullet: () => {
      const bullet1 = p.bullets.getFirstDead(false);

      if (bullet1) {
        const leftBullet = bullets.player.createBullet(bullet1);
        Phaser.Math.RotateAroundDistance(
          leftBullet,
          p.player.x,
          p.player.y,
          (p.player.angle - 20) * Phaser.Math.DEG_TO_RAD,
          40
        );
      }

      const bullet2 = p.bullets.getFirstDead(false);

      if (bullet2) {
        const rightBullet = bullets.player.createBullet(bullet2);
        Phaser.Math.RotateAroundDistance(
          rightBullet,
          p.player.x,
          p.player.y,
          (p.player.angle + 20) * Phaser.Math.DEG_TO_RAD,
          40
        );
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
      bullet.setSize(17, 17, true);

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

      // Add some particles
      const particles = p.game.add.particles("blueFlare");
      // So particles fire out the back of the bullet
      const angle = bullet.angle + 180;

      particles.createEmitter({
        x: bullet.x,
        y: bullet.y,
        angle,
        lifespan: 300,
        speed: { min: 100, max: 200 },
        gravityY: 0,
        scale: { start: 0.1, end: 0 },
        quantity: 1,
        blendMode: "ADD",
        follow: bullet,
      });
      Phaser.Math.RotateAroundDistance(
        particles,
        0,
        0,
        angle * Phaser.Math.DEG_TO_RAD,
        15
      );

      bullet.body.particleManager = particles;
      bullet.play("levelNineShot");
      const playerShot = p.game.sound.add("shortPlayerShot8");
      playerShot.play();
      return bullet;
    },
    disableBulletFromBody: function (body) {
      body.particleManager.destroy();
      body.gameObject.disableBody(true, true);
    },
    animation: null,
  },
};

export default bullets;
