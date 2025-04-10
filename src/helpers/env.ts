const hostname = window.location.hostname.toLowerCase();
const searching = new URLSearchParams(window.location.search);
const linkHost = hostname.split('.')[0].toLowerCase();
const glife = ['glife', 'glifearena'].includes(linkHost) || searching.get('isFrom') === 'Glife';
const lazada = ['lazada', 'lazadaarena'].includes(linkHost) || searching.get('isFrom') === 'Lazada';
const maya = ['maya', 'mayalaroplus'].includes(linkHost);
const os = searching.get('os');
const miniApp = glife || lazada || maya;
const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') > -1;

if (lazada) {
  sessionStorage.set('lazada_open_id', searching.get('openID')!);
}

function iOS() {
  //@ts-ignore
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

enum ENV {
  DEV,
  FAT,
  UAT,
  PRE,
  PROD,
}

function resolve(): ENV {
  const host = window.location.host;
  if (process.env.NODE_ENV === 'development') {
    return ENV.DEV;
  }

  if (host.endsWith('fat.com')) {
    return ENV.FAT;
  }

  if (host.endsWith('.uatext66ap.com') || host.endsWith('.c66uat.com')) {
    return ENV.UAT;
  }

  if (host.startsWith('grayscale')) {
    return ENV.PRE;
  }

  return ENV.PROD;
}

class Env {
  env = resolve();
  isDev = this.env === ENV.DEV;
  isFat = this.env === ENV.FAT;
  isUat = this.env === ENV.UAT;
  isPre = this.env === ENV.PRE;
  isProd = this.env === ENV.PROD || this.isPre;
  isArenaDebug = window.location.search.includes('arenadebug');
  isDebug = !this.isProd || this.isArenaDebug;
  /** 小程序 */
  miniApp = miniApp;
  /** gcash 小程序 */
  glife = glife;
  /** maya 小程序 */
  maya = maya;
  /** lazada小程序 */
  lazada = lazada;
  /** APP webview */
  app = os
    ? {
        android: os === '0',
        ios: os === '1',
      }
    : null;
  web =
    !miniApp && !os
      ? {
          android: isAndroid,
          ios: iOS(),
        }
      : null;
}

export const env = new Env();
