import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';

import styles from './value.scss';

class Value extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static defaultProps = {
    name: '',
    value: '',
  };

  render() {
    const {
      name,
      value,
    } = this.props;

    return (
      <div className={styles.content}>
        <span className={styles.name}>{name}</span>
        <span className={styles.value}>{value}</span>
      </div>
    );
  }
}

export default Value;
