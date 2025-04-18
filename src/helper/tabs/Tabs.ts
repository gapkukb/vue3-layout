import Tab from './Tab';
import type { ClassProperties } from './Tab';

export default class Tabs<T extends Tab = Tab, Prop extends ClassProperties<T> = ClassProperties<T>> {
  protected rawTabs: T[] = [];
  #mapper = new Map<T['id'], T>();

  public getTab(id: T['id']): T | undefined {
    return this.#mapper.get(id);
  }

  public getIndex(tab: T) {
    return this.rawTabs.findIndex((t) => t === tab);
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
    this.getTab(id)?.show();
    return this;
  }

  public hide(id: T['id']): this {
    this.getTab(id)?.hide();
    return this;
  }

  public update<K extends keyof Prop>(id: T['id'], props: Prop | K, value?: Prop[K]): this {
    //@ts-ignore
    this.getTab(id)?.update(props, value);
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
