import MD5 from 'crypto-js/md5';
import { env } from '@/helpers/env';
import type { Http } from '@/http';
import { useApp, useUser } from '@/pinia';
import { random, range, times } from 'lodash';
import axios from 'axios';
import { queryWebToken } from './app';
import type { RequestConfig } from '@/http/core';

const client = (() => {
  if (env.glife) return 'miniapp_glife';
  if (env.maya) return 'miniapp_maya';
  if (env.lazada) return 'miniapp_lazada';
  return 'h5';
})();

const common = {
  tenant: 'AP',
  productId: 'C66',
  client,
};

const commonHeaders = {
  AppId: 'C66H501',
  DomainName: location.hostname.replace('www.', ''),
  V: '1.0.0',
  Lang: 'en',
};

// let webToken = localStorage.getItem('webToken');
let webToken;
function isWebToken(config: RequestConfig) {
  return '__webToken' in config;
}
/**
 * 签名插件
 */
export default function _signPlugin() {
  return function signPlugin(http: Http) {
    http.setHeader(commonHeaders);

    http.inst.interceptors.request.use(async (config) => {
      const user = useUser();
      const app = useApp();

      console.log('config.url', config.url);
      console.log(config);

      if (!webToken && !isWebToken(config)) {
        const a = await queryWebToken();
        console.log(a.data.body.info);

        webToken = a.data.body.info;
        localStorage.setItem('webToken', webToken);
      }

      const key = config.method!.toLocaleLowerCase() === 'get' ? 'params' : 'data';

      config[key] = Object.assign({}, config[key], common, {});

      const qid = MD5(Date.now() + times(6, () => random(0, 9)).join('')).toString();

      config.headers.Accept = 'application/json';
      config.headers.Qid = qid;
      config.headers.Sign = MD5(sort(config[key]) + qid + commonHeaders.AppId + commonHeaders.V);
      config.headers.platform = 'H5';
      config.headers.token = webToken;

      return config;
    });
  };
}

function sort(object: object) {
  return JSON.stringify(object).split('').sort().reverse().join('');
}
