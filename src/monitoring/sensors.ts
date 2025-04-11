import { autobind } from '@/decorators';
import { env } from '@/helpers/env';
import { CODES } from './codes/sensors';

function backendUrl() {
  if (!env.isProd) return 'https://dev-8106.digiplus-bigdata.com/sa?project=ArenaPlus';
  return 'https://8106.digiplus-bigdata.com/sa?project=ArenaPlus';
}

class Sensors extends RuntimeImporter {
  CODES = CODES;
  name = 'Sensors';
  #sensors: any;
  //@ts-ignore
  loader: () => import(/* webpackChunkName: "sa-sdk-javascript" */ 'sa-sdk-javascript');

  @autobind
  track(eventName: string, payload: Object, callback: Function) {
    if (this.imported === 0) {
      this.init();
    } else if (this.imported === 2) {
      this.#sensors.track(eventName, payload, callback);
    }

    if (this.imported === 0 || this.imported === 1) {
      this.staging.push(() => {
        this.track(eventName, payload, callback);
      });
    }
  }

  protected async init() {
    const { default: sensors } = (await super.init()) as any;
    this.#init(sensors);
    this.#sensors = sensors;
  }

  #init(sensors: any) {
    sensors.init({
      server_url: backendUrl(), // 服务端接受数据地址
      name: 'AP Sensors',
      cross_subdomain: false, // 不在根域下设置 cookie
      send_type: 'beacon',
      is_track_single_page: true, // 表示是否开启单页面自动采集 $pageview 功能，SDK 会在 url 改变之后自动采集 web 页面浏览事件 $pageview。
      // app_js_bridge: true, //与APP打通
      show_log: false, // 不输出 log 到控制台
      heatmap: {
        // 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
        clickmap: 'not_collect',
        // 是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
        scroll_notice_map: 'not_collect',
      },
    });

    sensors.registerPage({
      current_url: location.href,
      referrer: document.referrer,
    });

    sensors.quick('autoTrack');
  }
}

export default new Sensors();
