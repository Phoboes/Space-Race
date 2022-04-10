import p from "../globalVars";

const livesAndScore = {
  update: () => {
    //  If the textState outline hasn't been created, create it
    if (p.textState.playerData === null) {
      p.textState.playerData = {};
      p.textState.playerData.styles = {
        fontFamily: "Press_Start_2P",
        color: "black",
        fontSize: "1.5em",
      };

      const score = p.game.add.text(
        30,
        30,
        `Score: ${p.playerState.score}`,
        p.textState.playerData.styles
      );

      const lives = p.game.add.text(
        660,
        30,
        `Lives: ${p.playerState.lives}`,
        p.textState.playerData.styles
      );

      p.textState.playerData.texts = { score, lives };
    }

    // Set the text values to the current scores/lives and make sure the correct styles are applied for the level
    p.textState.playerData.texts.lives
      .setText(`Lives: ${p.playerState.lives}`)
      .setStyle(p.textState.playerData.styles)
      .setDepth(10);
    p.textState.playerData.texts.score
      .setText(`Score: ${p.playerState.score}`)
      .setStyle(p.textState.playerData.styles)
      .setDepth(10);
  },
};

export default livesAndScore;
