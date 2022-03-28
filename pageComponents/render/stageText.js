import p from "../globalVars";

const stageText = {
  levels: {
    one: {
      startText: () => {
        return p.game.add.text(250, 80, "Press Space to begin.", {
          fontFamily: "Arial",
          color: "black",
          fontSize: "3em",
          align: "center",
        });
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
        return p.game.add.text(
          250,
          80,
          "Like Chumbawumba said: I get knocked down, I get up again... or something. Anyway, now you can go up and down.",
          {
            fontFamily: "Arial",
            color: "black",
            fontSize: "3em",
            align: "center",
          }
        );
      },
    },
  },
};

export default stageText;
