import { connect } from 'react-redux';

import {
  get as getProducts,
  addValidateReset,
  deleteStart,
  editChange,
  editValidateReset,
  pageChange,
} from 'stores/products';
import {
  open,
} from 'stores/modal';
import {
  loadingSelector,
  dataSelector,
  totalSelector,
  deleteSeletor,
  paginationSelector,
} from 'selectors/products';
import {
  dataSelector as attrsDataSelector,
} from 'selectors/attrs';
import {
  dataSelector as paramsDataSelector,
} from 'selectors/params';
import Products from './products';

const mapStateToProps = state => ({
  loading: loadingSelector(state),
  products: dataSelector(state),
  total: totalSelector(state),
  attrs: attrsDataSelector(state),
  params: paramsDataSelector(state),
  deleteKey: deleteSeletor(state),
  pagination: paginationSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: ({ current, pageSize }) => {
    dispatch(pageChange(current, pageSize));
    dispatch(getProducts((current - 1) * pageSize, pageSize));
  },
  onAdd: (title, content) => {
    dispatch(addValidateReset());
    dispatch(open(title, content));
  },
  onEdit: (title, content, initData) => {
    dispatch(editChange(initData));
    dispatch(editValidateReset());
    dispatch(open(title, content));
  },
  onDelete: key => dispatch(deleteStart(key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
