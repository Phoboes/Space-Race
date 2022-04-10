import renderStageText from "../render/stageText";

// Render a given stage's starting/ending text
export default function textHandler(level) {
  let text = null;
  switch (level) {
    case 1:
      text = renderStageText.levels.one.endText();
      break;
    case 2:
      text = renderStageText.levels.two.endText();
      break;
    case 3:
      text = renderStageText.levels.three.endText();
      break;
    case 4:
      text = renderStageText.levels.four.endText();
      break;
    case 5:
      text = renderStageText.levels.five.endText();
      break;
    case 6:
      text = renderStageText.levels.six.endText();
      break;
    case 7:
      text = renderStageText.levels.seven.endText();
      break;
    case 8:
      text = renderStageText.levels.eight.endText();
      break;
    case 9:
      text = renderStageText.levels.nine.endText();
      break;
    case 10:
      text = renderStageText.levels.ten.endText();
      break;
    case 11:
      text = renderStageText.levels.eleven.endText();
      break;
  }

  return text;
}
