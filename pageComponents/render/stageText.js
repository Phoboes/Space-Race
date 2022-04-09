import p from "../globalVars";

const stageText = {
  levels: {
    one: {
      startText: () => {
        if (p.textState.levelText === null) {
          p.textState.levelText = {};
          p.textState.levelText.styles = {
            fontFamily: "Press_Start_2P",
            color: "black",
            fontSize: "2em",
          };
        }

        return p.game.add.text(
          220,
          80,
          "Press Space to begin.",
          {
            fontFamily: "Press_Start_2P",
            color: "black",
            fontSize: "2em",
            align: "center",
          }
        );
      },
      endText: () => {
        return p.game.add.text(200, 80, "Level Complete. \n\n\n Now try left and right. \n\n\n(Fire to advance)", {
          fontFamily: "Press_Start_2P",
          color: "black",
          fontSize: "2em",
          align: "center",
        });
      },
    },
    two: {
      endText: () => {
        return p.game.add.text(200, 80, "We're breaking up!", {
          fontFamily: "Press_Start_2P",
          color: "black",
          fontSize: "2em",
          align: "center",
        });
      },
      three: {
        endText: () => {
          return p.game.add.text(250, 80, "Cleared for take off!", {
            fontFamily: "Press_Start_2P",
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
