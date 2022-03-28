import p from "../../globalVars";
// import levelOne from "./levelOne";
// import levelTwo from "./levelTwo";
// import LevelThree from "./levelThree";
// import levelFour from "./levelFour";
import utils from "../../utilityFunctions";
import enemies from "./enemies";
import collision from "./collision";
import bullets from "./bullets";

// Same gameplay as lvl 4 but ship turning enabled and new graphic for ship + bullets

const levelFive = {
  init: (game) => {
    // Change the ship's skin
    p.player.setTexture("shipLevel5", 0);
    bullets.create();
    // enemies.populate();
    collision.enable();

    // This causes a delay to allow the level to set up and allow aliens to spawn
    p.gameState.canAdvanceLevel = false;
    // todo: 5000, reset this once done testing
    p.game.time.addEvent({
      delay: 1000,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });
  },
};

export default levelFive;
