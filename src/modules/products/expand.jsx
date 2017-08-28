import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Collapse,
  Button,
} from 'antd';

import Value from 'components/value';

import styles from './expand.scss';

class Expand extends PureComponent {
  static propTypes = {
    picture: PropTypes.string,
    attrs: PropTypes.object,
    params: PropTypes.object,
    url: PropTypes.string,
    attrNames: PropTypes.object,
    paramNames: PropTypes.object,
  };

  static defaultProps = {
    picture: '',
    attrs: {},
    params: {},
    attrNames: {},
    paramNames: {},
    url: '',
  };

  render() {
    const {
      picture,
      attrs,
      params,
      url,
      attrNames,
      paramNames,
    } = this.props;

    return (
      <div className={styles.expand}>
        <img className={styles.picture} src={picture} alt={picture} />
        <div className={styles.shop}>
          <Value name="购买链接" value={url} />
          <Button>查看详情</Button>
        </div>
        <Collapse
          bordered={false}
          defaultActiveKey={[]}
          className={styles.collapse}
        >
          <Collapse.Panel
            key="attrs"
            header="属性"
            className={styles.panel}
          >
            {Object.keys(attrs).map(key => (
              <Value key={key} name={attrNames[key]} value={attrs[key]} />
            ))}
          </Collapse.Panel>
          <Collapse.Panel
            key="params"
            header="参数"
            className={styles.panel}
          >
            {Object.keys(params).map(key => (
              <Value key={key} name={paramNames[key]} value={params[key]} />
            ))}
          </Collapse.Panel>
        </Collapse>
      </div>
    );
  }
}

export default Expand;
