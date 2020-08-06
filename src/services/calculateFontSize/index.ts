import threshold from "./threshold";
import trim from "./trim";
import calculate from "./calculate";
import createCanvasFromSection from "./createCanvasFromSection";
import limitsFromBoundingBox from "../limitsFromBoundingBox";

export interface IFontSizeCalculation {
  canvas: HTMLCanvasElement;
  fontSize: number;
  renderedHeight: number;
}

export default async (
  text: string,
  image: HTMLImageElement,
  boundingBox: number[]
): Promise<IFontSizeCalculation> => {
  const { x1, y1, x2, y2 } = limitsFromBoundingBox(boundingBox);
  const canvas = createCanvasFromSection(image, x1, y1, x2, y2);
  threshold(canvas);
  const renderedHeight = trim(canvas);
  await (document as any).fonts.load("1em manuskript"); // NOTE: font needs to be loaded before using it to check rendered height
  const fontSize = calculate(text, renderedHeight, "manuskript");
  return {
    canvas,
    fontSize,
    renderedHeight
  };
};
