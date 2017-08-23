import { connect } from 'react-redux';

import {
  get as getProducts,
} from 'stores/products';
import {
  get as getParams,
} from 'stores/params';
import {
  get as getAttrs,
} from 'stores/attrs';

import Product from './product';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  onMount: () => ([
    getAttrs(),
    getParams(),
    getProducts(0, 10),
  ].map(dispatch)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);