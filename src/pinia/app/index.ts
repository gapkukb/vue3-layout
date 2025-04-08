import App from './App';

export default defineStore('app', () => {
  const app = new App();
  const puzzleVerified = ref(false);

  function updatePuzzleVerified(value: boolean) {
    puzzleVerified.value = value;
  }

  return {
    keepAliveViews: app.keepAliveViews,
    updateKeepAliveViews: app.update,
    puzzleVerified,
    updatePuzzleVerified,
  };
});
