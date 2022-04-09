import p from "../../globalVars";
import enemies from "./enemies";
import collision from "./collision";
import livesAndScore from "../../render/livesAndScore";

// Generate 6 large asteroids that split in to 2 smaller asteroids on death.

const levelThree = {
  init: () => {
    // -------------------------------------
    // Reset the player for new collisions
    // -------------------------------------

    // Get the old coordinates of the player and wipe it from the game
    const { x, y, angle } = p.player;
    p.player.destroy();
    p.player = null;

    //  Add the player to the game
    p.player = p.game.physics.add.sprite(x, y, "levelThreeShip");
    // Angle it to the old ship's angle
    p.player.angle = angle;
    // and prevent it falling through the world
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;

    // enemies.populate();
    // Modifies the collision handler for large asteroids
    collision.enable();

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
  },
};

export default levelThree;
