import { writable } from "svelte/store";

export interface IResult {
  boundingBox: number[];
  color: string;
  text: string;
}

export const results = writable<IResult[]>([]);
