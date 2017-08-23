import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Popconfirm,
} from 'antd';
import classNames from 'classnames';

import {
  blank,
} from 'libs/utils';
import constants from 'libs/constants';
import styles from './operater.scss';

const OPERATER = constants([
  'ADD',
  'EDIT',
  'COPY',
  'DELETE',
  'CONFIRM',
  'CANCEL',
  'PEDDING',
], 'OPERATER_');

const types = {
  [OPERATER.ADD]: 'plus-square-o',
  [OPERATER.EDIT]: 'edit',
  [OPERATER.COPY]: 'copy',
  [OPERATER.DELETE]: 'delete',
  [OPERATER.CONFIRM]: 'check-square-o',
  [OPERATER.CANCEL]: 'close-square-o',
  [OPERATER.PEDDING]: 'loading',
};

class Operater extends PureComponent {
  static propTypes = {
    operaters: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.oneOf(Object.keys(types)),
        PropTypes.shape({
          type: PropTypes.oneOf(Object.keys(types)),
          danger: PropTypes.bool,
          confirm: PropTypes.string,
        }),
      ]),
    ),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    operaters: [],
    onClick: blank,
  };

  operater = (operater) => {
    if (typeof operater === 'string') {
      return this.renderOperater({ type: operater }, this.click);
    } else if (operater.confirm) {
      return this.renderOperaterWithConfirm(operater, this.click);
    } else if (operater.danger) {
      return this.renderOperater(operater, this.click);
    }

    return this.renderOperater(operater);
  };

  click = type => this.props.onClick(type);

  renderOperater = ({
    type,
    danger,
  }, onClick) => (
    <span
      key={type}
      className={classNames(styles.icon, {
        [styles.danger]: danger,
      })}
      onClick={() => onClick(type)}
    >
      <Icon type={types[type]} />
    </span>
  );

  renderOperaterWithConfirm = ({
    type,
    danger,
    confirm,
  }, onClick) => (
    <Popconfirm
      key={type}
      title={confirm}
      placement="left"
      onConfirm={() => onClick(type)}
    >{this.renderOperater({ type, danger }, blank)}</Popconfirm>
  );

  render() {
    const {
      operaters,
    } = this.props;

    return (
      <div className={styles.operater}>
        {operaters.map(operater => this.operater(operater))}
      </div>
    );
  }
}

Operater.OPERATER = OPERATER;

export default Operater;
