import {
  RED_PERCENTAGE,
  GREEN_PERCENTAGE,
  BLUE_PERCENTAGE,
  THRESHOLD,
  BLACK,
  WHITE
} from "./consts";

// Performs thresholding of passed canvas to generate a binary image containing only the text.

export default (canvas: HTMLCanvasElement): void => {
  const context = canvas.getContext("2d");
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const threshold =
      r * RED_PERCENTAGE + g * GREEN_PERCENTAGE + b * BLUE_PERCENTAGE;
    data[i] = data[i + 1] = data[i + 2] =
      threshold >= THRESHOLD ? BLACK : WHITE;
    data[i + 3] = 255; // Alpha
  }
  context.putImageData(imageData, 0, 0);
};
