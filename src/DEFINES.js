import {
  Map,
} from 'immutable';

import constants from 'libs/constants';

export const DEVELOPMENT = 'development';

export const PRODUCTION = 'production';

export const VALIDATE_STATUS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  VALIDATING: 'validating',
};

export const ACTIONS = constants([
  'MANAGE_PRODUCTS',
  'MANAGE_PRODUCT_ATTRS',
  'MANAGE_PRODUCT_PARAMS',
], 'ACTIONS_');

export const VALIDATE_DESCRIPTION = new Map({
  help: undefined,
  extra: undefined,
  required: false,
  validateStatus: undefined,
  hasFeedback: true,
});

export const PAGINATION = {
  defaultCurrent: 0,
  pageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '30', '40', '50'],
  showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
};

export const PRODUCT_STATUS = {
  ONLINE: 1,
  OFFLINE: 0,
  HOTLINE: 2,
};
