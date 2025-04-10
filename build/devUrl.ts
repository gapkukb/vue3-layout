import isAbsoluteURL from 'axios/unsafe/helpers/isAbsoluteURL.js';

/**
 *
 *
 * 放开 devUrl 对应的环境的注释
 * 无需重启本地服务器
 *
 */

// const devUrl = '/local';
// const devUrl = '/fat';
// const devUrl = '/uat';
const devUrl = '/prod';

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * 请勿修改下面的代码
 */

const open = window.XMLHttpRequest.prototype.open;

// 劫持xhr
Object.defineProperty(window.XMLHttpRequest.prototype, 'open', {
  value(method: string, url: string | URL, async: boolean, username?: string | null, password?: string | null) {
    if (url instanceof URL) {
      url.pathname = `${devUrl}${url.pathname}`;
    } else if (!isAbsoluteURL(url)) {
      url = `${devUrl}${url}`;
    }
    return open.call(this, method, url, async, username, password);
  },
});

// 劫持fetch
window.Request = new Proxy(window.Request, {
  construct(target, argArray, newTarget) {
    if (!isAbsoluteURL(argArray[0])) {
      argArray[0] = devUrl + argArray[0];
    }

    return Reflect.construct(target, argArray, newTarget);
  },
});
