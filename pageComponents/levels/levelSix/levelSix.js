import p from "../../globalVars";
// import levelOne from "./levelOne";
import utils from "../../utilityFunctions";
import enemies from "./enemies";
import collision from "./collision";
import bullets from "./bullets";

// Level 6 introduces the first graphics changes; black background and white animations like oldschool Asteroids

const levelSix = {
  init: (game) => {
    const camera = game.cameras.cameras[0];
    camera.setBackgroundColor("rgba(0,0,0,1)");
    p.player.setTexture("shiplevel6", 0);

    bullets.create();
    enemies.populate();
    collision.enable();
    // This causes a delay to allow the level to set up and allow aliens to spawn
    p.gameState.canAdvanceLevel = false;
    // todo: 5000, reset this once done testing
    p.game.time.addEvent({
      delay: 5000,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });
  },
};

export default levelSix;
