import type { IResult } from "./resultStore";

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
export default (): Promise<IResult[]> => {
  return fetch("/azure.response.json").then((response) => {
    if (response.ok) {
      return new Promise<IResult[]>((resolve) => {
        setTimeout(() => {
          response.json().then((data) => {
            if (data.status !== "succeeded") {
              throw new Error(`Something broke: ${data.status}`);
            }
            resolve(
              data?.analyzeResult?.readResults[0]?.lines.map((line, index) => ({
                boundingBox: line.boundingBox,
                color: getColor(index),
                text: line.text
              }))
            );
          });
        }, 100);
      });
    }
    throw new Error("Something broke");
  });
};
