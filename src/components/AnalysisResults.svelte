<script type="ts">
  import type { ILine } from "../services/extractText";
  export let results: ILine[];
</script>

<table class="table is-bordered is-striped is-narrow is-fullwidth">
  <thead>
    <tr>
      <th>Text</th>
      <th>Original Image Section</th>
      <th>Rendered Height</th>
      <th>Calculated Font Size</th>
    </tr>
  </thead>
  <tbody>
    {#each results as result}
      <tr>
        <td>{result.text}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
      </tr>
    {:else}
      <tr>
        <td colspan={4} class="has-text-centered">Empty</td>
      </tr>
    {/each}
  </tbody>
</table>
