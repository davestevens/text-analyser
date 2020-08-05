import type { IResult } from "../stores/results";

export interface ILine {
  boundingBox: number[];
  text: string;
}

const getColor = (index: number): string => {
  const hue = (index * 137) % 360;
  return `hsl(${hue}, 80%, 55%)`;
};

// TODO: image input
// TODO: request from Azure and wait for response
export default async (): Promise<IResult[]> => {
  const response = await fetch("/azure.response.json");
  if (!response.ok) {
    throw new Error("Something broke");
  }

  return await new Promise(async (resolve) => {
    const json = await response.json();
    if (json.status !== "succeeded") {
      throw new Error(`Something broke: ${json.status}`);
    }

    resolve(
      json?.analyzeResult?.readResults[0]?.lines.map((line, index) => ({
        boundingBox: line.boundingBox,
        color: getColor(index),
        text: line.text
      }))
    );
  });
};
