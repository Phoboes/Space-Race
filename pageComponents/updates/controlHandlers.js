import p, { setInitialState } from "../globalVars";
import utils from "../utilityFunctions";
import initLevel from "../gameplay/init";

const controlsHandler = {
  space: () => {
    //   If we're not between levels and can fire, continue
    if (
      p.gameState.cursorKeys.space._justDown &&
      p.playerState.canFire &&
      !p.gameState.levelPending
    ) {
      // Destroy any level text that may remain
      if (p.gameState.stageText) {
        p.gameState.stageText.destroy();
        p.gameState.stageText = null;
      }

      // Used to throttle shots from the player. Wait x then allow firing again.
      utils.delay(p.playerState.fireRate).then(() => {
        p.playerState.canFire = true;
      });

      p.playerState.fireBulletFromPlayer();
    } else if (
      p.gameState.cursorKeys.space._justDown &&
      p.gameState.levelPending
    ) {
      if (p.gameState.stageText) {
        p.gameState.stageText.destroy();
        p.gameState.stageText = null;
      }
      p.gameState.levelPending = false;
      initLevel(p.game);
      console.log(p.gameState.level);
    } else if (
      p.gameState.cursorKeys.space._justDown &&
      p.playerState.lives === 0
    ) {
      const newGame = setInitialState();
      p = { ...newGame, game: p.game, updateReactState: p.updateReactState };
      p.updateReactState(p);
      p.game.scene.restart();
      p.game.physics.resume();
      p.game.anims.resumeAll();
      // initLevel(p.game);
    }
  },

  directions: () => {
    // Allows sideways movement for level 2
    if (
      (p.player.body && p.gameState.level === 2) ||
      (p.player.body && p.gameState.level === 3)
    ) {
      if (
        p.gameState.cursorKeys.left.isDown ||
        p.gameState.cursorKeys.A.isDown
      ) {
        p.player.body.velocity.x = -p.playerState.velocity;
      } else if (
        p.gameState.cursorKeys.right.isDown ||
        p.gameState.cursorKeys.D.isDown
      ) {
        p.player.body.velocity.x = p.playerState.velocity;
      }
      // On level 4 we allow up OR down OR left etc, none of that diagonal business.
    } else if (p.player.body && p.gameState.level === 4) {
      if (
        p.gameState.cursorKeys.left.isDown ||
        p.gameState.cursorKeys.A.isDown
      ) {
        p.player.body.velocity.x = -p.playerState.velocity;
      } else if (
        p.gameState.cursorKeys.right.isDown ||
        p.gameState.cursorKeys.D.isDown
      ) {
        p.player.body.velocity.x = p.playerState.velocity;
      } else if (
        p.gameState.cursorKeys.up.isDown ||
        p.gameState.cursorKeys.W.isDown
      ) {
        p.player.body.velocity.y -= p.playerState.velocity;
      } else if (
        p.gameState.cursorKeys.down.isDown ||
        p.gameState.cursorKeys.S.isDown
      ) {
        p.player.body.velocity.y = p.playerState.velocity;
      }
    } else if (p.player.body && p.gameState.level === 5) {
      if (
        p.gameState.cursorKeys.left.isDown ||
        p.gameState.cursorKeys.A.isDown
      ) {
        p.player.body.velocity.x = -p.playerState.velocity;
        p.player.angle = 180;
      } else if (
        p.gameState.cursorKeys.right.isDown ||
        p.gameState.cursorKeys.D.isDown
      ) {
        p.player.body.velocity.x = p.playerState.velocity;
        p.player.angle = 0;
      } else if (
        p.gameState.cursorKeys.up.isDown ||
        p.gameState.cursorKeys.W.isDown
      ) {
        p.player.body.velocity.y -= p.playerState.velocity;
        p.player.angle = 270;
      } else if (
        p.gameState.cursorKeys.down.isDown ||
        p.gameState.cursorKeys.S.isDown
      ) {
        p.player.body.velocity.y = p.playerState.velocity;
        p.player.angle = 90;
      }
    } else if (p.player.body && p.gameState.level >= 6) {
      // Diagonal movement enabled from 6+, if statement filters by most specific conditions (ie double keypress) first

      // Down left
      if (
        (p.gameState.cursorKeys.left.isDown &&
          p.gameState.cursorKeys.down.isDown) ||
        (p.gameState.cursorKeys.A.isDown && p.gameState.cursorKeys.S.isDown)
      ) {
        p.player.body.velocity.x = -p.playerState.velocity * 0.75;
        p.player.body.velocity.y = p.playerState.velocity * 0.75;
        p.player.angle = 135;
        if (p.playerAnimation) {
          p.player.play(p.playerAnimation.key, true);
        }
        // Down right
      } else if (
        (p.gameState.cursorKeys.right.isDown &&
          p.gameState.cursorKeys.down.isDown) ||
        (p.gameState.cursorKeys.D.isDown && p.gameState.cursorKeys.S.isDown)
      ) {
        p.player.body.velocity.x = p.playerState.velocity * 0.75;
        p.player.body.velocity.y = p.playerState.velocity * 0.75;
        p.player.angle = 45;
        if (p.playerAnimation) {
          p.player.play(p.playerAnimation.key, true);
        }
        // Up right
      } else if (
        (p.gameState.cursorKeys.right.isDown &&
          p.gameState.cursorKeys.up.isDown) ||
        (p.gameState.cursorKeys.W.isDown && p.gameState.cursorKeys.D.isDown)
      ) {
        p.player.body.velocity.x = p.playerState.velocity * 0.75;
        p.player.body.velocity.y = -p.playerState.velocity * 0.75;
        p.player.angle = 315;
        if (p.playerAnimation) {
          p.player.play(p.playerAnimation.key, true);
        }
        // Up left
      } else if (
        (p.gameState.cursorKeys.left.isDown &&
          p.gameState.cursorKeys.up.isDown) ||
        (p.gameState.cursorKeys.W.isDown && p.gameState.cursorKeys.A.isDown)
      ) {
        p.player.body.velocity.x = -p.playerState.velocity * 0.75;
        p.player.body.velocity.y = -p.playerState.velocity * 0.75;
        p.player.angle = 225;
        if (p.playerAnimation) {
          p.player.play(p.playerAnimation.key, true);
        }
        // Left
      } else if (
        p.gameState.cursorKeys.left.isDown ||
        p.gameState.cursorKeys.A.isDown
      ) {
        p.player.body.velocity.x = -p.playerState.velocity;
        p.player.angle = 180;
        if (p.playerAnimation) {
          p.player.play(p.playerAnimation.key, true);
        }
        // Right
      } else if (
        p.gameState.cursorKeys.right.isDown ||
        p.gameState.cursorKeys.D.isDown
      ) {
        p.player.body.velocity.x = p.playerState.velocity;
        p.player.angle = 0;
        if (p.playerAnimation) {
          p.player.play(p.playerAnimation.key, true);
        }
        // Up
      } else if (
        p.gameState.cursorKeys.up.isDown ||
        p.gameState.cursorKeys.W.isDown
      ) {
        p.player.body.velocity.y -= p.playerState.velocity;
        p.player.angle = 270;
        if (p.playerAnimation) {
          p.player.play(p.playerAnimation.key, true);
        }
        // Down
      } else if (
        p.gameState.cursorKeys.down.isDown ||
        p.gameState.cursorKeys.S.isDown
      ) {
        p.player.body.velocity.y = p.playerState.velocity;
        p.player.angle = 90;
        if (p.playerAnimation) {
          p.player.play(p.playerAnimation.key, true);
        }
      } else {
        p.player.setFrame(0);
      }
    }
  },
};

export default controlsHandler;
