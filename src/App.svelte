<script>
  import ReadingGame from './components/ReadingGame.svelte';
</script>

<main>
  <ReadingGame />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #f7fafc;
    font-family: 'system-ui', sans-serif;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #a0ced9 0%, #fff9c4 100%);
  }
</style>
