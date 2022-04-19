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
import levelTwelve from "../levels/levelTwelve/levelTwelve";

export default function init(game) {
  if (p.gameState.level === 1) {
    levelOne.init(game);
  } else if (p.gameState.level === 2) {
    levelTwo.init();
  } else if (p.gameState.level === 3) {
    levelThree.init();
  } else if (p.gameState.level === 4) {
    levelFour.init();
  } else if (p.gameState.level === 5) {
    levelFive.init();
  } else if (p.gameState.level === 6) {
    levelSix.init();
  } else if (p.gameState.level === 7) {
    levelSeven.init();
  } else if (p.gameState.level === 8) {
    levelEight.init();
  } else if (p.gameState.level === 9) {
    levelNine.init();
  } else if (p.gameState.level === 10) {
    levelTen.init();
  } else if (p.gameState.level === 11) {
    levelEleven.init();
  } else if (p.gameState.level === 12) {
    levelTwelve.init(game);
    return null;
  }
}
