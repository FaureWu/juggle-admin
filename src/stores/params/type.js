import constants from 'libs/constants';

export const GET = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'PARAMS_GET_');

export const ADD = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'PARAMS_ADD_');

export const EDIT = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'PARAMS_EDIT_');

export const DELETE = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'PARAMS_DELETE_');

export const ADD_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'PARAMS_ADD_VALIDATE_');

export const EDIT_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'PARAMS_EDIT_VALIDATE_');
