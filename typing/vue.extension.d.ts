declare module "vue" {
  interface ComponentCustomProperties {
    $http: typeof axios;
    $translate: (key: string) => string;
  }
}

export {};
