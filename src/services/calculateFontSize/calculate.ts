// Use canvas to find the closed font size based on the rendered height

export default (
  text: string,
  renderedHeight: number,
  fontFamily: string
): number => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const calculateRenderedSize = (fontSize) => {
    context.font = `${fontSize}px ${fontFamily}`;
    const metrics = context.measureText(text);
    return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  };

  // NOTE: if a piece of text is only caps it can be -30% of the font size
  const initialFontSize = Math.ceil(renderedHeight * 1.3);
  let renderedSize = calculateRenderedSize(initialFontSize);
  let fontSize = initialFontSize;
  // TODO: switch to a binary search
  while (renderedSize > renderedHeight) {
    renderedSize = calculateRenderedSize(--fontSize);
  }
  return fontSize;
};
