import { connect } from 'react-redux';
import {
  push,
} from 'react-router-redux';

import Menu from './menu';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  navigate: ({ key }) => dispatch(push(key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
