import { ModalNames } from '@/consts/ModalNames';
import { open, close } from './_controller';

export const modals = {
  open,
  close,
  name: ModalNames,
} as const;

export default modals;
