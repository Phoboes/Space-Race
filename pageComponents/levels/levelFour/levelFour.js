import p from "../../globalVars";
import enemies from "./enemies";
import collision from "./collision";
import utils from "../../utilityFunctions";

// 4 Dimensional travel enabled (Only facing forwards), new "Arrow" or V ship
// Longer Bullet graphic
// Larger asteroids from Level 3 come in from all sides, split on death

const levelFour = {
  init: (game) => {
    console.log("FOUR");
    //  Change the ship's skin
    p.player.setTexture("shipLevel4", 0);
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;
    // enemies.populate();
    collision.enable();

    // The player's angle isn't true to the graphic displayed currently;
    // after level 5 the way the player faces matters, as it turns it will always be 90 degrees off without this line
    p.player.angle = 270;

    // This causes a delay to allow the level to set up and allow aliens to spawn
    p.gameState.canAdvanceLevel = false;
    // todo: 5000; reset this once done testing
    p.game.time.addEvent({
      delay: 1000,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });
  },
};

export default levelFour;
