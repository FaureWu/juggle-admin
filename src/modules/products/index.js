import { connect } from 'react-redux';

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

const mapDispatchToProps = () => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);
