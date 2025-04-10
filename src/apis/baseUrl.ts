import type { Http } from '@/http';
import { noop } from 'lodash';

// const prefix = '/local';
// const prefix = '/fat';
const prefix = '/uat';
// const prefix = '/prod';

export default function _baseUrlPlugin() {
  if (import.meta.env.PROD) return noop;
  return function baseUrlPlugin(http: Http) {
    // http.inst.interceptors.request.use((config) => {
    //   config.baseURL = prefix + config.baseURL;
    //   return config;
    // });
  };
}
