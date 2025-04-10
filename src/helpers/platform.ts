import router from '@/router';

class Platform {
  openApp(path: string, query?: Record<string, string | number>) {
    const isApp = !!new URLSearchParams(window.location.search).get('os');
    if (!isApp) return this;

    if (query) {
      path = `bingo://${path}?${new URLSearchParams(query as any).toString()}`;
    }
    let a = document.createElement('a');
    a.href = path;
    a.click();
    a = null;
    return this;
  }

  openMiniApp(path: string, query?: Record<string, string | number>) {
    return this;
  }

  to(callback: () => void): this | Promise<this>;
  to(path: string, query?: Record<string, string | number>): this | Promise<this>;
  async to(path: string | (() => void), query?: Record<string, string | number>): this | Promise<this> {
    if (typeof path === 'function') {
      await path();
    } else {
      router.push({
        path,
        query,
      });
    }
    return this;
  }
}

export default new Platform();
