import p from "../globalVars";

const screenCenterX = 800 / 2;

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
            align: "center",
          };
        }

        return p.game.add
          .text(
            screenCenterX,
            100,
            "Press Space to begin.",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            160,
            "Level Complete. \n\n\n Now try left and right. \n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    two: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            160,
            "Level Complete.\n\n\nThey're breaking up!\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    three: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            160,
            "Level Complete.\n\n\nCleared for take off!\n\nVertical movement unlocked.\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    four: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            160,
            "Level Complete.\n\n\nWatch your six!\n\nRotation enabled\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    five: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            160,
            "Level Complete.\n\n\nIt's dark out here...\n\nDiagonal movement enabled.\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    six: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            160,
            "Level Complete.\n\n\nIncoming Blockade!\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    seven: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            160,
            "Level Complete.\n\n\nSeekers incoming!\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    eight: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            240,
            "Level Complete.\n\n\nThey're shooting back now?\nThat's not fair.\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    nine: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            240,
            "Level Complete.\n\n\nHeatseekers incoming!\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    ten: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            240,
            "Level Complete.\n\n\nScattershots incoming!\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
    eleven: {
      endText: () => {
        return p.game.add
          .text(
            screenCenterX,
            220,
            "Level Complete.\n\n\nI don't think this one ends...\n\n\n(Fire to advance)",
            p.textState.levelText.styles
          )
          .setOrigin(0.5);
      },
    },
  },
};

export default stageText;
