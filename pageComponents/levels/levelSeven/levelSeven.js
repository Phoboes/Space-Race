import p from "../../globalVars";
import enemies from "./enemies";
import bullets from "./bullets";
import collisions from "./collision";
import livesAndScore from "../../render/livesAndScore";

// Level 7 introduces the first music, tetris ship and animations, player animations while moving

const levelSeven = {
  init: (game) => {
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

    // Add the first ship animations
    p.playerAnimation = game.anims.create({
      key: "levelSevenShipAnimation",
      frames: game.anims.generateFrameNumbers("levelSevenShip", {
        start: 1,
        end: 0,
      }),
      frameRate: 15,
      repeat: 0,
      yoyo: true,
    });

    // Begin the animation
    p.player.play(p.playerAnimation.key);

    // Set up the game
    bullets.create();
    enemies.populate();
    collisions.enable();

    // Update the game audio files
    p.audio = {
      enemyHit: "bassRumbleExplode",
      playerShot: "pew",
    };

    // Render and update styles of the lives and score att he top of the screen
    p.textState.playerData.styles = {
      ...p.textState.playerData.styles,
      color: "rgb(255,255,0)",
      fontWeight: "bold",
    };
    livesAndScore.update();

    // This causes a delay to allow the level to set up and allow aliens to spawn
    p.gameState.canAdvanceLevel = false;
    p.game.time.addEvent({
      delay: 5000,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });
  },
};

export default levelSeven;
