import { isEmpty } from 'lodash';
import Observer from './Observer';
import type { IntersectionHandler, IntersectionOptionHandler } from './types.d';
export * from './types.d';

const observers = new Map<any, Observer>();
const map = new Map<any, Observer>();
const _default = new Observer();

function getObserver(config?: IntersectionObserverInit, key?: string) {
  if (!config) return _default;

  key ??= `${config.root?.constructor.name}-${config.rootMargin}-${config.threshold}`;

  if (observers.has(key)) return observers.get(key)!;

  const ob = new Observer(config);
  observers.set(key, ob);
  return ob;
}

function parse(option: IntersectionOptionHandler): { handler: IntersectionHandler; config?: IntersectionObserverInit } {
  if (typeof option === 'function') return { handler: option };

  const { handler, ...config } = option;
  return { handler, config: isEmpty(config) ? undefined : config };
}

export default {
  observe(target: Element, option: IntersectionOptionHandler, key?: string) {
    const { handler, config } = parse(option);
    const observer = getObserver(config, key);
    observer.observe(target, handler);
    if (observer === _default) return;

    map.set(target, observer);
  },
  unobserve(target: Element) {
    (map.get(target) || _default).unobserve(target);
    map.delete(target);
  },
};
