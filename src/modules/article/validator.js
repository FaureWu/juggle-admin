import Validator from 'libs/validator';

export default new Validator({
  name: { required: true, message: '请输入产品名称', whitespace: true },
  cate: { required: true, message: '请输入类型' },
  picture: { required: true, message: '请上传产品图片' },
});
