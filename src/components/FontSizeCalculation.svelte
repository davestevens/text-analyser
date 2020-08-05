<script type="ts">
  import type { IFontSizeCalculation } from "../stores/results";
  export let promise: Promise<IFontSizeCalculation>;
</script>

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
    {data.calculatedFontSize}
  {:catch error}
    <span class="has-text-danger">Something broke ({error.message})</span>
  {/await}
</td>
