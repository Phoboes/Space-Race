import p from "../globalVars";

import levelOne from "../levels/levelOne/levelOne";
import levelTwo from "../levels/levelTwo/levelTwo";
import levelThree from "../levels/levelThree/levelThree";
import levelFour from "../levels/levelFour/levelFour";
import levelFive from "../levels/levelFive/levelFive";
import levelSix from "../levels/levelSix/levelSix";
import levelSeven from "../levels/levelSeven/levelSeven";
import levelEight from "../levels/levelEight/levelEight";
import levelNine from "../levels/levelNine/levelNine";
import levelTen from "../levels/levelTen/levelTen";
import levelEleven from "../levels/levelEleven/levelEleven";

export default function init(game) {
  if (p.gameState.level === 1) {
    levelOne.init(game);
  } else if (p.gameState.level === 2) {
    levelTwo.init(game);
  } else if (p.gameState.level === 3) {
    levelThree.init(game);
  } else if (p.gameState.level === 4) {
    levelFour.init(game);
  } else if (p.gameState.level === 5) {
    levelFive.init(game);
  } else if (p.gameState.level === 6) {
    levelSix.init(game);
  } else if (p.gameState.level === 7) {
    levelSeven.init(game);
  } else if (p.gameState.level === 8) {
    levelEight.init(game);
  } else if (p.gameState.level === 9) {
    levelNine.init(game);
  } else if (p.gameState.level === 10) {
    levelTen.init(game);
  } else if (p.gameState.level === 11) {
    levelEleven.init(game);
  } else if (p.gameState.level === 12) {
    // levelTen.init(game);
    return null;
  }
}
