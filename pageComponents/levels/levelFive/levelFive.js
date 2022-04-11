import p from "../../globalVars";
import enemies from "./enemies";
import collision from "./collision";
import livesAndScore from "../../render/livesAndScore";

// Same gameplay as lvl 4 but ship turning enabled and new graphic for ship + bullets

const levelFive = {
  init: () => {
    // enemies.populate();

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

export default levelFive;
