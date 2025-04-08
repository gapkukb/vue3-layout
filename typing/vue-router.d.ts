export {};

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    title?: string;
    description?: string;
    keywords?: string;
    keepAlive?: boolean;
  }
}
