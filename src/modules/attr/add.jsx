import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Icon,
} from 'antd';

import {
  blank,
  isValidate,
} from 'libs/utils';
import validator from './validator';

import styles from './add.scss';

class Add extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    validate: PropTypes.shape({
      name: PropTypes.shape({
        help: PropTypes.string,
        extra: PropTypes.arrayOf(
          PropTypes.string,
        ),
        required: PropTypes.bool,
        validateStatus: PropTypes.oneOf([
          'success',
          'error',
        ]),
        hasFeedback: PropTypes.bool,
      }),
      description: PropTypes.shape({
        help: PropTypes.string,
        extra: PropTypes.arrayOf(
          PropTypes.string,
        ),
        required: PropTypes.bool,
        validateStatus: PropTypes.oneOf([
          'success',
          'error',
        ]),
        hasFeedback: PropTypes.bool,
      }),
    }),
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    onValidateChange: PropTypes.func,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    validate: {
      name: {},
      description: {},
    },
    loading: false,
    onChange: blank,
    onValidateChange: blank,
    onCancel: blank,
    onSubmit: blank,
  };

  validateData = data =>
    validator.validate(data)
      .then(errors =>
        this.props.onValidateChange(
          validator.parseErrors(errors)),
        );
  change = (name, value) => {
    const {
      data,
      onChange,
    } = this.props;

    const newData = {
      ...data,
      [name]: value,
    };
    onChange(newData);
    this.validateData(newData);
  };
  inputChange = ({ target: { name, value } }) =>
    this.change(name, value);
  submit = (e) => {
    const {
      onSubmit,
    } = this.props;

    e.preventDefault();
    onSubmit();
  };

  render() {
    const {
      validate,
      data,
      loading,
      onCancel,
    } = this.props;

    const disabled = (isValidate(validate) && !loading) ? undefined : 'disabled';

    return (
      <Form
        onSubmit={this.submit}
      >
        <Form.Item
          {...validate.name}
          label="名称"
          labelCol={Add.LABEL_COL}
          wrapperCol={Add.WRAPPER_COL}
          colon
        >
          <Input
            name="name"
            value={data.name}
            onChange={this.inputChange}
          />
        </Form.Item>
        <Form.Item
          {...validate.description}
          label="备注"
          labelCol={Add.LABEL_COL}
          wrapperCol={Add.WRAPPER_COL}
          colon
        >
          <Input.TextArea
            name="description"
            value={data.description}
            autosize={{
              minRows: 4,
              maxRows: 8,
            }}
            onChange={this.inputChange}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...Add.WRAPPER_COL,
            offset: Add.LABEL_COL.span,
          }}
        >
          <Button
            className={styles.button}
            disabled={disabled}
            type="primary"
            htmlType="submit"
          >{loading ? <Icon type="loading" /> : '提交'}</Button>
          <Button
            className={styles.button}
            onClick={onCancel}
          >取消</Button>
        </Form.Item>
      </Form>
    );
  }
}

Add.LABEL_COL = {
  span: 4,
};

Add.WRAPPER_COL = {
  span: 20,
};

export default Add;
