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

  const phaserCanvas =
    game === null ? (
      <>
        <p className={styles.loader}>
          <span>Loading</span>
          <span className={styles.elipses}>...</span>
        </p>
      </>
    ) : (
      <h1 className={`${styles.pageHeader}`}>
        <span>S</span>
        <span>p</span>
        <span>a</span>
        <span>c</span>
        <span>e</span>
        <span> </span>
        <span>R</span>
        <span>a</span>
        <span>c</span>
        <span>e</span>
      </h1>
    );
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
      {/* This element needs to exist to force css fonts to load before Phaser, which then allows Phaser to use them from the get-go. */}
      {phaserCanvas}
      <span className={`${styles.textLoader2p} ${styles.textLoader}`} />
      <span className={`${styles.textLoaderOrbitron} ${styles.textLoader}`} />
    </div>
  );
};

export default index;
