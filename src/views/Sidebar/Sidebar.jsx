import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import find from 'lodash/fp/find';

import { Layout, Menu, Icon } from 'antd';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.items = [
      {
        key: 'overview',
        path: '/',
        icon: 'home',
        name: 'Overview'
      },
      {
        key: 'status',
        path: '/status',
        icon: 'home',
        name: 'Status'
      }
    ];

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    const { history } = this.props;

    const { path } = find(newItem => newItem.key === item.key, this.items);

    history.push(path);
  }

  render() {
    const { Sider } = Layout;
    const { location } = this.props;

    let selectedKey = find(item => item.path === location.pathname, this.items);
    if (typeof selectedKey === 'undefined') {
      selectedKey = this.items[0].key;
    } else {
      selectedKey = selectedKey.key;
    }

    const renderItems = () =>
      this.items.map(item => (
        <Menu.Item key={item.key}>
          <Icon type={item.icon} />
          <span>{item.name}</span>
        </Menu.Item>
      ));

    return (
      <Sider trigger={null} collapsible collapsed={false}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} onClick={this.handleClick}>
          {renderItems()}
        </Menu>
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(Sidebar);
