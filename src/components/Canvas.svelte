<script type="ts">
  import { onMount } from "svelte";
  import { results } from "../stores/results";
  import { canvas, context, image } from "../stores/canvas";
  import { BOUNDING_BOX_PADDING, BOUNDING_BOX_BORDER_WIDTH } from "../consts";
  import limitsFromBoundingBox from "../services/limitsFromBoundingBox";

  export let imageUrl: string;
  let canvasElement: HTMLCanvasElement;

  const drawBorder = (boundingBox: number[], color: string): void => {
    $context.beginPath();
    const { x1, y1, x2, y2 } = limitsFromBoundingBox(boundingBox);
    $context.moveTo(x1, y1);
    $context.lineTo(x2, y1);
    $context.lineTo(x2, y2);
    $context.lineTo(x1, y2);
    $context.closePath();
    $context.strokeStyle = color;
    $context.lineWidth = BOUNDING_BOX_BORDER_WIDTH;
    $context.stroke();
  };

  onMount(() => {
    canvas.set(canvasElement);
    context.set(canvasElement.getContext("2d"));
    const imageElement = new Image();
    imageElement.onload = () => {
      canvasElement.width = imageElement.width;
      canvasElement.height = imageElement.height;
      $context.drawImage(imageElement, 0, 0);
      image.set(imageElement);
    };
    imageElement.src = imageUrl;

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
