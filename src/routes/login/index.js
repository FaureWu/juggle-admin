import { connect } from 'react-redux';

import {
  infoChange,
  validateChange,
  login,
} from 'stores/user';
import Login from './login';

const mapStateToProps = state => ({
  info: state.user.info.toJS(),
  validate: state.user.validate.toJS(),
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  onChange: data => dispatch(infoChange(data)),
  onValidateChange: errors => dispatch(validateChange(errors)),
  onLogin: () => dispatch(login()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
