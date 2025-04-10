import type { ProxyConfig, ProxyOptions } from '@rsbuild/core';

const proxy = {
  '/local': 'http://10.32.3.68:8080',
  '/fat': 'http://c66-frontend-laroplus-mobile.dgfat.com',
  '/uat': 'https://arenaplus.uatext66ap.com',
  '/prod': 'https://autotest.arenaplus.ph',
  '/_glaxy_c66_': 'https://arenaplus.uatext66ap.com',
};

export default Object.keys(proxy).reduce((map, path) => {
  map[path] = <ProxyOptions>{
    target: proxy[path],
    // secure: true,
    changeOrigin: true,
    pathRewrite: { [`^${path}`]: '' },
    logLevel: 'debug',
    // onProxyReq(proxyReq, req) {
    //   console.log('[HPM] %s %s %s %s', req.method, req.originalUrl, '->', req.url);
    // },
    // onProxyRes(proxyRes, req, res) {
    //   console.log(`Received response: ${proxyRes.statusCode} ${req.url}`);
    // },
  };
  return map;
}, Object.create(null) as ProxyConfig);
