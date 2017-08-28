import constants from 'libs/constants';

export const GET = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'TAGS_GET_');

export const ADD = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'TAGS_ADD_');

export const EDIT = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'TAGS_EDIT_');

export const DELETE = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'TAGS_DELETE_');

export const ADD_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'TAGS_ADD_VALIDATE_');

export const EDIT_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'TAGS_EDIT_VALIDATE_');
