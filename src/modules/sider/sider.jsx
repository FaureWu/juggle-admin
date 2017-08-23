import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import Menu from 'modules/menu';
import {
  rootRoute,
} from 'routes';
import logo from 'assets/logo.svg';
import styles from './sider.scss';

class Sider extends PureComponent {
  static propTypes = {
    collapsed: PropTypes.bool,
    navigate: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  static defaultProps = {
    collapsed: false,
  };

  render() {
    const {
      collapsed,
      navigate,
      location,
    } = this.props;

    return (
      <div className={styles.sider}>
        <div className={styles.logo} onClick={() => navigate({ key: rootRoute.path })}>
          <img src={logo} alt="logo" />
        </div>
        <Menu
          collapsed={collapsed}
          selectedKeys={[location.pathname]}
        />
      </div>
    );
  }
}

export default Sider;
