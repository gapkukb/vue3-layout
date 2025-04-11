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
   *    handler(visible:boolean,entry:IntersectionObserverEntry){},
   *    root:HTMLElement,
   *    rootMargin:string,
   *    threshold:number|number[]
   * }"
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
