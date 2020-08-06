import { BLACK, WHITE } from "./consts";

// Trims the canvas down vertically to only include text

const getBorderColor = (imageData: ImageData): typeof BLACK | typeof WHITE => {
  let whiteCount: number = 0;
  let blackCount: number = 0;
  for (let i = 0; i < imageData.width * 4; i += 4) {
    if (imageData.data[i] === WHITE) {
      whiteCount++;
    } else if (imageData.data[i] === BLACK) {
      blackCount++;
    } else {
      throw new Error(`Unknown color: ${imageData.data[i]}`);
    }
  }
  if (blackCount === whiteCount) {
    throw new Error("Black and white count is the same");
  }
  return blackCount > whiteCount ? BLACK : WHITE;
};

interface IBounds {
  bottom: number;
  top: number;
}

const getBounds = (imageData: ImageData): IBounds => {
  const borderColor = getBorderColor(imageData);
  const rowHasData = (row: number): boolean => {
    const startIndex = imageData.width * 4 * row;
    for (let i = startIndex; i < startIndex + imageData.width * 4; ++i) {
      if (imageData.data[i] !== borderColor) {
        return true;
      }
    }
    return false;
  };

  const middle = Math.floor(imageData.height / 2);

  let top: number = 0;
  for (let j = middle; j >= 0; --j) {
    if (!rowHasData(j)) {
      break;
    } else {
      top = j;
    }
  }

  let bottom: number = imageData.height;
  for (let j = middle; j < imageData.height; ++j) {
    if (!rowHasData(j)) {
      bottom = j;
      break;
    }
  }

  return { top, bottom };
};

export default (canvas: HTMLCanvasElement): number => {
  const context = canvas.getContext("2d");
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { top, bottom } = getBounds(imageData);
  const newHeight = bottom - top;
  canvas.height = newHeight;
  context.putImageData(imageData, 0, -top, 0, top, imageData.width, newHeight);
  return newHeight;
};
