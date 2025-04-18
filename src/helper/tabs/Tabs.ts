import Tab from './Tab';
import type { ClassProperties } from './Tab';

export default class Tabs<T extends Tab = Tab, Prop extends ClassProperties<T> = ClassProperties<T>> {
  protected rawTabs: T[] = [];
  #mapper = new Map<T['id'], T>();

  public get(id: T['id']): T | undefined {
    return this.#mapper.get(id);
  }

  public index(tab: T | T['id']) {
    const target = tab instanceof Tab ? tab : this.get(tab);
    if (!target) return -1;
    return this.rawTabs.findIndex((t) => t === target);
  }

  public add(...tabs: T[]): this {
    for (const tab of tabs) {
      this.#add(tab);
    }
    return this;
  }

  public remove(id: T['id']): this {
    this.rawTabs = this.rawTabs.filter((t) => t.id !== id);
    return this;
  }

  public show(id: T['id']): this {
    this.get(id)?.show();
    return this;
  }

  public hide(id: T['id']): this {
    this.get(id)?.hide();
    return this;
  }

  public update<K extends keyof Prop>(id: T['id'], props: Prop | K, value?: Prop[K]): this {
    //@ts-ignore
    this.get(id)?.update(props, value);
    return this;
  }

  public compute(..._: any[]): T[] {
    return this.rawTabs.filter(this.filter).sort(this.sort);
  }

  protected filter(t: T) {
    return t.visible;
  }

  protected sort(x: T, y: T) {
    return x.sort - y.sort;
  }

  public destroy() {
    this.rawTabs = [];
    this.#mapper.clear();
    for (const key of Object.getOwnPropertyNames(this)) {
      if (typeof this[key] === 'function') continue;
      if (this[key] instanceof Tab) this[key].destroy();
      this[key] = null;
    }
  }

  #add(tab: T) {
    if (this.#mapper.has(tab.id)) return;
    tab.sort = this.rawTabs.length;
    this.rawTabs.push(tab);
    this.#mapper.set(tab.id, tab);
  }
}
