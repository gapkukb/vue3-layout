import axios, { mergeConfig, type AxiosInstance, type AxiosRequestConfig, type CreateAxiosDefaults, type Method } from 'axios';

type HttpMethd = Extract<Lowercase<Method>, 'get' | 'post' | 'put' | 'delete'>;
type Dispatcher = ReturnType<(typeof Http)['_create']>;
type HttpMethds = Record<HttpMethd, Dispatcher>;
export interface RequestConfig extends AxiosRequestConfig {
  [key: string | number | symbol]: any;
}
export default class Http implements HttpMethds {
  private static _withoutInstance = true;
  private static _methods: HttpMethds = {
    get: this._create('get'),
    post: this._create('post'),
    put: this._create('put'),
    delete: this._create('delete'),
  };

  private static _create(method: HttpMethd) {
    const key: keyof AxiosRequestConfig = method === 'get' ? 'params' : 'data';
    return function wrap<Res = any, Req extends Record<string | number, any> | unknown = unknown>(this: Http, url: string, wrapperOption?: RequestConfig) {
      const _this = this as Http;
      return function dispatch(payload?: Req, option?: RequestConfig) {
        if (wrapperOption && option) {
          option = mergeConfig(wrapperOption, option);
        } else {
          option ||= wrapperOption;
        }

        return _this.inst.request<Req, Res>({
          method,
          url,
          [key]: payload,
          ...option,
        });
      };
    };
  }

  inst!: AxiosInstance;
  declare get: Dispatcher;
  declare post: Dispatcher;
  declare put: Dispatcher;
  declare delete: Dispatcher;

  constructor(option: CreateAxiosDefaults) {
    this.inst = axios.create(option);
    this.#mergeMethods();
  }

  use(plugin: (http: this) => any) {
    plugin(this);
  }

  eject() {
    this.inst.interceptors.response.eject(0);
  }

  copyWith(option: CreateAxiosDefaults) {
    const clone = <T extends object>(to: T, from: T) => {
      const k = 'handlers';
      Reflect.set(to, k, Array.from(Reflect.get(from, k) as Array<any>));
    };

    const newer = new Http({
      ...this.inst.defaults,
      ...option,
    });

    clone(newer.inst.interceptors.request, this.inst.interceptors.request);
    clone(newer.inst.interceptors.response, this.inst.interceptors.response);

    return newer;
  }

  setHeader(headers: Record<string, any>): void;
  setHeader(headerName: string, value: any): void;
  setHeader(headerName: Record<string, any> | string, value?: any): this {
    if (typeof headerName === 'string') {
      this.inst.defaults.headers.common[headerName] = value;
    } else {
      Object.assign(this.inst.defaults.headers.common, headerName);
    }
    return this;
  }

  #mergeMethods() {
    if (Http._withoutInstance) {
      Object.assign(this.constructor.prototype, Http._methods);
    }
    Http._withoutInstance = false;
  }
}
