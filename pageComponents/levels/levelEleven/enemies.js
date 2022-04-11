import p from "../../globalVars";
import utils from "../../utilityFunctions";
import bullets from "./bullets";

const enemy = {
  create: {
    missile: (config) => {
      // Create a seeker/chasing missile at a given x/y
      const { x, y } = config;
      const missile = p.aliens.create(x, y);
      p.game.anims.create({
        key: "levelTenAlienMissileSeeker",
        frames: p.game.anims.generateFrameNumbers(
          "levelTenAlienMissileSeeker",
          {
            start: 0,
            end: 3,
          }
        ),
        frameRate: 12,
        repeat: -1,
      });
      missile.play("levelTenAlienMissileSeeker");
      // Resize and center the hitbox
      missile.setSize(25, 25, true);
      return missile;
    },
    missileShip: (config) => {
      // Create a missile launching alien at a given x/y
      const { x, y } = config;
      const missileLauncher = p.aliens.create(x, y);
      p.game.anims.create({
        key: "AlienMissileShip",
        frames: p.game.anims.generateFrameNumbers("AlienMissileShip", {
          start: 0,
          end: 2,
        }),
        frameRate: 4,
        repeat: -1,
      });
      missileLauncher.body.setSize(50, 50, true);
      missileLauncher.setOffset(12, 0);
      missileLauncher.play("AlienMissileShip");

      // Fire seeker missiles
      const timer = p.game.time.addEvent({
        delay: 4500,
        callback: () => {
          // Get the current x/y, not the x/y provided when the parent was created
          const currentXY = missileLauncher.getCenter();
          const missile = enemy.create.missile({
            x: currentXY.x,
            y: currentXY.y,
          });
          // Offset the spawn location 40 pixels out front and somewhere between -40 and 40 degress
          Phaser.Math.RotateAroundDistance(
            missile,
            currentXY.x,
            currentXY.y,
            (missileLauncher.angle + utils.random(-40, 40)) *
              Phaser.Math.DEG_TO_RAD,
            40
          );
        },
        repeat: -1,
      });
      // When the launcher is destroyed, kill the timer event
      missileLauncher.on("destroy", () => {
        timer.destroy();
      });
    },
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
        frameRate: 1,
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
      // Ensure gravity is removed, and set the hitbox
      shooter.body.allowGravity = false;
      shooter.setSize(40, 40, true);

      // Fires a bullet on spawn then every 5 seconds after
      bullets.alien.create.shooterBullet(shooter);
      const timer = p.game.time.addEvent({
        delay: 5000,
        callback: () => {
          // Prevents firing from its previous position after destruction or if the game is over
          if (shooter.active && p.playerState.alive) {
            bullets.alien.create.shooterBullet(shooter);
          }
        },
        repeat: 3,
      });
      // When the shooter is destroyed, kill the timer event
      shooter.on("destroy", () => {
        timer.destroy();
      });
    },
    shotgunner: (config) => {
      // Create a shotgunner alien at a given x/y
      const { x, y } = config;
      const shotgunner = p.aliens.create(x, y);
      p.game.anims.create({
        key: "levelTenShotgunner",
        frames: p.game.anims.generateFrameNumbers("levelTenShotgunShip", {
          start: 0,
          end: 3,
        }),
        frameRate: 12,
        repeat: -1,
      });

      shotgunner.play("levelTenShotgunner");

      // Angle the shotgunner towards the player, wherever they are at the time
      const angle = enemy.rotateToPlayer(shotgunner, p.player);

      // Valculate velocity based on the alien's angle
      const vec = p.game.physics.velocityFromAngle(
        Phaser.Math.RAD_TO_DEG * angle,
        1
      );
      const vx = vec.x * 50;
      const vy = vec.y * 50;
      shotgunner.setVelocity(vx, vy);
      shotgunner.body.allowGravity = false;
      // Makes the hitbox a little more accurate
      shotgunner.body.setSize(40, 40, true);

      // Fires a bullet on spawn then every 5 seconds after
      bullets.alien.create.shotgunBullets(shotgunner);
      const timer = p.game.time.addEvent({
        delay: 5000,
        callback: () => {
          // Prevents firing from its previous position after destruction or if the game is over
          if (shotgunner.active) {
            bullets.alien.create.shotgunBullets(shotgunner);
          }
        },
        repeat: -1,
      });
      // When the shotgunner is destroyed, kill the timer event
      shotgunner.on("destroy", () => {
        timer.destroy();
      });
    },
  },

  // Sets all the alien waves
  populate: () => {
    // Allows the update function for seeking behavior to be accessed by game update calls
    p.enemies.update = enemy.update;

    // Top spawn
    p.game.time.addEvent({
      delay: 8000,
      callback: () => {
        // Create a random enemy from the list out of bounds top of map
        enemy.spawnRandom(utils.random(-50, 850), -50);
      },
      repeat: utils.random(1, 4),
    });

    // Left spawn
    p.game.time.addEvent({
      delay: 6000,
      callback: () => {
        enemy.spawnRandom(-50, utils.random(-50, 850));
      },
      repeat: utils.random(1, 4),
    });

    // Right spawn

    // Introduce the missile launcher
    enemy.create.missileShip({ x: 850, y: utils.random(-50, 850) });

    p.game.time.addEvent({
      delay: 9000,
      callback: () => {
        enemy.spawnRandom(850, utils.random(-50, 850));
      },
      repeat: utils.random(1, 4),
    });

    // BOTTOM spawn
    p.game.time.addEvent({
      delay: 7000,
      callback: () => {
        enemy.spawnRandom(utils.random(-50, 850), 700);
      },
      repeat: utils.random(1, 4),
    });
  },

  spawnRandom: (x, y) => {
    let enemyType;
    switch (utils.random(0, 3)) {
      case 0:
        enemyType = "missileShip";
        break;
      case 1:
        enemyType = "seeker";
        break;
      case 2:
        enemyType = "shooter";
        break;
      case 3:
        enemyType = "shotgunner";
        break;
    }
    enemy.create[enemyType]({ x, y });
  },

  update: (alien, player) => {
    const { x, y } = player;
    if (alien.texture.key.includes("Seeker")) {
      p.game.physics.moveTo(alien, x, y, 100);
      enemy.rotateToPlayer(alien, player);
    } else if (alien.texture.key.includes("AlienMissileShip")) {
      p.game.physics.moveTo(alien, x, y, 20);
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
