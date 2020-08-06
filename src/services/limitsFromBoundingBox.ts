import { BOUNDING_BOX_PADDING } from "../consts";

export interface ILimits {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export default (boundingBox: number[]): ILimits => {
  const x1 = Math.min(boundingBox[0], boundingBox[6]) - BOUNDING_BOX_PADDING;
  const y1 = Math.min(boundingBox[1], boundingBox[3]) - BOUNDING_BOX_PADDING;
  const x2 = Math.max(boundingBox[2], boundingBox[4]) + BOUNDING_BOX_PADDING;
  const y2 = Math.max(boundingBox[5], boundingBox[7]) + BOUNDING_BOX_PADDING;

  return { x1, y1, x2, y2 };
};
