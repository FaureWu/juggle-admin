import {
  MODAL,
} from './type';

export const open = (title, content) => ({
  type: MODAL.OPEN,
  payload: { title, content },
});

export const close = () => ({
  type: MODAL.CLOSE,
});
