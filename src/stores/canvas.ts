import { writable } from "svelte/store";

export const canvas = writable<HTMLCanvasElement>(null);
export const context = writable<CanvasRenderingContext2D>(null);
export const image = writable<HTMLImageElement>(null);
