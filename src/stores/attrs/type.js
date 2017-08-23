import constants from 'libs/constants';

export const GET = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'ATTRS_GET_');

export const ADD = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'ATTRS_ADD_');

export const EDIT = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'ATTRS_EDIT_');

export const DELETE = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'ATTRS_DELETE_');

export const ADD_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'ATTRS_ADD_VALIDATE_');

export const EDIT_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'ATTRS_EDIT_VALIDATE_');
