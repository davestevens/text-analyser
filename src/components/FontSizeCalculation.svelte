<script type="ts">
  import { onMount } from "svelte";
  import type { IFontSizeCalculation } from "../services/calculateFontSize";
  export let promise: Promise<IFontSizeCalculation>;
  let canvasContainer: HTMLElement;

  onMount(() => {
    promise.then((data) => {
      canvasContainer.appendChild(data.canvas);
    });
  });
</script>

<td class="is-vcentered">
  {#await promise}
    <progress class="progress is-small is-info" />
  {:then data}
    <div bind:this={canvasContainer} />
  {:catch error}
    <span class="has-text-danger">Something broke ({error.message})</span>
  {/await}
</td>
<td class="is-vcentered">
  {#await promise}
    <progress class="progress is-small is-info" />
  {:then data}
    {data.renderedHeight}
  {:catch error}
    <span class="has-text-danger">Something broke ({error.message})</span>
  {/await}
</td>
<td class="is-vcentered">
  {#await promise}
    <progress class="progress is-small is-info" />
  {:then data}
    {data.fontSize}
  {:catch error}
    <span class="has-text-danger">Something broke ({error.message})</span>
  {/await}
</td>
<td class="is-vcentered">
  {#await promise}
    <progress class="progress is-small is-info" />
  {:then data}
    {data.bodyHeight}
  {:catch error}
    <span class="has-text-danger">Something broke ({error.message})</span>
  {/await}
</td>
