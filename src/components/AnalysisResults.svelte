<script type="ts">
  import { results } from "../stores/results";
  import Tag from "./Tag.svelte";
  import FontSizeCalculation from "./FontSizeCalculation.svelte";
</script>

<table class="table is-bordered is-striped is-narrow is-fullwidth">
  <thead>
    <tr>
      <th>Text</th>
      <th>Extracted Section</th>
      <th>Height</th>
      <th>Font Size</th>
      <th>Body Height</th>
    </tr>
  </thead>
  <tbody>
    {#each $results as result}
      <tr>
        <td>
          <Tag color={result.color} />
          {result.text}
        </td>
        <FontSizeCalculation promise={result.fontSize} />
      </tr>
    {:else}
      <tr>
        <td colspan={5} class="has-text-centered">Empty</td>
      </tr>
    {/each}
  </tbody>
</table>
