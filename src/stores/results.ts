import { writable } from "svelte/store";
import type { IFontSizeCalculation } from "../services/calculateFontSize";

export interface IResult {
  boundingBox: number[];
  color: string;
  fontSize: Promise<IFontSizeCalculation>;
  text: string;
}

export const results = writable<IResult[]>([]);
