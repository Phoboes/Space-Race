import { useLayoutEffect, useEffect, useState } from "react";
import preload from "./preload";
import create from "./create";
import update from "./update";
import p from "./globalVars";
import styles from "./styles.module.scss";

const index = (props) => {
  const [browserDetected, setBrowserDetected] = useState(false);
  const [game, setGame] = useState(null);
  const [gameState, setGameState] = useState(p);

  p.updateReactState = setGameState;

  // Imports Phaser if a browser is detected and provides access to the game variable as a state.
  const setGameHandler = async () => {
    const Phaser = await import("phaser").then((P) => {
      const config = {
        type: P.AUTO,
        width: 800,
        height: 600,
        parent: "container",
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 200 },
          },
        },
        scene: {
          preload: preload,
          create: create,
          update: update,
        },
      };

      const newGame = new P.Game(config);
      setGame(newGame);
    });
  };

  // Prevents issues with Phaser throwing errors for SSR on import
  useLayoutEffect(() => {
    if (window !== undefined && game === null && !browserDetected) {
      setBrowserDetected(true);
      setGameHandler();
    }
  }, [browserDetected]);

  const content = game === null ? <p>"Loading..."</p> : null;

  if (gameState === null) {
    setGameState(p);
  }

  return (
    <div
      className={`${styles.contentWrapper} ${
        styles["level-" + gameState.gameState.level]
      }`}
      id="container"
    >
      {content}
      <div className={styles.textWrapper}>
        {/* <span>Score: {gameState.playerState.score}</span> */}
      </div>
    </div>
  );
};

export default index;
