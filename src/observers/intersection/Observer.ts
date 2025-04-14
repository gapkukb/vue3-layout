import type { IntersectionHandler } from './types.d';

const store = new WeakMap<Element, IntersectionHandler>();

function callback(entries: IntersectionObserverEntry[]) {
  for (const entry of entries) {
    store.get(entry.target)?.(entry.isIntersecting, entry);
  }
}

export default class Observer extends IntersectionObserver {
  constructor(options?: IntersectionObserverInit) {
    super(callback, options);
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
}
