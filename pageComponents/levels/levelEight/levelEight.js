import p from "../../globalVars";
import enemies from "./enemies";
import collisions from "./collision";
import bullets from "./bullets";
import livesAndScore from "../../render/livesAndScore";

// Level 8 is another graphics upgrade and the introduction of 'seekers', enemies who actively chase the player to kamikaze
const levelEight = {
  init: () => {
    // p.game.add.image(0, 0, "levelEightBackground").setOrigin(0, 0);

    // -------------------------------------
    // Reset the player for new collisions
    // -------------------------------------

    // Get the old coordinates of the player and wipe it from the game
    const { x, y, angle } = p.player;
    p.player.destroy();
    p.player = null;

    //  Add the player to the game
    p.player = p.game.physics.add.sprite(x, y);
    // Angle it to the old ship's angle
    p.player.angle = angle;
    // and prevent it falling through the world
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;

    // Set up the game

    // enemies.populate();
    bullets.create();
    collisions.enable();

    // Set up the audio
    p.audio = { ...p.audio, playerShot: "shortPlayerShot8" };

    // Render and update styles of the lives and score att he top of the screen
    livesAndScore.update();

    // This causes a delay to allow the level to set up and allow aliens to spawn
    p.gameState.canAdvanceLevel = false;
    p.game.time.addEvent({
      delay: 500,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });

    p.playerAnimation = p.game.anims.create({
      key: "levelEightShipAnimation",
      frames: p.game.anims.generateFrameNumbers("levelEightShip", {
        start: 1,
        end: 0,
      }),
      frameRate: 15,
      repeat: 0,
      yoyo: true,
    });

    p.player.play(p.playerAnimation.key);
  },
};

export default levelEight;
