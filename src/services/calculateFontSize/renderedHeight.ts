const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

export default (fontSize: number, fontFamily: string, text: string): number => {
  context.font = `${fontSize}px ${fontFamily}`;
  const metrics = context.measureText(text);
  return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
};
