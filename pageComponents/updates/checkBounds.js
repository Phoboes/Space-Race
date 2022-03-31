import p from "../globalVars";
import handler from "./boundaryHandlers";

const checkBounds = {
  aliens: () => {
    if (p.aliens !== null) {
      // If aliens are set and any are alive
      if (p.aliens.children.entries.length > 0) {
        // Kill any aliens that exceed the game bounds
        handler.boundaryCheck(p.aliens);

        // Todo: move this behaviour
        if (p.gameState.level >= 8 && p.enemies.update !== null) {
          // If we're above level eight, seekers are introduced; this makes the alien chase the player and adjusts the enemy angle to face the player
          for (let i = 0; i < p.aliens.children.entries.length; i++) {
            const alien = p.aliens.children.entries[i];
            p.enemies.update(alien, p.player);
          }
        }
      }
    }
  },
  bullets: () => {
    if (p.enemies.bullets !== null && p.enemies.bullets.children.length > 0) {
      handler.boundaryCheck(p.enemies.bullets);
    }
    // Checks for bullets from the player outside the map and disables them
    if (p.bullets !== null) {
      const activePlayerBullets = p.bullets.getMatching("active", true);
      if (activePlayerBullets.length > 0) {
        for (let i = 0; i < activePlayerBullets.length; i++) {
          handler.playerBulletBoundary(activePlayerBullets[i]);
        }
      }
    }
    // Checks for enemy bullets from shotgunners and shooters and destroys if they exceed bounds of the map
    if (p.enemies.bullets !== null) {
      const activeEnemyBullets = p.enemies.bullets.getMatching("active", true);
      if (activeEnemyBullets.length > 0) {
        for (let i = 0; i < activeEnemyBullets.length; i++) {
          handler.enemyBulletBoundary(activeEnemyBullets[i]);
        }
      }
    }
  },
};

export default checkBounds;
