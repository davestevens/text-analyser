export default (
  image: HTMLImageElement,
  x1: number,
  y1: number,
  x2: number,
  y2: number
): HTMLCanvasElement => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const width = x2 - x1;
  const height = y2 - y1;
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, x1, y1, width, height, 0, 0, width, height);
  return canvas;
};
