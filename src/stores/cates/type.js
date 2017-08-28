import constants from 'libs/constants';

export const GET = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'CATES_GET_');

export const ADD = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'CATES_ADD_');

export const EDIT = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'CATES_EDIT_');

export const DELETE = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'CATES_DELETE_');

export const ADD_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'CATES_ADD_VALIDATE_');

export const EDIT_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'CATES_EDIT_VALIDATE_');
