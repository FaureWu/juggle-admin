import constants from 'libs/constants';

export const GET = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'ARTICLES_GET_');

export const ADD = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'ARTICLES_ADD_');

export const ADD_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'ARTICLES_ADD_VALIDATE_');

export const DELETE = constants([
  'START',
  'SUCCESS',
  'FAIL',
], 'ARTICLES_DELETE_');

export const EDIT = constants([
  'START',
  'SUCCESS',
  'FAIL',
  'CHANGE',
], 'ARTICLES_EDIT_');

export const EDIT_VALIDATE = constants([
  'RESET',
  'CHANGE',
], 'ARTICLES_EDIT_VALIDATE_');

export const PAGE = constants([
  'CHANGE',
], 'ARTICLES_PAGE_');
