import p from "../../globalVars";
import enemies from "./enemies";
import collisions from "./collision";
import livesAndScore from "../../render/livesAndScore";

const levelTwo = {
  init: () => {
    enemies.populate();
    // Enables collision between player and an alien
    collisions.enable();

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

export default levelTwo;
