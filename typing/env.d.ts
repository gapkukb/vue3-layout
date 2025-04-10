/// <reference types="@rsbuild/core/types" />
declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

interface ImportMetaEnv {
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly BASE_URL: string;
  readonly ASSET_PREFIX: string;
  readonly MODE: 'development' | 'production' | 'none';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
