import { connect } from 'react-redux';
import {
  push,
} from 'react-router-redux';

import Sider from './sider';

const mapStateToProps = state => ({
  location: state.router.location,
});

const mapDispatchToProps = dispatch => ({
  navigate: ({ key }) => dispatch(push(key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sider);
