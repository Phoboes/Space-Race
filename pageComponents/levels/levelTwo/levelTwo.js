import enemies from "./enemies";
import collision from "./collision";
import p from "../../globalVars";

const levelTwo = {
  init: (game) => {
    // enemies.populate();
    // Enables collision between player and an alien
    collision.enable();

    // This causes a delay to allow the level to set up and allow aliens to spawn
    p.gameState.canAdvanceLevel = false;
    // todo: 3000; reset after testing -- can likely be removed on this level
    p.game.time.addEvent({
      delay: 1000,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });
  },
};

export default levelTwo;
