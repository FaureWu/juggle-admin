import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Form,
  Input,
  Icon,
  Button,
  Checkbox,
} from 'antd';

import {
  blank,
  isValidate,
} from 'libs/utils';
import {
  SUBMIT_HELP_KEY,
  VALIDATE_STATUS,
} from 'defines';
import logo from 'assets/logo.svg';
import validator from './validator';
import styles from './login.scss';

class Login extends PureComponent {
  static propTypes = {
    info: PropTypes.shape({
      name: PropTypes.string,
      password: PropTypes.string,
      remember: PropTypes.bool,
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
      password: PropTypes.shape({
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
    onLogin: PropTypes.func,
  };

  static defaultProps = {
    info: {
      name: '',
      password: '',
      remember: false,
    },
    validate: {
      name: {},
      password: {},
    },
    loading: false,
    onLogin: blank,
    onChange: blank,
    onValidateChange: blank,
  };

  componentDidMount() {
    const {
      onChange,
    } = this.props;

    let user = JSON.parse(
      window.localStorage.getItem('user')) || {};

    if (user.remember) {
      this.validateData(user);
    } else {
      user = {
        name: '',
        password: '',
        remember: false,
      };
    }

    onChange(user);
  }

  validateData = data =>
    validator.validate(data)
      .then(errors =>
        this.props.onValidateChange(
          validator.parseErrors(errors)),
        );
  submit = (e) => {
    const {
      onLogin,
      info,
    } = this.props;

    e.preventDefault();

    window.localStorage.removeItem('user');
    window.localStorage.setItem('user', JSON.stringify(info));

    onLogin();
  };
  change = (name, value) => {
    const {
      info,
      onChange,
    } = this.props;

    const data = {
      ...info,
      [name]: value,
    };
    onChange(data);
    this.validateData(data);
  };
  inputChange = ({ target: { name, value } }) =>
    this.change(name, value);
  checkChange = ({ target: { name, checked } }) =>
    this.change(name, checked);

  render() {
    const {
      info,
      validate,
      loading,
    } = this.props;

    const disabled = isValidate(validate) ? undefined : 'disabled';

    return (
      <div className={styles.login}>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img src={logo} alt="logo" />
          </div>
          <Form onSubmit={this.submit}>
            <Form.Item {...validate.name} >
              <Input
                name="name"
                value={info.name}
                prefix={(<Icon type="user" />)}
                placeholder="请输入用户名"
                onChange={this.inputChange}
              />
            </Form.Item>
            <Form.Item {...validate.password} >
              <Input
                name="password"
                value={info.password}
                type="password"
                prefix={(<Icon type="lock" />)}
                placeholder="请输入密码"
                onChange={this.inputChange}
              />
            </Form.Item>
            <Form.Item
              {...validate[SUBMIT_HELP_KEY]}
              className={classNames({
                [styles.hide]:
                  validate[SUBMIT_HELP_KEY].validateStatus !==
                    VALIDATE_STATUS.ERROR,
              })}
            />
            <Form.Item>
              <Checkbox
                name="remember"
                checked={info.remember}
                onChange={this.checkChange}
              >记住我</Checkbox>
              <Button
                className={styles.submit}
                disabled={disabled}
                type="primary"
                htmlType="submit"
              >{loading ? <Icon type="loading" /> : '登 录'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
