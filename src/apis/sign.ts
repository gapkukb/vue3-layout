import MD5 from 'crypto-js/md5';
import { env } from '@/helpers/env';
import type { Http } from '@/http';
import { useApp, useUser } from '@/pinia';
import { random, range, times } from 'lodash';
import axios from 'axios';

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

/**
 * 签名插件
 */
export default function _signPlugin() {
  return function signPlugin(http: Http) {
    http.setHeader(commonHeaders);

    http.inst.interceptors.request.use((config) => {
      const user = useUser();
      const app = useApp();

      // const key = config.method!.toLocaleLowerCase() === 'get' ? 'params' : 'data';

      // config[key] = Object.assign({}, config[key], common, {});

      // const qid = MD5(Date.now() + times(6, () => random(0, 9)).join('')).toString();

      // config.headers.Accept = 'application/json';
      // config.headers.Qid = qid;
      // config.headers.Sign = MD5(sort(config[key]) + qid + commonHeaders.AppId + commonHeaders.V);
      // config.headers.platform = 'H5';

      // axios.post(
      //   'http://localhost:8080/uat/_glaxy_c66_/front/siteinfo',
      //   { productId: 'C66', tenant: 'AP', client: 'h5' },
      //   {
      //     // adapter: 'fetch',
      //     headers: {
      //       accept: 'application/json',
      //       'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
      //       afappid: 'web-arenaplus.net',
      //       appid: 'C66H501',
      //       appsflyerid: '',
      //       'cache-control': 'no-cache',
      //       container: 'BROWSER',
      //       'content-type': 'application/json',
      //       'coraool-appid': '26439',
      //       'coraool-deviceid': '9qj27w_1744274533395',
      //       domainname: 'localhost',
      //       idfv: '',
      //       lang: 'en',
      //       package: 'APPLE',
      //       platform: 'H5',
      //       pragma: 'no-cache',
      //       qid: '42d5da2818180e95c8802dcf0e43cf9a',
      //       'sec-fetch-dest': 'empty',
      //       'sec-fetch-mode': 'cors',
      //       'sec-fetch-site': 'same-origin',
      //       sign: '615fb376935df6d9098bba0c53c7e3da',
      //       token: '6sNvgv4wu0KojwTO8gRFTdhC8IQzLPx4M8ZRT0WJBwpaZ5E8lQwUShfItikUmF1Vpihxao+28heKOuGviQKgWTuFQDg+S1tlMMocfBudyC7we4xqkFvXWQ==',
      //       v: '1.0.0',
      //     },
      //   },
      // );
      // console.log('sign sign sign');

      return config;
    });
  };
}

function sort(object: object) {
  return JSON.stringify(object).split('').sort().reverse().join('');
}

// fetch("http://localhost:8081/_glaxy_c66_/front/siteinfo", {
//   "headers": {
//     "accept": "application/json",
//     "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
//     "afappid": "web-arenaplus.net",
//     "appid": "C66H501",
//     "appsflyerid": "",
//     "cache-control": "no-cache",
//     "container": "BROWSER",
//     "content-type": "application/json",
//     "coraool-appid": "26439",
//     "coraool-deviceid": "9qj27w_1744274533395",
//     "domainname": "localhost",
//     "idfv": "",
//     "lang": "en",
//     "nnt": "1744278996",
//     "package": "APPLE",
//     "platform": "H5",
//     "pragma": "no-cache",
//     "qid": "42d5da2818180e95c8802dcf0e43cf9a",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "sign": "615fb376935df6d9098bba0c53c7e3da",
//     "token": "6sNvgv4wu0KojwTO8gRFTdhC8IQzLPx4M8ZRT0WJBwpaZ5E8lQwUShfItikUmF1Vpihxao+28heKOuGviQKgWTuFQDg+S1tlMMocfBudyC7we4xqkFvXWQ==",
//     "ttnn": "05xu4qIsBZJ0rV4TvLAwpHktgpUXZq6NJdWA6gUBTn4%3D",
//     "v": "1.0.0"
//   },
//   "referrer": "http://localhost:8081/foryou",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "{\"productId\":\"C66\",\"tenant\":\"AP\",\"client\":\"h5\"}",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });
