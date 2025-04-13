export type ResizeHandler = (rect: DOMRectReadOnly, entry: ResizeObserverEntry) => void;

const store = new WeakMap<Element, ResizeHandler>();

function callback(entries: ResizeObserverEntry[]) {
  for (const entry of entries) {
    const callback = store.get(entry.target as Element);
    callback?.(entry.contentRect, entry);
  }
}
class Observer extends ResizeObserver {
  constructor() {
    super(callback);
  }
  observe(target: Element, { callback, ...options }: ResizeObserverOptions & { callback: ResizeHandler }) {
    store.set(target, callback);
    return super.observe(target, options);
  }
  unobserve(target: Element) {
    store.delete(target);
    return super.unobserve(target);
  }
}

export default new Observer();
