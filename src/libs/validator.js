import AsyncValidator from 'async-validator';

class Validator {
  validator = null;

  constructor(descriptor) {
    this.validator = new AsyncValidator(descriptor);
  }

  validate(data, options) {
    return new Promise(resolve => this.validator
      .validate(data, options, resolve),
    );
  }

  parseErrors(errors) {
    if (!(errors instanceof Array)) return {};

    return errors.reduce((result, error) => {
      const res = { ...result };
      if (!(res[error.field] instanceof Array)) {
        res[error.field] = [];
      }

      res[error.field].push(error.message);

      return res;
    }, {});
  }
}

export default Validator;
