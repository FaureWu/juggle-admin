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
  defaultCurrent: 1,
  defaultPageSize: 10,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '30', '40', '50'],
  showTotal: (total, range) => `${range[0]} - ${range[1]} / ${total}`,
};

export const PRODUCT_STATUS = {
  ONLINE: {
    value: '1',
    label: '已上架',
  },
  OFFLINE: {
    value: '0',
    label: '已下架',
  },
  HOTLINE: {
    value: '2',
    label: '已推荐',
  },
};

export const ARTICLE_STATUS = {
  SHOW: {
    value: '1',
    label: '显示',
  },
  UNSHOW: {
    value: '0',
    label: '不显示',
  },
  TOP: {
    value: '2',
    label: '置顶',
  },
};

export const SUBMIT_HELP_KEY = '__submit__';
