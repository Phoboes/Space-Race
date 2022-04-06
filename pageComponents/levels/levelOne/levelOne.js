import p, { setInitialState } from "../../globalVars";
import bullets from "./bullets";
import enemies from "./enemies";
import stageText from "../../render/stageText";
import collisions from "./collision";
import livesAndScore from "../../render/livesAndScore";
import utils from "../../utilityFunctions";

const levelOne = {
  init: (game) => {
    p.game = game;
    //   Set the background of the game to white
    const camera = p.game.cameras.cameras[0];
    // camera.setBackgroundColor("rgba(255,255,255,1)");
    // Late night friendly:

    camera.setBackgroundColor("rgba(150,150,150,1)");

    // Set initial text
    p.gameState.stageText = stageText.levels.one.startText();
    //  Add the player to the game
    p.player = p.game.physics.add.sprite(400, 500, "ship");
    // and prevent it falling through the world
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;

    // Creates the other game groups and enables collision between bullets and aliens
    enemies.create();
    bullets.create();
    collisions.enable();

    // Keyboard detect
    p.gameState.cursorKeys = p.game.input.keyboard.addKeys(
      "W,A,S,D,up,left,right,down,space"
    );
  },
};

export default levelOne;
