import { queryAppConfiguration, queryWebToken } from '@/apis/app';
import App from './App';
import http from '@/apis/http';

export default defineStore('app', () => {
  const configuration = ref<model.app.Configuration>({});
  const app = new App();
  const puzzleVerified = ref(false);
  const webToken = ref();

  function updatePuzzleVerified(value: boolean) {
    puzzleVerified.value = value;
  }

  async function updateConfiguration() {
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
