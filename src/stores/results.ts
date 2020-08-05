import { writable } from "svelte/store";

export interface IFontSizeCalculation {
  calculatedFontSize: number;
  renderedHeight: number;
}

export interface IResult {
  boundingBox: number[];
  color: string;
  fontSize: Promise<IFontSizeCalculation>;
  text: string;
}

export const results = writable<IResult[]>([]);
