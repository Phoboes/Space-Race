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
        p.gameState.canAdvanceLevel &&
        p.gameState.level < 12
      ) {
        p.gameState.canAdvanceLevel = false;
        p.textState.stageCompleteText = textHandler(p.gameState.level);
        // Pause before allowing the player to advance
        p.game.time.addEvent({
          delay: 1000,
          callback: () => {
            p.textState.gameOverText = p.game.add
              .text(400, p.gameState.level < 8 ? 300 : 400, "(Hit space continue)", {
                ...p.textState.levelText.styles,
                align: "center",
                fontSize: "2em",
                fontWeight: "bold",
              })
              .setOrigin(0.5);
            p.gameState.levelPending = true;
            p.gameState.canAdvanceLevel = true;
            p.gameState.level++;
          },
        });
      }
    }
  } else {
    controlsHandler.space();
    if (p.playerState.alive === true && p.playerState.lives <= 0) {
      // If the player has no lives left, but is still 'alive', begin the process of freezing the game and changing the player's status to dead
      p.playerState.alive = false;
      // Add a slight delay to freeze the game mid explosion animation on the player
      p.game.time.addEvent({
        delay: 100,
        callback: () => {
          // Render "Game Over"
          const endText = p.game.add
            .text(400, 300, "Game Over", {
              ...p.textState.levelText.styles,
              align: "center",
              fontSize: "5em",
              fontWeight: "bold",
            })
            .setOrigin(0.5);
          p.textState.stageCompleteText = endText;
          p.gameState.canAdvanceLevel = false;
          // Prevent the game immediately resetting if the player is holding space
          p.game.time.addEvent({
            delay: 1000,
            callback: () => {
              p.textState.gameOverText = p.game.add
              .text(400, 350, "Hit space to restart", {
                ...p.textState.levelText.styles,
                align: "center",
                fontSize: "2em",
                fontWeight: "bold",
              })
              .setOrigin(0.5);
              p.gameState.canAdvanceLevel = true;
            },
          });
          // Freeze all animations
          p.game.physics.pause();
          p.game.anims.pauseAll();
          p.playerState.canFire = false;
          // Remove all pending alien spawn timers
          p.game.time.removeAllEvents();
          // If aliens are alive, freeze them all
          if (p.aliens.children.entries.length > 0) {
            p.aliens.setActive(false);
          }
        },
      });
    }
  }
}
