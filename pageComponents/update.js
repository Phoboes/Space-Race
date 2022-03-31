import p from "./globalVars";
import checkBounds from "./updates/checkBounds";
import controlsHandler from "./updates/controlHandlers";
import textHandler from "./updates/textHandler";

export default function update() {
  checkBounds.aliens();
  checkBounds.bullets();

  // Resets the velocity to 0 for each cycle by default -- we only move if a key is held
  if (p.player && p.player.body) {
    p.player.body.setVelocity(0, 0);
  }

  // If the player is still alive -- continue
  if (p.playerState.lives > 0) {
    // If p.gameState.cursorKeys are set and the player has been added to the game, listen for inputs
    if (p.gameState.cursorKeys && p.player.body) {
      controlsHandler.space();
      controlsHandler.directions();
    }

    // todo: work out how to tell a level is done more quickly
    if (p.aliens) {
      if (
        p.aliens.getLength() === 0 &&
        !p.gameState.levelPending &&
        p.gameState.canAdvanceLevel
      ) {
        // todo: update ships here
        p.gameState.levelPending = true;
        p.gameState.stageText = textHandler(p.gameState.level);
        p.gameState.level++;
      }
    }
  } else {
    controlsHandler.space();
    if (p.playerState.alive === true && p.playerState.lives <= 0) {
      p.playerState.alive = false;
      p.game.time.addEvent({
        delay: 100,
        callback: () => {
          const endText = p.game.add.text(270, 250, "Game Over", {
            ...p.textState.levelText.styles,
            align: "center",
            fontSize: "5em",
            fontWeight: "bold",
          });
          p.gameState.stageText = endText;
          p.game.physics.pause();
          p.game.anims.pauseAll();
          p.playerState.canFire = false;
        },
      });
    }
  }
}
