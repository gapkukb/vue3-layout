import type { ObjectDirective } from 'vue';
import resize, { type ResizeHandler } from '@/observers/resize';
import type { Dictionary } from 'lodash';

const boxes: Dictionary<ResizeObserverBoxOptions> = {
  content: 'content-box',
  border: 'border-box',
  device: 'device-pixel-content-box',
};

export default (<ObjectDirective<Element, ResizeHandler, never, 'dp|content|border'>>{
  mounted(el, binding) {
    const box = binding.arg ? boxes[binding.arg] : undefined;
    resize.observe(el, { callback: binding.value, box });
  },
  updated(el, binding) {
    if (binding.value === binding.oldValue) return;
    resize.observe(el, { callback: binding.value });
  },
  beforeUnmount(el) {
    resize.unobserve(el);
  },
});
