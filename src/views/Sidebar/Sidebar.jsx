import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import find from 'lodash/fp/find';
import { throttle } from 'lodash';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { authSelectors } from '../../state/auth';
import { getMenuStyle, getHeaderMenuItem, getActiveMenuItem } from './_style';

import twasiLogo from '../common/resources/twasi_anim_dark.gif';
import './_style.css';

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
        icon: 'info',
        name: 'sidebar.status'
      },
      {
        key: 'profile',
        path: '/profile',
        icon: 'account_box',
        name: 'sidebar.profile'
      },
      {
        key: 'plugins',
        path: '/plugins',
        icon: 'store',
        name: 'sidebar.plugins'
      },
      {
        key: 'commands',
        path: '/commands',
        icon: 'code',
        name: 'sidebar.commands'
      },
      {
        key: 'songrequests',
        path: '/songrequests',
        icon: 'library_music',
        name: 'sidebar.songrequests'
      },
      {
        key: 'urlshortener',
        path: '/urlshortener',
        icon: 'link',
        name: 'sidebar.urlshortener'
      },
      {
        key: 'fakechat',
        path: '/fakechat',
        icon: 'vertical_split',
        name: 'sidebar.fakechat'
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
    this.setState({});
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
          leftIcon={<i className="material-icons">{item.icon}</i>}
          style={{ color: '#828282', fontSize: 13 }}
          value={item.key}
          key={item.key}
          innerDivStyle={{ padding: '0px 16px 0px 52px' }}
        />
      ));

    return (
      <div>
        <Paper style={getMenuStyle()} className="sidebar">
          <div style={getHeaderMenuItem()}>
            <FormattedMessage id="sidebar.navigation_headline" />
          </div>
          <Menu
            onChange={this.handleClick}
            value={selectedKey}
            selectedMenuItemStyle={getActiveMenuItem()}
            className="Sidebar"
          >
            {renderItems()}
          </Menu>
        </Paper>
        <Paper style={getMenuStyle()} className="sidebar sidebarSecondary">
          <Menu
            value={selectedKey}
            selectedMenuItemStyle={getActiveMenuItem()}
            className="Sidebar"
          >
            <MenuItem
              primaryText={intl.formatMessage({ id: 'sidebar.docs' })}
              leftIcon={<i className="material-icons">language</i>}
              style={{ color: '#828282', fontSize: 13 }}
              innerDivStyle={{ padding: '0px 16px 0px 52px' }}
              onClick={() => window.open('https://docs.twasi.net', '_blank')}
            />
            <MenuItem
              primaryText={intl.formatMessage({ id: 'sidebar.logout' })}
              leftIcon={<i className="material-icons">keyboard_return</i>}
              style={{ color: '#828282', fontSize: 13 }}
              innerDivStyle={{ padding: '0px 16px 0px 52px' }}
              onClick={() => {
                localStorage.clear();
                window.location = 'https://twasi.net';
              }}
            />
          </Menu>
        </Paper>
      </div>
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
  intl: intlShape,
  userName: PropTypes.string
};

const mapStateToProps = state => ({
  userName: authSelectors.getUser(state).name
});

export default injectIntl(withRouter(connect(mapStateToProps)(Sidebar)));
