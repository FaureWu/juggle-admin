import { connect } from 'react-redux';

import {
  get as getProducts,
} from 'stores/products';
import {
  loadingSelector,
  dataSelector,
  totalSelector,
} from 'selectors/products';
import Products from './products';

const mapStateToProps = state => ({
  loading: loadingSelector(state),
  products: dataSelector(state),
  total: totalSelector(state),
});

const mapDispatchToProps = dispatch => ({
  onPageChange: (page, pageSize) =>
    dispatch(getProducts((page - 1) * pageSize, pageSize)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
