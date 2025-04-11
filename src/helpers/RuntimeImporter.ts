abstract class RuntimeImporter {
  abstract name: string;
  #imported = 0 | 1 | 2 | 3;
  protected staging: Function[] = [];
  protected abstract loader: () => Promise<void>;
  #promise!: Promise<void>;
  /**
   * 0: not imported, 1: loading, 2: imported | 3: error
   *  */
  get imported() {
    return this.#imported as 0 | 1 | 2 | 3;
  }

  set imported(value: 0 | 1 | 2 | 3) {
    this.#imported = value;
    if (value === 2) {
      for (const fn of this.staging) fn();
      this.staging = [];
    }
  }

  protected async init<T = any>(): Promise<T | undefined> {
    if (this.#imported !== 0) return;
    this.#imported = 1;
    try {
      const result = await this.loader();
      this.imported = 2;
      return result as T;
    } catch (error) {
      console.log(`[${this.name}] import error:`, error);
      this.imported = 3;
    }
  }

  protected async load(loader: () => Promise<void>): Promise<any> {
    if (this.#promise) return this.#promise;
    this.#imported = 1;
    this.#promise;
    try {
      this.#promise = loader();
      const result = await this.#promise;
      this.imported = 2;
      return result;
    } catch (error) {
      console.log(`[${this.name}] import error:`, error);
      this.imported = 3;
      return this.#promise;
    }
  }
}
