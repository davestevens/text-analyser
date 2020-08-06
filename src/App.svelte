<script lang="ts">
  import extractText from "./services/extractText";
  import FileSelector from "./components/FileSelector.svelte";
  import Canvas from "./components/Canvas.svelte";
  import AsyncButton from "./components/AsyncButton.svelte";
  import AnalysisResults from "./components/AnalysisResults.svelte";
  import { results } from "./stores/results";
  import { image } from "./stores/canvas";

  let selectedFile: File;

  const onFileSelected = (file: File): void => {
    selectedFile = file;
  };

  const analyse = async (): Promise<void> => {
    const data = await extractText(selectedFile, $image);
    results.set(data);
    return;
  };
</script>

<section class="section">
  {#if !selectedFile}
    <div class="container">
      <h3 class="title is-3">Select an image</h3>
      <FileSelector {onFileSelected} />
    </div>
  {:else}
    <div class="container has-text-centered">
      <Canvas imageUrl={URL.createObjectURL(selectedFile)} />
    </div>
    {#if !$results.length}
      <div class="container has-text-centered">
        <AsyncButton text="Analyse" onClick={analyse} />
      </div>
    {:else}
      <div class="container">
        <h3 class="title is-3">Analysis Results</h3>
        <AnalysisResults />
      </div>
    {/if}
  {/if}
</section>
