import Validator from 'libs/validator';

export default new Validator({
  name: { required: true, message: '请输入分类名称', whitespace: true },
});
