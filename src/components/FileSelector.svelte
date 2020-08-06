<script type="ts">
  export let onFileSelected: (file: File) => void;
  let image = null;

  const handleChange = (fileList: FileList) => {
    onFileSelected(fileList[0]);
  };
</script>

<div class="file">
  <label class="file-label">
    <input
      class="file-input"
      type="file"
      on:change|preventDefault={(event) => handleChange(event.target.files)} />
    <span class="file-cta">
      <span class="file-icon">
        <i class="fas fa-upload" />
      </span>
      <span class="file-label">Choose a file…</span>
    </span>
  </label>
</div>
