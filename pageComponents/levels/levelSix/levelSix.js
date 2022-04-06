import p from "../../globalVars";
import enemies from "./enemies";
import collisions from "./collision";
import bullets from "./bullets";
import livesAndScore from "../../render/livesAndScore";

// Level 6 introduces the first graphics changes; black background and white animations like oldschool Asteroids

const levelSix = {
  init: () => {
    // Change the background to black
    const camera = p.game.cameras.cameras[0];
    camera.setBackgroundColor("rgba(0,0,0,1)");

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

    // Add the ship animations
    p.playerAnimation = p.game.anims.create({
      key: "levelSevenShipAnimation",
      frames: p.game.anims.generateFrameNumbers("levelSixShip", {
        start: 1,
        end: 2,
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

    // Set up the audio
    p.audio = { ...p.audio, playerShot: "babyPew" };

    // Render and update styles of the lives and score at the top of the screen
    p.textState.playerData.styles = {
      ...p.textState.playerData.styles,
      color: "rgb(255,255,255)",
    };
    livesAndScore.update();
    // Trigger css changes in react
    p.updateReactState({
      ...p,
    });

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

export default levelSix;
