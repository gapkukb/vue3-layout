import { ModalNames } from '@/consts/ModalNames';
import type { PopupProps } from 'vant';

interface Props extends PopupProps {
  name: ModalNames;
}

export const opens = ref<Set<ModalNames>>(new Set([]));

export async function open(value: ModalNames | Props) {
  if (typeof value === 'number') {
    opens.value.add(value);
  } else {
    opens.value.add(value.name);
  }
}
export function close(name?: ModalNames) {
  if (name) {
    opens.value.delete(name);
  } else {
    opens.value.clear();
  }
}

export function createModal() {}

async function test() {
  const ok = await open(ModalNames.LOGIN);
}
