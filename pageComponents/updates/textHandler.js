import renderStageText from "../render/stageText";
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
    // code block
  }

  return text;
}
