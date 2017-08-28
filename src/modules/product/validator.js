import Validator from 'libs/validator';

export default new Validator({
  name: { required: true, message: '请输入产品名称', whitespace: true },
  picture: { required: true, message: '请上传产品图片' },
});
