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

  moveTo(sort: number) {
    if (this.sort === sort) return;
    this.sort = sort;
  }

  destroy() {
    this.ctx = null as any;
  }
}
