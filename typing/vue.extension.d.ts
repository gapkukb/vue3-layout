import type { Directives } from '@/directives';

declare module 'vue' {
  interface ComponentCustomProperties extends Directives {
    $http: typeof axios;
    $translate: (key: string) => string;
  }
}
