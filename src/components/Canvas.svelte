<script type="ts">
  import { onMount } from "svelte";

  export let imageUrl: string;
  let canvasElement: HTMLCanvasElement;

  onMount(() => {
    const context = canvasElement.getContext("2d");
    const image = new Image();
    image.onload = () => {
      canvasElement.width = image.width;
      canvasElement.height = image.height;
      context.drawImage(image, 0, 0);
    };
    image.src = imageUrl;
  });
</script>

<style>
  canvas {
    max-width: 100%;
  }
</style>

<canvas bind:this={canvasElement} />
