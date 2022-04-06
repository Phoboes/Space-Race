import p from "../globalVars";

const stageText = {
  levels: {
    one: {
      startText: () => {
        if (p.textState.levelText === null) {
          p.textState.levelText = {};
          p.textState.levelText.styles = {
            fontFamily: "Arial",
            color: "black",
            fontSize: "3em",
          };
        }

        return p.game.add.text(
          250,
          80,
          "Press Space to begin.",
          p.textState.levelText.styles
        );
      },
      endText: () => {
        return p.game.add.text(250, 80, "Nice! Now try left and right!", {
          fontFamily: "Arial",
          color: "black",
          fontSize: "3em",
          align: "center",
        });
      },
    },
    two: {
      endText: () => {
        return p.game.add.text(250, 80, "We're breaking up!", {
          fontFamily: "Arial",
          color: "black",
          fontSize: "3em",
          align: "center",
        });
      },
      three: {
        endText: () => {
          return p.game.add.text(250, 80, "Cleared for take off!", {
            fontFamily: "Arial",
            color: "black",
            fontSize: "3em",
            align: "center",
          });
        },
      },
    },
  },
};

export default stageText;
