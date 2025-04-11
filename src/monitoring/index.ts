import PVUV from './PVUV';
import sensors from './sensors';

/**
前端监控系统

1.错误监控：
    JavaScript 错误：捕获和报告 JS 执行错误、Promise 异常等。
    资源加载错误：监控 JS、CSS 等资源加载失败的情况。
    接口错误：监控 AJAX 和 Fetch 请求的异常。

2.性能监控：

    页面加载时间：跟踪页面加载的各个阶段时间。
    资源加载时间：监控各个资源（如图片、脚本）的加载时间。
    用户交互性能：监控用户交互（如点击、输入）的响应时间。

3.用户行为监控：

    页面浏览量（PV）和独立访客数（UV）：统计页面的访问量和访客数。
    用户路径分析：分析用户在网站上的行为路径和停留时间。

**/

export default class Monitoring {
  private constructor() {}
  /**
   * 1.错误监控：
   */
  static error = new ErrorMonitoring();
  /**
   * 1.性能监控：
   */
  static performance() {}
  /**
   * 1.用户行为监控：
   */
  static user() {}

  /**
   * 神策埋点
   */

  static sensors = sensors;

  /**
   * pvuv埋点
   */

  static pvuv = PVUV;
}
