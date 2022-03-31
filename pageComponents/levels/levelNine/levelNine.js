import p from "../../globalVars";
import enemies from "./enemies";
import collisions from "./collision";
import bullets from "./bullets";
import livesAndScore from "../../render/livesAndScore";

// Level 9 is a new backdrop, seekers and the first aliens that shoot back
const levelNine = {
  init: (game) => {
    // game.add.image(0, 0, "levelNineBackground").setOrigin(0, 0);

    // -------------------------------------
    // Reset the player for new collisions
    // -------------------------------------

    // Get the old coordinates of the player and wipe it from the game
    const { x, y, angle } = p.player;
    p.player.destroy();
    p.player = null;

    //  Add the player to the game
    p.player = game.physics.add.sprite(x, y);
    // Angle it to the old ship's angle
    p.player.angle = angle;
    // and prevent it falling through the world
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;

    // Set up the game

    bullets.create();
    enemies.populate();
    collisions.enable();

    // Set up the audio
    p.audio = { ...p.audio, playerShot: "laserPew" };

    // Render and update styles of the lives and score att he top of the screen
    livesAndScore.update();

    // This causes a delay to allow the level to set up and allow aliens to spawn
    p.gameState.canAdvanceLevel = false;
    p.game.time.addEvent({
      delay: 5000,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });

    // Add the player animations and start them off.
    p.playerAnimation = game.anims.create({
      key: "levelNineShipAnimation",
      frames: game.anims.generateFrameNumbers("levelNineShip", {
        start: 1,
        end: 2,
      }),
      frameRate: 15,
      repeat: 0,
      yoyo: true,
    });
    p.player.play(p.playerAnimation.key);
  },
};

export default levelNine;
