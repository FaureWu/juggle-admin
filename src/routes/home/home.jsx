import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

class Home extends PureComponent {
  static propTypes = {
    info: PropTypes.shape({
      name: PropTypes.string,
      password: PropTypes.string,
      remember: PropTypes.bool,
    }),
  };

  static defaultProps = {
    info: {
      name: '',
      password: '',
      remember: false,
    },
  };

  render() {
    const {
      info,
    } = this.props;

    return (
      <h1>
        当前登陆账号：
        <strong>{info.name}</strong>
      </h1>
    );
  }
}

export default Home;
