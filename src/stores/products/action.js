import {
  GET,
} from './type';

export const get = (pos, count) => ({
  type: GET.START,
  payload: { pos, count },
});

export const getSuccess = (data, total) => ({
  type: GET.SUCCESS,
  payload: { data, total },
});

export const getFail = error => ({
  type: GET.FAIL,
  payload: error,
});
