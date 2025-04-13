import { isEmpty } from 'lodash';
import Observer from './Observer';
import type { IntersectionHandler, IntersectionOptionHandler } from './types.d';
export * from './types.d';

const observers = new Map<string, Observer>();
const counter = new WeakMap<Observer, number>();
const defaultObserver = new Observer();
const ATTR_OB = '__ob__';
const ATTR_OB_KEY = '__ob_key__';

function getAndSetIfNeed(config?: IntersectionObserverInit, key?: string): { observer: Observer; key: string | undefined } {
  if (!config) return { observer: defaultObserver, key };

  let observer: Observer;
  key ??= `${config.root?.constructor.name}-${config.rootMargin}-${config.threshold}`;
  if (observers.has(key)) {
    observer = observers.get(key)!;
  } else {
    observer = new Observer(config);
    observers.set(key, observer);
  }

  return { observer, key };
}

function parseOption(option: IntersectionOptionHandler): { handler: IntersectionHandler; config?: IntersectionObserverInit } {
  if (typeof option === 'function') return { handler: option };

  const { handler, ...config } = option;
  return { handler, config: isEmpty(config) ? undefined : config };
}

export default {
  observe(el: Element, option: IntersectionOptionHandler, key?: string) {
    const { handler, config } = parseOption(option);
    const { observer, key: k } = getAndSetIfNeed(config, key);
    observer.observe(el, handler);

    if (observer === defaultObserver) return;

    Reflect.set(el, ATTR_OB, observer);
    const count = counter.get(observer) || 0;
    counter.set(observer, count + 1);
    Reflect.set(el, ATTR_OB_KEY, k);
  },
  unobserve(el: Element) {
    const observer = Reflect.get(el, ATTR_OB) as Observer;
    observer.unobserve(el);
    if (observer === defaultObserver) return;

    const count = counter.get(observer);
    if (count && count > 1) {
      counter.set(observer, count - 1);
      return;
    }

    observer.disconnect();
    counter.delete(observer);
    const key = Reflect.get(el, ATTR_OB_KEY);
    observers.delete(key);
  },
};
