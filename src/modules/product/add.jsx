import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Form,
  Input,
  Button,
  Icon,
  Select,
} from 'antd';

import {
  blank,
  isValidate,
} from 'libs/utils';
import {
  SUBMIT_HELP_KEY,
  VALIDATE_STATUS,
  PRODUCT_STATUS,
} from 'defines';
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
      code: PropTypes.string,
      attrs: PropTypes.object,
      params: PropTypes.object,
      alias: PropTypes.string,
      picture: PropTypes.string,
      url: PropTypes.string,
      detail: PropTypes.string,
      status: PropTypes.oneOf(
        Object.keys(PRODUCT_STATUS)
          .map(key => PRODUCT_STATUS[key].value),
      ),
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
      picture: PropTypes.shape({
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
      picture: {},
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
          {...validate.picture}
          label="产品图片"
          labelCol={Add.LABEL_COL}
          wrapperCol={Add.WRAPPER_COL}
          colon
        >
          <Input
            name="picture"
            value={data.picture}
            onChange={this.inputChange}
          />
        </Form.Item>
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
          label="别名"
          labelCol={Add.LABEL_COL}
          wrapperCol={Add.WRAPPER_COL}
          colon
        >
          <Input
            name="alias"
            value={data.alias}
            onChange={this.inputChange}
          />
        </Form.Item>
        <Form.Item
          label="编号"
          labelCol={Add.LABEL_COL}
          wrapperCol={Add.WRAPPER_COL}
          colon
        >
          <Input
            name="code"
            value={data.code}
            onChange={this.inputChange}
          />
        </Form.Item>
        <Form.Item
          label="购买链接"
          labelCol={Add.LABEL_COL}
          wrapperCol={Add.WRAPPER_COL}
          colon
        >
          <Input
            name="url"
            value={data.url}
            onChange={this.inputChange}
          />
        </Form.Item>
        <Form.Item
          label="详情"
          labelCol={Add.LABEL_COL}
          wrapperCol={Add.WRAPPER_COL}
          colon
        >
          <Input.TextArea
            name="detail"
            value={data.detail}
            autosize={{
              minRows: 4,
              maxRows: 8,
            }}
            onChange={this.inputChange}
          />
        </Form.Item>
        <Form.Item
          label="状态"
          labelCol={Add.LABEL_COL}
          wrapperCol={Add.WRAPPER_COL}
          colon
        >
          <Select
            value={`${data.status}`}
            onChange={value =>
              this.inputChange({ target: { name: 'status', value } })}
          >
            {Object.keys(PRODUCT_STATUS)
              .map(key => (
                <Select.Option
                  key={`PRODUCT_STATUS_${PRODUCT_STATUS[key].value}`}
                  value={`${PRODUCT_STATUS[key].value}`}
                >{PRODUCT_STATUS[key].label}</Select.Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...validate[SUBMIT_HELP_KEY]}
          className={classNames({
            [styles.hide]:
              validate[SUBMIT_HELP_KEY].validateStatus !==
                VALIDATE_STATUS.ERROR,
          })}
        />
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
