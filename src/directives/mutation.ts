import type { ObjectDirective } from 'vue';
import observer, { type MutationHandler, type MutationOption } from '@/observers/mutation';

// type Modifier = Exclude<keyof MutationObserverInit, 'attributeFilter'>;

export default (<ObjectDirective<Element, MutationHandler | MutationOption>>{
  mounted(el, binding) {
    observer.observe(el, binding.value);
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) return;
    observer.unobserve(el);
    observer.observe(el, binding.value);
  },
  beforeUnmount(el) {
    observer.unobserve(el);
  },
});
