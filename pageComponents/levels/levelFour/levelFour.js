import p from "../../globalVars";
import enemies from "./enemies";
import collision from "./collision";
import livesAndScore from "../../render/livesAndScore";
import bullets from "./bullets";

// 4 Dimensional travel enabled (Only facing forwards), new "Arrow" or V ship
// Longer Bullet graphic
// Larger asteroids from Level 3 come in from all sides, split on death

const levelFour = {
  init: () => {
    // -------------------------------------
    // Reset the player for new collisions
    // -------------------------------------

    // Get the old coordinates of the player and wipe it from the game
    const { x, y, angle } = p.player;
    p.player.destroy();
    p.player = null;

    //  Add the player to the game
    p.player = p.game.physics.add.sprite(x, y, "levelFourShip");
    // Angle it to the old ship's angle
    p.player.angle = angle;
    // and prevent it falling through the world
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;

    // enemies.populate();
    bullets.create();
    collision.enable();

    // The player's angle isn't true to the graphic displayed currently;
    // after level 5 the way the player faces matters, as it turns it will always be 90 degrees off without this line
    p.player.angle = 270;

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

export default levelFour;
