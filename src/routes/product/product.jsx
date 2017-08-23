import React, {
  PureComponent,
} from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
} from 'antd';

import {
  blank,
} from 'libs/utils';
import constants from 'libs/constants';
import Card from 'components/card';
import Products from 'modules/products';
import Attrs from 'modules/attrs';
import Params from 'modules/params';

class Product extends PureComponent {
  static propTypes = {
    onMount: PropTypes.func,
  };

  static defaultProps = {
    onMount: blank,
  };


  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <Card>
        <Tabs
          defaultActiveKey={Product.VIEW_TYPE.PRODUCTS}
        >
          <Tabs.TabPane
            tab="产品管理"
            key={Product.VIEW_TYPE.PRODUCTS}
          >
            <Products />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="属性管理"
            key={Product.VIEW_TYPE.ATTRS}
          >
            <Attrs />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab="参数管理"
            key={Product.VIEW_TYPE.PARAMS}
          >
            <Params />
          </Tabs.TabPane>
        </Tabs>
      </Card>
    );
  }
}

Product.VIEW_TYPE = constants([
  'PRODUCTS',
  'ATTRS',
  'PARAMS',
], 'VIEW_TYPE_');

export default Product;
