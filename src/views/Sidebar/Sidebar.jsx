import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import find from 'lodash/fp/find';
import { throttle } from 'lodash';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import { getMenuStyle, getHeaderMenuItem, getActiveMenuItem } from './_style';

import twasiLogo from '../common/resources/twasi_anim.gif';

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
        icon: 'home',
        name: 'sidebar.status'
      },
      {
        key: 'settings',
        path: '/settings',
        icon: 'settings',
        name: 'sidebar.settings'
      },
      {
        key: 'plugins',
        path: '/plugins',
        icon: 'store',
        name: 'sidebar.plugins'
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

  handleClick(event, value) {
    const { history } = this.props;

    const { path } = find(newItem => newItem.key === value, this.items);

    history.push(path);
  }

  render() {
    const { location, intl } = this.props;

    let selectedKey = find(item => item.path === location.pathname, this.items);
    if (typeof selectedKey === 'undefined') {
      selectedKey = this.items[0].key;
    } else {
      selectedKey = selectedKey.key;
    }

    const renderItems = () =>
      this.items.map(item => (
        <MenuItem
          primaryText={intl.formatMessage({ id: item.name })}
          leftIcon={<FontIcon className="material-icons">{item.icon}</FontIcon>}
          style={{ color: '#828282', fontSize: 13 }}
          value={item.key}
          key={item.key}
          innerDivStyle={{ padding: '0px 16px 0px 52px' }}
        />
      ));

    return (
      <Paper style={getMenuStyle()} className="sidebar">
        <div style={getHeaderMenuItem()}>Hallo, name</div>
        <Menu
          onChange={this.handleClick}
          value={selectedKey}
          selectedMenuItemStyle={getActiveMenuItem()}>
          {renderItems()}
        </Menu>
      </Paper>
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
