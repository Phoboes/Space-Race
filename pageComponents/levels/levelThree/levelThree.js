import p from "../../globalVars";
import enemies from "./enemies";
import collision from "./collision";
import livesAndScore from "../../render/livesAndScore";

// Generate 6 large asteroids that split in to 2 smaller asteroids on death.

const levelThree = {
  init: () => {
    enemies.populate();
    // Modifies the collision handler for large asteroids
    collision.enable();

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
  },
};

export default levelThree;
