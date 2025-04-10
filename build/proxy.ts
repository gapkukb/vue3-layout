import type { ProxyConfig } from '@rsbuild/core';

export default (<ProxyConfig>{
  ...createProxy('/local', 'http://10.32.3.68:8080'),
  ...createProxy('/fat', 'http://c66-frontend-laroplus-mobile.dgfat.com'),
  ...createProxy('/uat', 'https://arenaplus.uatext66ap.com'),
  ...createProxy('/prod', 'https://autotest.arenaplus.ph'),
  ...createProxy('/_glaxy_c66_', 'https://arenaplus.uatext66ap.com'),
});

function createProxy(path: string, target: string): ProxyConfig {
  return {
    [path]: {
      target,
      secure: true,
      changeOrigin: true,
      pathRewrite: { '/uat': '' },
      logLevel: 'debug',
      onProxyReq: (proxyReq, req) => {
        // http请求
        console.log('[HPM] %s %s %s %s', req.method, req.originalUrl, '->', req.url);
      },
    },
  };
}
