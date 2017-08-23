import constants from 'libs/constants';

export const INFO = constants([
  'CHANGE',
], 'USER_INFO_');

export const VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'USER_VALIDATE_');

export const LOGIN = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'USER_LOGIN_');

export const LOGOUT = constants([
  'DONE',
], 'USER_LOGOUT_');
