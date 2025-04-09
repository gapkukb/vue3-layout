import { ModalNames } from '@/consts/ModalNames';
import type { PopupProps } from 'vant';
import type { DefineComponent } from 'vue';
import { mapValues } from 'lodash';

interface ModalProps extends Omit<PopupProps, 'show'> {
  component: DefineComponent;
}

type ModalComponents = Record<ModalNames, DefineComponent | ModalProps>;

const modals = <ModalComponents>{
  [ModalNames.LOGIN]: {
    position: 'bottom',
    component: defineAsyncComponent(() => import('@/views/account/login/index.vue')),
  },
  [ModalNames.CONVERSATION]: {
    position: 'bottom',
    component: defineAsyncComponent(() => import('@/views/conversation/index.vue')),
  },
};

export default mapValues(modals, (v) => {
  if ('component' in v) return v;
  return {
    component: v,
  };
}) as Record<ModalNames, ModalProps>;
