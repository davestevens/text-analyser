import renderedHeight from "./renderedHeight";

// Use canvas to find the closed font size based on the rendered height

export default (text: string, height: number, fontFamily: string): number => {
  // NOTE: if a piece of text is only caps it can be -30% of the font size
  const initialFontSize = Math.ceil(height * 1.3);
  let renderedSize = renderedHeight(initialFontSize, fontFamily, text);
  let fontSize = initialFontSize;
  // TODO: switch to a binary search
  while (renderedSize > height) {
    renderedSize = renderedHeight(--fontSize, fontFamily, text);
  }
  return fontSize;
};
