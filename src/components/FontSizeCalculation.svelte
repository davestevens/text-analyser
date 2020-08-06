<script type="ts">
  import { onMount } from "svelte";
  import type { IFontSizeCalculation } from "../services/calculateFontSize";
  export let promise: Promise<IFontSizeCalculation>;
  let canvasContainer: HTMLElement;

  onMount(async () => {
    const data = await promise;
    canvasContainer.appendChild(data.canvas);
  });
</script>

{#await promise}
  <td colspan={4} class="is-vcentered">
    <progress class="progress is-small is-info" />
  </td>
{:then data}
  <td>
    <div bind:this={canvasContainer} />
  </td>
  <td>{data.renderedHeight}</td>
  <td>{data.fontSize}</td>
  <td>{data.bodyHeight}</td>
{:catch error}
  <td colspan={4}>
    <span class="has-text-danger">Something broke ({error.message})</span>
  </td>
{/await}
