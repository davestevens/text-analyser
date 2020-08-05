<script type="ts">
  import { onMount } from "svelte";
  import { results } from "../services/resultStore";
  import { BOUNDING_BOX_PADDING, BOUNDING_BOX_BORDER_WIDTH } from "../consts";

  export let imageUrl: string;
  let canvasElement: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;

  const drawBorder = (boundingBox: number[], color: string): void => {
    context.beginPath();
    const x1 = Math.min(boundingBox[0], boundingBox[6]) - BOUNDING_BOX_PADDING;
    const y1 = Math.min(boundingBox[1], boundingBox[3]) - BOUNDING_BOX_PADDING;
    const x2 = Math.max(boundingBox[2], boundingBox[4]) + BOUNDING_BOX_PADDING;
    const y2 = Math.max(boundingBox[5], boundingBox[7]) + BOUNDING_BOX_PADDING;
    context.moveTo(x1, y1);
    context.lineTo(x2, y1);
    context.lineTo(x2, y2);
    context.lineTo(x1, y2);
    context.closePath();
    context.strokeStyle = color;
    context.lineWidth = BOUNDING_BOX_BORDER_WIDTH;
    context.stroke();
  };

  onMount(() => {
    context = canvasElement.getContext("2d");
    const image = new Image();
    image.onload = () => {
      canvasElement.width = image.width;
      canvasElement.height = image.height;
      context.drawImage(image, 0, 0);
    };
    image.src = imageUrl;

    return results.subscribe((value) => {
      value.forEach((line) => drawBorder(line.boundingBox, line.color));
    });
  });
</script>

<style>
  canvas {
    max-width: 100%;
  }
</style>

<canvas bind:this={canvasElement} />
