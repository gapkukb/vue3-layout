import { queryAppConfiguration } from '@/apis/app';
import App from './App';

export default defineStore('app', () => {
  const configuration = ref<model.app.Configuration>({});
  const app = new App();
  const puzzleVerified = ref(false);

  function updatePuzzleVerified(value: boolean) {
    puzzleVerified.value = value;
  }

  function updateConfiguration() {
    queryAppConfiguration({}).then((res) => {
      configuration.value = res;
    });
    return queryAppConfiguration({}, { adapter: 'fetch' }).then((res) => {
      configuration.value = res;
    });
  }

  return {
    keepAliveViews: app.keepAliveViews,
    updateKeepAliveViews: app.update,
    puzzleVerified,
    updatePuzzleVerified,
    configuration,
    updateConfiguration,
  };
});
