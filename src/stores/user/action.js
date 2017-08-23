import {
  INFO,
  VALIDATE,
  LOGIN,
  LOGOUT,
} from './type';

export const login = () => ({
  type: LOGIN.START,
});

export const loginSuccess = () => ({
  type: LOGIN.SUCCESS,
});

export const loginFail = () => ({
  type: LOGIN.FAIL,
});

export const logout = () => ({
  type: LOGOUT.DONE,
});

export const infoChange = data => ({
  type: INFO.CHANGE,
  payload: data,
});

export const validateReset = () => ({
  type: VALIDATE.RESET,
});

export const validateChange = errors => ({
  type: VALIDATE.CHANGE,
  payload: errors,
});
