import type { IntersectionHandler } from './types.d';

const store = new WeakMap<Element, IntersectionHandler>();

export default class Observer extends IntersectionObserver {
  constructor(options?: IntersectionObserverInit) {
    super(Observer.#callback, options);
  }

  //@ts-ignore
  observe(target: Element, handler: IntersectionHandler) {
    store.set(target, handler);
    return super.observe(target);
  }

  unobserve(target: Element) {
    store.delete(target);
    super.unobserve(target);
  }

  static #callback = (entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      store.get(entry.target)?.(entry.isIntersecting, entry);
    }
  };
}
