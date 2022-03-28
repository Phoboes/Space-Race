import p from "../../globalVars";
import enemies from "./enemies";
import collision from "./collision";

// Generate 6 large asteroids that split in to 2 smaller asteroids on death.

const levelThree = {
  init: (game) => {
    console.log("THREE");
    // todo: enable this
    // enemies.populate();
    // Modifies the collision handler for large asteroids
    collision.enable();

    // This causes a delay to allow the level to set up and allow aliens to spawn
    p.gameState.canAdvanceLevel = false;
    // todo: 3000; reset after testing
    p.game.time.addEvent({
      delay: 1000,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });
  },
};

export default levelThree;
