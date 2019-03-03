import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import find from 'lodash/fp/find';
import { throttle } from 'lodash';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

import { authSelectors } from '../../state/auth';
import { pluginsSelectors } from '../../state/plugins';
import { getMenuStyle } from './_style';

import twasiLogo from '../common/resources/twasi_anim_dark.gif';
import './_style.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: true
    };

    this.items = [
      {
        key: 'overview',
        path: '/',
        icon: 'home',
        name: 'sidebar.overview',
        shown: 'all'
      },
      {
        key: 'status',
        path: '/status',
        icon: 'power',
        name: 'sidebar.status',
        shown: 'all'
      },
      {
        key: 'profile',
        path: '/profile',
        icon: 'account_box',
        name: 'sidebar.profile',
        shown: 'all'
      },
      {
        key: 'mods',
        path: '/mods',
        icon: 'people',
        name: 'sidebar.mods',
        shown: 'all'
      },
      {
        key: 'plugins',
        path: '/plugins',
        icon: 'store',
        name: 'sidebar.plugins',
        shown: 'all'
      },
      {
        key: 'commands',
        path: '/commands',
        icon: 'code',
        name: 'sidebar.commands',
        shown: 'plugins/commands'
      },
      {
        key: 'timers',
        path: '/timers',
        icon: 'alarm',
        name: 'sidebar.timers',
        shown: 'all'
      },
      {
        key: 'songrequests',
        path: '/songrequests',
        icon: 'library_music',
        name: 'sidebar.songrequests',
        shown: 'plugins/songrequest'
      },
      {
        key: 'giveaways',
        path: '/giveaways',
        icon: 'redeem',
        name: 'sidebar.giveaways',
        shown: 'plugins/giveaways'
      },
      {
        key: 'votings',
        path: '/votings',
        icon: 'notes',
        name: 'sidebar.votings',
        shown: 'plugins/votings'
      },
      {
        key: 'urlshortener',
        path: '/urlshortener',
        icon: 'link',
        name: 'sidebar.urlshortener',
        shown: 'all'
      }
    ];

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

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

  handleChange() {
    this.setState({ checked: !this.state.checked });
  }

  handleClick(event, value) {
    const { history } = this.props;

    const { path } = find(newItem => newItem.key === value, this.items);

    history.push(path);
    this.setState({});
  }

  render() {
    const { checked } = this.state;
    const { location, intl, plugins } = this.props;

    let selectedKey = find(item => item.path === location.pathname, this.items);
    if (typeof selectedKey === 'undefined') {
      selectedKey = this.items[0].key;
    } else {
      selectedKey = selectedKey.key;
    }

    const renderItems = () =>
      this.items
        .filter(item => {
          if (item.shown === 'all') {
            return true;
          }
          return plugins.filter(p => p.isInstalled && item.shown === `plugins/${p.name.toLowerCase()}`).length !== 0;
        })
        .map(item => (
          <MenuItem
            style={{ fontSize: 13 }}
            value={item.key}
            key={item.key}
            selected={item.key === selectedKey}
            innerDivStyle={{ padding: '0px 16px 0px 52px' }}
            onClick={event => this.handleClick(event, item.key)}
          >
            <i className="material-icons" style={{ marginRight: '15px' }}>{item.icon}</i>
            {intl.formatMessage({ id: item.name })}
          </MenuItem>
        ));

    return (
      <div style={checked ? {} : { width: 87 }}>
        <Hidden mdDown>
          <Paper style={getMenuStyle()} className="sidebar">
            <div className="headerMenuItem">
              {checked ? <FormattedMessage id="sidebar.navigation_headline" /> : ''}
              <Fab onClick={this.handleChange} size="small" style={{ float: 'right', margin: '5px 0px 0px 5px', boxShadow: 'none', backgroundColor: 'transparent', borderRadius: '0px' }} aria-label="Collapse">
                <Icon style={{ color: '#ffffff' }}>
                  {checked ? 'arrow_back' : 'arrow_forward'}
                </Icon>
              </Fab>
            </div>
            <MenuList
              className="Sidebar"
            >
              {renderItems()}
            </MenuList>
          </Paper>
          <Paper style={getMenuStyle()} className="sidebar sidebarSecondary">
            <MenuList
              className="Sidebar"
            >
              <MenuItem
                style={{ fontSize: 13 }}
                innerDivStyle={{ padding: '0px 16px 0px 52px' }}
                onClick={() => window.open('https://docs.twasi.net', '_blank')}
              >
                <i className="material-icons" style={{ marginRight: '15px' }}>language</i>
                {intl.formatMessage({ id: 'sidebar.docs' })}
              </MenuItem>
              <MenuItem
                style={{ fontSize: 13 }}
                innerDivStyle={{ padding: '0px 16px 0px 52px' }}
                value="support"
                key="support"
                selected={selectedKey === 'support'}
                onClick={event => this.handleClick(event, 'support')}
              >
                <i className="material-icons" style={{ marginRight: '15px' }}>headset_mic</i>
                {intl.formatMessage({ id: 'sidebar.support' })}
              </MenuItem>
              <MenuItem
                style={{ fontSize: 13 }}
                innerDivStyle={{ padding: '0px 16px 0px 52px' }}
                onClick={() => {
                  localStorage.clear();
                  window.location = 'https://twasi.net';
                }}
              >
                <i className="material-icons" style={{ marginRight: '15px' }}>keyboard_return</i>
                {intl.formatMessage({ id: 'sidebar.logout' })}
              </MenuItem>
            </MenuList>
          </Paper>
        </Hidden>
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
  userName: PropTypes.string,
  plugins: PropTypes.shape({})
};

const mapStateToProps = state => ({
  userName: authSelectors.getUser(state).name,
  plugins: pluginsSelectors.getPlugins(state)
});

export default injectIntl(withRouter(connect(mapStateToProps)(Sidebar)));
