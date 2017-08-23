import {
  VALIDATE_STATUS,
} from 'defines';

export const blank = () => {};

export const isValidate = validate =>
  Object.keys(validate)
    .every(key => validate[key]
      .validateStatus === VALIDATE_STATUS.SUCCESS);
