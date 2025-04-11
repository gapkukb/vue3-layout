export type ResizeHandler = (rect: DOMRectReadOnly, entry: ResizeObserverEntry) => void;

const staging = new WeakMap<Element, ResizeHandler>();

class Observer extends ResizeObserver {
  constructor() {
    super(Observer.#onentry);
  }
  observe(target: Element, { callback, ...options }: ResizeObserverOptions & { callback: ResizeHandler }) {
    staging.set(target, callback);
    return super.observe(target, options);
  }
  unobserve(target: Element) {
    staging.delete(target);
    return super.unobserve(target);
  }

  static #onentry(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
      const callback = staging.get(entry.target as Element);
      callback?.(entry.contentRect, entry);
    }
  }
}

export default new Observer();
