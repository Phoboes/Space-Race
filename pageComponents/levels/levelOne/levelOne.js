import p, { setInitialState } from "../../globalVars";
import bullets from "./bullets";
import enemies from "./enemies";
import stageText from "../../render/stageText";
import collisions from "./collision";

const levelOne = {
  init: (game) => {
    p.game = game;
    //   Set the background of the game to grey
    const camera = p.game.cameras.cameras[0];
    camera.setBackgroundColor("rgba(150,150,150,1)");

    // Set initial text
    p.textState.stageCompleteText = stageText.levels.one.startText();
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
    p.game.time.addEvent({
      delay: 500,
      callback: () => {
        p.gameState.canAdvanceLevel = true;
      },
    });
  },
};

export default levelOne;
