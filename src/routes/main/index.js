import { connect } from 'react-redux';
import {
  push,
} from 'react-router-redux';

import {
  infoChange,
} from 'stores/user';
import Main from './main';

const mapStateToProps = state => ({
  modal: state.modal.toJS(),
});

const mapDispatchToProps = dispatch => ({
  onChange: (key, value) => dispatch(infoChange(key, value)),
  navigate: key => dispatch(push(key)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
