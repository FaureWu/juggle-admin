import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Tag,
} from 'antd';

import styles from './expand.scss';

class Expand extends PureComponent {
  static propTypes = {
    tags: PropTypes.arrayOf(
      PropTypes.string,
      PropTypes.number,
    ),
    picture: PropTypes.string,
    tagNames: PropTypes.object,
  };

  static defaultProps = {
    tags: [],
    picture: '',
    tagNames: {},
  };

  render() {
    const {
      tags,
      picture,
      tagNames,
    } = this.props;

    return (
      <div className={styles.expand}>
        <img className={styles.picture} src={picture} alt={picture} />
        <div>
          {tags.map(tag => (
            <Tag key={tag}>{tagNames[tag]}</Tag>
          ))}
        </div>
      </div>
    );
  }
}

export default Expand;
