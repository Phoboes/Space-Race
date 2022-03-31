import p from "../../globalVars";
import utils from "../../utilityFunctions";

// Level eight introduces the first 'smart' enemies; seekers that chase the player

const enemy = {
  create: (config) => {
    const { x, y } = config;
    const seeker = p.aliens.create(x, y);
    p.game.anims.create({
      key: "levelEightSeeker",
      frames: p.game.anims.generateFrameNumbers("levelEightSeeker", {
        start: 0,
        end: 2,
      }),
      frameRate: 4,
      repeat: -1,
    });
    seeker.play("levelEightSeeker");
  },

  populate: () => {
    // Allows the update function for seeking behavior to be accessed by game update calls
    p.enemies.update = enemy.update;

    // Start the game with a seeker incoming
    enemy.create({
      x: utils.random(50, 750),
      y: -50,
    });

    // Top spawn
    p.game.time.addEvent({
      delay: 4000,
      callback: () => {
        enemy.create({
          x: utils.random(50, 750),
          y: -50,
        });
      },
      repeat: 3,
    });

    // Bottom Spawn
    p.game.time.addEvent({
      delay: 6000,
      callback: () => {
        enemy.create({
          x: utils.random(50, 750),
          y: 800,
        });
      },
      repeat: 3,
    });

    // Left Spawn
    p.game.time.addEvent({
      delay: 5000,
      callback: () => {
        enemy.create({
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
        enemy.create({
          x: -50,
          y: utils.random(50, 750),
        });
      },
      repeat: 2,
    });
  },

  update: (alien, player) => {
    if (alien.texture.key.includes("Seeker")) {
      const px = player.x;
      const py = player.y;
      p.game.physics.moveTo(alien, px, py, 100);
      const { x, y } = alien;
      const rotation = Phaser.Math.Angle.Between(x, y, px, py);
      alien.setRotation(rotation);
    }
  },
};

export default enemy;
