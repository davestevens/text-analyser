<script lang="ts">
  import extractText from "./services/extractText";
  import type { ILine } from "./services/extractText";
  import FileSelector from "./components/FileSelector.svelte";
  import Canvas from "./components/Canvas.svelte";
  import AsyncButton from "./components/AsyncButton.svelte";
  import AnalysisResults from "./components/AnalysisResults.svelte";

  let imageUrl: string;
  let results: ILine[];

  const onFileSelected = (url: string): void => {
    imageUrl = url;
  };

  const analyse = (): Promise<void> => {
    return extractText().then((data) => {
      results = data;
      return;
    });
  };
</script>

<section class="section">
  {#if !imageUrl}
    <div class="container">
      <h3 class="title is-3">Select an image</h3>
      <FileSelector {onFileSelected} />
    </div>
  {:else}
    <div class="container has-text-centered">
      <Canvas {imageUrl} />
    </div>
    {#if !results}
      <div class="container has-text-centered">
        <AsyncButton text="Analyse" onClick={analyse} />
      </div>
    {:else}
      <div class="container">
        <h3 class="title is-3">Analysis Results</h3>
        <AnalysisResults {results} />
      </div>
    {/if}
  {/if}
</section>
