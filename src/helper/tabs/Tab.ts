import type Tabs from './Tabs';

export type ClassProperties<C> = {
  [K in keyof C as C[K] extends Function ? never : K]: C[K];
};

type P<C> = Partial<ClassProperties<C>>;

export default class Tab {
  name!: string;
  id!: string | number;
  icon?: string;
  visible = true;
  sort = 0;
  ctx!: Tabs;

  constructor(props: P<Tab>);
  constructor(id: string | number, name: string, icon?: string);
  constructor(props: P<Tab> | string | number, name?: string, icon?: string) {
    if (typeof props === 'object' && props !== null) {
      Object.assign(this, props);
    } else {
      this.id = props;
      this.name = name!;
      this.icon = icon;
    }
  }

  update<T extends P<typeof this>, K extends keyof T>(props: T): this;
  update<T extends P<typeof this>, K extends keyof T>(key: K, value: T[K]): this;
  update<T extends P<typeof this>, K extends keyof T>(props: T | K, value?: T[K]): this {
    if (typeof props === 'object' && props !== null) {
      Object.assign(this, props);
    } else {
      //@ts-ignore
      this[props] = value!;
    }
    return this;
  }

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  toggle(visible?: boolean) {
    this.visible = visible ?? !this.visible;
  }

  before(to: this) {
    if (this.sort < to.sort) {
      // down
      this.sort = to.sort;
    } else {
      // up
      this.sort = to.sort + 1;
    }
  }

  after(to: this) {
    if (this.#equal(this, to)) return this;
    this.sort = to.sort;
  }

  swap(to: this) {
    if (this.#equal(this, to)) return this;
    const from = this.sort;
    this.sort = to.sort;
    to.sort = from;
  }

  move(to: number) {
    to = Math.max(0, to);
    this.sort = to;
    return this;
  }

  destroy() {
    this.ctx = null as any;
  }

  #equal(from: this, to: this) {
    return from === to || from.sort === to.sort;
  }
}
