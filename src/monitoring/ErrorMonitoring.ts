/**
 * 错误监控：
 */

class ErrorMonitoring {
  constructor() {
    this.#catchExcuteError();
    this.#catchResourceLoadError();
    this.#catchPromiseError();
    this.#catchFetchError();
    this.#catchXHRError();
  }
  // 捕获 JavaScript 错误
  #catchExcuteError() {
    window.addEventListener("error", (event) => {
      const errorInfo = {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        // type: "JavaScript Error",
        type: event.type,
        timeStamp: event.timeStamp,
      };
      console.error("JavaScript Error:", errorInfo);
      // 发送错误信息到服务器
      this.report(errorInfo);
    });
  }

  #catchResourceLoadError() {
    // 资源加载错误
    window.addEventListener("error", (event: any) => {
      // 过滤掉非资源加载错误
      if (event instanceof ErrorEvent) return;
      const errorInfo = {
        src: event.target.src || event.target.href,
        // type: "Resource Load Error",
        type: event.type,
        timeStamp: event.timeStamp,
        message: event.message,
        tagName: event.target.tagName,
      };

      this.report(errorInfo);
    });
  }

  // 捕获 Promise 异常
  #catchPromiseError() {
    window.addEventListener("unhandledrejection", (event) => {
      const errorInfo = {
        reason: event.reason,
        type: event.type,
        timeStamp: event.timeStamp,
        // a:event.target.
      };
      console.error(errorInfo);
      // 发送错误信息到服务器
      this.report(errorInfo);
    });
  }

  // 捕获 Fetch|XHR 请求异常
  #catchFetchError() {
    // 重写Fetch监听请求异常
    const _fetch = window.fetch;
    window.fetch = (...args) => {
      return _fetch(...args)
        .then((response) => {
          if (!response.ok) {
            const errorInfo = {
              url: args[0],
              method: args[1]?.method || "GET",
              status: response.status,
              statusText: response.statusText,
            };
            this.report(errorInfo);
          }
          return response;
        })
        .catch((error) => {
          const errorInfo = {
            url: args[0],
            method: args[1]?.method || "GET",
            message: error.message,
          };
          this.report(errorInfo);
          return Promise.reject(error);
        });
    };
  }

  // 捕获 Fetch|XHR 请求异常
  #catchXHRError() {
    if (!window.XMLHttpRequest) return;
    const xhr = window.XMLHttpRequest;
    const send = xhr.prototype.send;
    const handler = function (e: ProgressEvent<XMLHttpRequestEventTarget>) {
      const ev = e?.currentTarget as XMLHttpRequest;
      if (ev?.status === 200) return;
      const errorInfo = {
        url: ev.responseURL,
        method: ev.method,
        status: ev?.status,
        statusText: ev.statusText,
      };
      this.report(errorInfo);
    };

    xhr.prototype.send = function () {
      if (this.addEventListener) {
        this.addEventListener("load", handler);
        this.addEventListener("error", handler);
        this.addEventListener("abort", handler);
      } else {
        const statechange = this.onreadystatechange;

        this.onreadystatechange = function (e) {
          if (this.readyState === 4) {
            handler(e as any);
            statechange?.apply(this, arguments);
          }
        };
      }

      return send.apply(this, arguments);
    };
    // 监听请求完成
  }

  report(errorInfo: any) {
    // 发送错误信息到服务器
    console.error("Error Info:", errorInfo);
  }
}
