import { ModalNames } from '@/consts/ModalNames';
import { useApp } from '@/pinia';

export default {
  ModalNames,
  open(name: ModalNames) {
    const app = useApp();
    app.modal = name;
  },
  close(name?: ModalNames) {
    const app = useApp();
    app.modal = name;
  },
};
