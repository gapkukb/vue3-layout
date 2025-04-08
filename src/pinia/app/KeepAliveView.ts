import { autobind } from '@/decorators';

export default class {
  #keepAliveViews = ref<Set<string>>(new Set());
  keepAliveViews = computed(() => [...this.#keepAliveViews.value]);

  #add(name: string) {
    this.#keepAliveViews.value.add(name);
  }
  #remove(name: string) {
    this.#keepAliveViews.value.delete(name);
  }

  @autobind
  update(name?: string, value?: boolean) {
    if (!name || !value) return;
    value ? this.#add(name) : this.#remove(name);
  }
}
