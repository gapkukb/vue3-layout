import type { ObjectDirective } from 'vue';
import observer, { type IntersectionOptionHandler } from '@/observers/intersection';

export default (<ObjectDirective<Element, IntersectionOptionHandler>>{
  mounted(el, binding) {
    observer.observe(el, binding.value, binding.arg);
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) return;
    observer.observe(el, binding.value);
  },
  beforeUnmount(el) {
    observer.unobserve(el);
  },
});
