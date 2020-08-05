export interface ILine {
  boundingBox: number[];
  text: string;
}

// TODO: image input
// TODO: request from Azure and wait for response
// TODO: map the data to include a color (for border?)
export default (): Promise<ILine[]> => {
  return fetch("/azure.response.json").then((response) => {
    if (response.ok) {
      return new Promise<ILine[]>((resolve) => {
        setTimeout(() => {
          response.json().then((data) => {
            if (data.status !== "succeeded") {
              throw new Error(`Something broke: ${data.status}`);
            }
            resolve(data?.analyzeResult?.readResults[0]?.lines);
          });
        }, 100);
      });
    }
    throw new Error("Something broke");
  });
};
