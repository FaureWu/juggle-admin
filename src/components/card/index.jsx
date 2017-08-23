import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Card as ACard,
} from 'antd';

import styles from './card.scss';

class Card extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.element,
        PropTypes.string,
      ),
      PropTypes.element,
      PropTypes.string,
    ]),
  };

  static defaultProps = {
    className: undefined,
    title: undefined,
    extra: undefined,
    children: undefined,
  };

  render() {
    const {
      className,
      title,
      extra,
      children,
    } = this.props;

    return (
      <ACard
        className={classNames(styles.card, className)}
        title={title}
        extra={extra}
      >{children}</ACard>
    );
  }
}

export default Card;
