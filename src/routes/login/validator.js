import Validator from 'libs/validator';

export default new Validator({
  name: { required: true, message: '请输入用户名', whitespace: true },
  password: { required: true, message: '请输入密码', whitespace: true },
});
