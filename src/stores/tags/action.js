import {
  GET,
  ADD,
  EDIT,
  DELETE,
  ADD_VALIDATE,
  EDIT_VALIDATE,
} from './type';

export const get = () => ({
  type: GET.START,
});

export const getSuccess = data => ({
  type: GET.SUCCESS,
  payload: data,
});

export const getFail = error => ({
  type: GET.FAIL,
  payload: error,
});

export const addChange = data => ({
  type: ADD.CHANGE,
  payload: data,
});

export const add = () => ({
  type: ADD.START,
});

export const addSuccess = data => ({
  type: ADD.SUCCESS,
  payload: data,
});

export const addFail = error => ({
  type: ADD.FAIL,
  payload: error,
});

export const editChange = data => ({
  type: EDIT.CHANGE,
  payload: data,
});

export const edit = () => ({
  type: EDIT.START,
});

export const editSuccess = data => ({
  type: EDIT.SUCCESS,
  payload: data,
});

export const editFail = error => ({
  type: EDIT.FAIL,
  payload: error,
});

export const deleteStart = key => ({
  type: DELETE.START,
  payload: key,
});

export const deleteSuccess = key => ({
  type: DELETE.SUCCESS,
  payload: key,
});

export const deleteFail = error => ({
  type: DELETE.FAIL,
  payload: error,
});

export const addValidateReset = () => ({
  type: ADD_VALIDATE.RESET,
});

export const addValidateChange = errors => ({
  type: ADD_VALIDATE.CHANGE,
  payload: errors,
});

export const editValidateReset = () => ({
  type: EDIT_VALIDATE.RESET,
});

export const editValidateChange = errors => ({
  type: EDIT_VALIDATE.CHANGE,
  payload: errors,
});
