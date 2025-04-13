import { isEmpty } from 'lodash';

export type MutationHandler = (current: MutationRecord) => void;
export interface MutationOption extends MutationObserverInit {
  callback: MutationHandler;
}

const store = new WeakMap<Node, MutationHandler>();

function callback(entries: MutationRecord[]) {
  for (const entry of entries) {
    store.get(entry.target)?.(entry);
  }
}

class Observer extends MutationObserver {
  constructor() {
    super(callback);
  }

  #parse(option: MutationOption | MutationHandler) {
    if (typeof option === 'function') return { callback: option };
    return option;
  }

  //@ts-ignore
  observe(target: Node, option: MutationOption | MutationHandler) {
    const { callback, ...config } = this.#parse(option);
    store.set(target, callback);
    if (isEmpty(config)) {
      config.attributes = true;
    }
    super.observe(target, config);
  }

  unobserve(target: Node) {
    store.delete(target);
  }
}

export default new Observer();
