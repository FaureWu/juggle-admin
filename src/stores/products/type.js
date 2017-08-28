import constants from 'libs/constants';

export const GET = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'PRODUCTS_GET_');

export const ADD = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'PRODUCTS_ADD_');

export const ADD_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'PRODUCTS_ADD_VALIDATE_');

export const DELETE = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'PRODUCTS_DELETE_');

export const EDIT = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'PRODUCTS_EDIT_');

export const EDIT_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'PRODUCTS_EDIT_VALIDATE_');

export const PAGE = constants([
  'CHANGE',
], 'PRODUCTS_PAGE_');
