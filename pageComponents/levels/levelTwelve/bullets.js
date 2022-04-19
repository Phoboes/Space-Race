import p from "../../globalVars";
import utils from "../../utilityFunctions";
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
      quantity: 20,
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
        const leftBullet = bullets.player.createBullet(
          bullet1,
          p.player.angle - 20
        );
        Phaser.Math.RotateAroundDistance(
          leftBullet,
          p.player.x,
          p.player.y,
          (p.player.angle - 35) * Phaser.Math.DEG_TO_RAD,
          30
        );
      }

      // Offset the bullet slightly so it spreads to the left of the ship as it travels
      const bullet2 = p.bullets.getFirstDead(false);

      if (bullet2) {
        const rightBullet = bullets.player.createBullet(
          bullet2,
          p.player.angle + 20
        );
        Phaser.Math.RotateAroundDistance(
          rightBullet,
          p.player.x,
          p.player.y,
          (p.player.angle + 35) * Phaser.Math.DEG_TO_RAD,
          30
        );

        const bullet3 = p.bullets.getFirstDead(false);

        if (bullet3) {
          const rightBullet = bullets.player.createBullet(
            bullet3,
            p.player.angle
          );
          Phaser.Math.RotateAroundDistance(
            rightBullet,
            p.player.x,
            p.player.y,
            p.player.angle * Phaser.Math.DEG_TO_RAD,
            45
          );
        }
      }
    },
    createBullet: function (bullet, angle) {
      // vector as direction only by setting the speed param to 1
      const vec = p.game.physics.velocityFromAngle(angle, 1);
      // bullet velocity using a magnitude of 10
      const vx = vec.x * 300;
      const vy = vec.y * 300;
      const { x, y } = p.player;
      bullet.enableBody(true, x, y, true, true);
      bullet.setVelocity(vx, vy);
      bullet.angle = angle;
      bullet.setSize(25, 25, true);

      // If there's no bullet animation set yet, create one.
      if (bullets.player.animation === null) {
        p.game.anims.create({
          key: "levelTwelvePlayerBullet",
          frames: p.game.anims.generateFrameNumbers("levelTwelvePlayerBullet", {
            start: 0,
            end: 1,
          }),
          frameRate: 8,
          repeat: -1,
        });
      }

      // Add some particles
      const particles = p.game.add.particles("blueFlare");
      // So particles fire out the back of the bullet
      const emitterAngle = bullet.emitterAngle + 180;

      particles.createEmitter({
        x: bullet.x,
        y: bullet.y,
        emitterAngle,
        lifespan: 300,
        speed: { min: 100, max: 200 },
        gravityY: 0,
        scale: { start: 0.2, end: 0 },
        quantity: 1,
        blendMode: "ADD",
        follow: bullet,
      });
      Phaser.Math.RotateAroundDistance(
        particles,
        0,
        0,
        emitterAngle * Phaser.Math.DEG_TO_RAD,
        15
      );

      bullet.body.particleManager = particles;
      bullet.play("levelTwelvePlayerBullet");
      const playerShot = p.game.sound.add(p.audio.playerShot);
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
