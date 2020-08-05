<script type="ts">
  export let text: string;
  export let onClick: () => Promise<any>;

  let isLoading: boolean = false;

  const handleClick = () => {
    isLoading = true;
    onClick().finally(() => (isLoading = false));
  };
</script>

<button
  class="button is-primary"
  on:click|preventDefault={handleClick}
  class:is-loading={isLoading}
  disabled={isLoading}>
  {text}
</button>
