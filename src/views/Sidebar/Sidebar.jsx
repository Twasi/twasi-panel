import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import find from 'lodash/fp/find';

import { Layout, Menu, Icon } from 'antd';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

const pkgJson = require('../../../package.json');

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
      },
      {
        key: 'settings',
        path: '/settings',
        icon: 'setting',
        name: 'Settings'
      },
      {
        key: 'plugins',
        path: '/plugins',
        icon: 'api',
        name: 'Plugins'
      }
    ];

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  handleClick(item) {
    const { history } = this.props;

    const { path } = find(newItem => newItem.key === item.key, this.items);

    history.push(path);
  }

  render() {
    const { Sider } = Layout;
    const { location, serverVersion } = this.props;

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

    const versionAlign = { width: '100%', textAlign: 'center' };

    return (
      <Sider trigger={null} collapsible collapsed={false}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={this.handleClick}
        >
          {renderItems()}
        </Menu>
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            width: 200,
            height: 50,
            color: 'white'
          }}
        >
          <div style={versionAlign}>
            Twasi-panel v.{pkgJson.version} - #{window.env.BUILD_DESC}
          </div>
          <div style={versionAlign}>Twasi-core v.{serverVersion}</div>
        </div>
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
  }).isRequired,
  verifyData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  serverVersion: appInfoSelectors.getVersion(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(appInfoOperations.verifyData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);
