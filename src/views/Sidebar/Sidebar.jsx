import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import find from 'lodash/fp/find';
import { throttle } from 'lodash';

import { Layout, Menu, Icon } from 'antd';
import './_style.css';

import twasiLogo from '../common/resources/twasi_anim_dark.gif';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.items = [
      {
        key: 'overview',
        path: '/',
        icon: 'home',
        name: 'sidebar.overview'
      },
      {
        key: 'status',
        path: '/status',
        icon: 'info-circle-o',
        name: 'sidebar.status'
      },
      {
        key: 'settings',
        path: '/settings',
        icon: 'setting',
        name: 'sidebar.settings'
      },
      {
        key: 'plugins',
        path: '/plugins',
        icon: 'api',
        name: 'sidebar.plugins'
      },
      {
        key: 'commands',
        path: '/commands',
        icon: 'exclamation-circle-o',
        name: 'sidebar.commands'
      },
      {
        key: 'songrequests',
        path: '/songrequests',
        icon: 'play-circle-o',
        name: 'sidebar.songrequests'
      }
    ];

    this.handleClick = this.handleClick.bind(this);

    this.resetAnimation = throttle(
      () => {
        this.LogoDOM.src = this.Logo.src;
      },
      2500,
      { trailing: false }
    );
  }

  componentWillMount() {
    this.Logo = new Image();
    this.Logo.src = twasiLogo;
  }

  handleClick(item) {
    const { history } = this.props;

    const { path } = find(newItem => newItem.key === item.key, this.items);

    history.push(path);
    this.setState({});
  }

  render() {
    const { Sider } = Layout;
    const { location, intl } = this.props;

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
          <span>{intl.formatMessage({ id: item.name })}</span>
        </Menu.Item>
      ));

    return (
      <Sider trigger={null} collapsible collapsed={false}>
        <div
          onMouseOver={this.resetAnimation}
          className="logo"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 30
          }}
        >
          <img
            ref={elem => {
              this.LogoDOM = elem;
            }}
            alt="Twasi Logo"
            src={this.Logo.src}
            style={{ height: 40 }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={this.handleClick}
        >
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
  }).isRequired,
  intl: intlShape
};

export default injectIntl(withRouter(Sidebar));
