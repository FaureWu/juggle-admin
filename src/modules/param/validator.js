import Validator from 'libs/validator';

export default new Validator({
  name: { required: true, message: '请输入属性名称', whitespace: true },
});
