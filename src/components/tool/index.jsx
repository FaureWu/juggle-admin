import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
} from 'antd';

import {
  blank,
} from 'libs/utils';

import styles from './tool.scss';

class Tool extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    type: '',
    onClick: blank,
  };

  render() {
    const {
      type,
      onClick,
    } = this.props;

    return (
      <div
        className={styles.more}
        onClick={onClick}
      >
        <Icon
          className={styles.icon}
          type={type}
        />
      </div>
    );
  }
}

export default Tool;
