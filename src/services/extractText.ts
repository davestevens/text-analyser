import type { IResult } from "../stores/results";
import calculateFontSize from "./calculateFontSize";
import { OCP_RESULTS_INTERVAL, OCP_RESULTS_MAX_TRIES } from "../consts";

const getColor = (index: number): string => {
  const hue = (index * 137) % 360;
  return `hsl(${hue}, 80%, 55%)`;
};

const uploadImage = async (imageFile: File): Promise<string> => {
  const response = await fetch(`${process.env.OCP_ENDPOINT}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": process.env.OCP_APIM_SUBSCRIPTION_KEY
    },
    body: imageFile
  });

  if (!response.ok) {
    throw new Error("Something broke: Analyze");
  }

  return response.headers.get("operation-location");
};

const fetchResults = async (resultsUrl: string): Promise<any> => {
  const results = await fetch(resultsUrl, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": process.env.OCP_APIM_SUBSCRIPTION_KEY
    }
  });

  if (!results.ok) {
    throw new Error("Something broke: Results");
  }

  return await results.json();
};

export default async (
  imageFile: File,
  image: HTMLImageElement
): Promise<IResult[]> => {
  const resultsUrl = await uploadImage(imageFile);
  const response = await new Promise<any>((resolve) => {
    let tries = 0;
    const waitForSuccess = async () => {
      const response = await fetchResults(resultsUrl);
      if (response.status === "succeeded") {
        return resolve(response);
      }
      if (++tries > OCP_RESULTS_MAX_TRIES) {
        throw new Error("Something broke: Exceeded max tries getting results");
      }
      setTimeout(waitForSuccess, OCP_RESULTS_INTERVAL);
    };
    waitForSuccess();
  });

  return response?.analyzeResult?.readResults[0]?.lines.map((line, index) => ({
    boundingBox: line.boundingBox,
    color: getColor(index),
    fontSize: calculateFontSize(line.text, image, line.boundingBox),
    text: line.text
  }));
};
