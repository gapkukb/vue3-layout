import type { App } from 'vue';
import resize from './resize';
import intersect from './intersect';
import mutation from './mutation';

export default function install(app: App) {
  app.directive('resize', resize);
  app.directive('intersect', intersect);
  app.directive('mutation', mutation);
}

export interface Directives {
  /**
   * @example
   * v-resize="(rect, entry) => {}"
   * v-resize:dp="(rect, entry) => {}"
   * v-resize:content="(rect, entry) => {}"
   * v-resize:border="(rect, entry) => {}"
   */
  vResize: typeof resize;

  /**
   *
   * @example
   * v-intersect="(visible:boolean,entry:IntersectionObserverEntry) => {}"
   * v-intersect="{
   *    handler(visible:boolean){},
   *    root:HTMLElement,
   *    rootMargin:string,
   *    threshold:number|number[]
   * }"
   * @example
   * 频繁调用且配置相同，可以指定key,提高索引性能,a,b表示不同的key
   * v-intersect:a="(visible:boolean) => {}"
   * v-intersect:b="(visible:boolean) => {}"
   */

  vIntersect: typeof intersect;

  /**
   *
   * @example
   * v-intersect="(visible:boolean,entry:IntersectionObserverEntry) => {}"
   * v-intersect="{
   *    handler(visible:boolean,entry:IntersectionObserverEntry){},
   *    root:HTMLElement,
   *    rootMargin:string,
   *    threshold:number|number[]
   * }"
   */
  vMutation: typeof mutation;
}
