import p from "../../globalVars";
import utils from "../../utilityFunctions";
import bullets from "./bullets";

const enemy = {
  create: {
    seeker: (config) => {
      // Create a seeker/chasing alien at a given x/y
      const { x, y } = config;
      const seeker = p.aliens.create(x, y);
      p.game.anims.create({
        key: "levelNineSeeker",
        frames: p.game.anims.generateFrameNumbers("levelNineSeeker", {
          start: 0,
          end: 2,
        }),
        frameRate: 4,
        repeat: -1,
      });
      seeker.play("levelNineSeeker");
    },
    shooter: (config) => {
      // Create a shooter alien at a given x/y
      const { x, y } = config;
      const shooter = p.aliens.create(x, y);
      p.game.anims.create({
        key: "levelNineShooter",
        frames: p.game.anims.generateFrameNumbers("levelNineShooter", {
          start: 0,
          end: 2,
        }),
        frameRate: 8,
        repeat: -1,
      });

      shooter.play("levelNineShooter");

      // Angle the shooter towards the player, wherever they are at the time
      const angle = enemy.rotateToPlayer(shooter, p.player);

      // Valculate velocity based on the alien's angle
      const vec = p.game.physics.velocityFromAngle(
        Phaser.Math.RAD_TO_DEG * angle,
        1
      );
      const vx = vec.x * 50;
      const vy = vec.y * 50;
      shooter.setVelocity(vx, vy);
      shooter.body.allowGravity = false;

      // Fires a bullet on spawn then every 5 seconds after
      bullets.alien.create.shooterBullet(shooter);
      p.game.time.addEvent({
        delay: 5000,
        callback: () => {
          // Prevents firing from its previous position after destruction
          if (shooter.active) {
            bullets.alien.create.shooterBullet(shooter);
          }
        },
        repeat: 3,
      });
    },
  },

  // Sets all the alien waves
  populate: () => {
    // Allows the update function for seeking behavior to be accessed by game update calls
    p.enemies.update = enemy.update;

    // Top spawn
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        enemy.create.seeker({
          x: utils.random(50, 750),
          y: -50,
        });
      },
      repeat: 2,
    });

    enemy.create.shooter({
      x: utils.random(50, 750),
      y: -50,
    });
    p.game.time.addEvent({
      delay: 7000,
      callback: () => {
        enemy.create.shooter({
          x: utils.random(50, 750),
          y: -50,
        });
      },
      repeat: 1,
    });

    // Bottom Spawn

    enemy.create.seeker({
      x: utils.random(50, 750),
      y: 800,
    });

    p.game.time.addEvent({
      delay: 6000,
      callback: () => {
        enemy.create.seeker({
          x: utils.random(50, 750),
          y: 800,
        });
      },
      repeat: 2,
    });

    p.game.time.addEvent({
      delay: 9000,
      callback: () => {
        enemy.create.shooter({
          x: utils.random(50, 750),
          y: 800,
        });
      },
      repeat: 2,
    });

    // Left Spawn
    p.game.time.addEvent({
      delay: 10000,
      callback: () => {
        enemy.create.seeker({
          x: 800,
          y: utils.random(50, 750),
        });
      },
      repeat: 3,
    });

    p.game.time.addEvent({
      delay: 11000,
      callback: () => {
        enemy.create.shooter({
          x: 800,
          y: utils.random(50, 750),
        });
      },
      repeat: 2,
    });

    // Right spawn
    p.game.time.addEvent({
      delay: 7000,
      callback: () => {
        enemy.create.seeker({
          x: -50,
          y: utils.random(50, 750),
        });
      },
      repeat: 1,
    });

    p.game.time.addEvent({
      delay: 3000,
      callback: () => {
        enemy.create.shooter({
          x: -50,
          y: utils.random(50, 750),
        });
      },
      repeat: 0,
    });

    p.game.time.addEvent({
      delay: 12000,
      callback: () => {
        enemy.create.shooter({
          x: -50,
          y: utils.random(50, 750),
        });
      },
      repeat: 2,
    });
  },

  update: (alien, player) => {
    if (alien.texture.key.includes("Seeker")) {
      const { x, y } = player;
      p.game.physics.moveTo(alien, x, y, 100);
      enemy.rotateToPlayer(alien, player);
    }
  },

  // Rotates any alien to face the player's current position
  rotateToPlayer: (alien, player) => {
    const px = player.x;
    const py = player.y;
    const { x, y } = alien;
    const rotation = Phaser.Math.Angle.Between(x, y, px, py);
    alien.setRotation(rotation);
    return rotation;
  },
};

export default enemy;
