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
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import { authSelectors } from '../../state/auth';
import { pluginsSelectors, pluginsOperations } from '../../state/plugins';
import { getMenuStyle } from './_style';

import twasiLogo from '../common/resources/twasi_anim_dark.gif';
import './_style.css';

class Sidebar extends Component {

  componentDidMount() {
    const { verifyData, updateAllPlugins } = this.props;
    verifyData();
    updateAllPlugins();
  }

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
        shown: 'none'
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
        key: 'variables',
        path: '/variables',
        icon: 'settings_ethernet',
        name: 'sidebar.variables',
        shown: 'plugins/variablen'
      },
      {
        key: 'timedmessages',
        path: '/timers',
        icon: 'alarm',
        name: 'sidebar.timers',
        shown: 'plugins/timedmessages'
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
        key: 'quotes',
        path: '/quotes',
        icon: 'format_quote',
        name: 'sidebar.quotes',
        shown: 'plugins/quotes'
      },
      {
        key: 'chatfilter',
        path: '/chatfilter',
        icon: 'policy',
        name: 'sidebar.chatfilter',
        shown: 'none'
      },
      {
        key: 'urlshortener',
        path: '/urlshortener',
        icon: 'link',
        name: 'sidebar.urlshortener',
        shown: 'none'
      },
      {
        key: 'support',
        path: '/support',
        icon: 'headset_mic',
        name: 'sidebar.support',
        shown: 'none'
      },
      {
        key: 'manager',
        path: '/manager',
        icon: 'group',
        name: 'sidebar.user_manager',
        shown: 'admin'
      }
    ];

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

  handleChange = () => {
    this.setState({ checked: !this.state.checked });
  }

  handleClick = (event, value) => {
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
          } else if (item.shown === 'none') {
            return false;
          }
          return plugins.filter(p => p.isInstalled && item.shown === `plugins/${p.name.toLowerCase()}`).length !== 0;
        })
        .map(item => (
          <MenuItem
            style={{ fontSize: 13, padding: '10px 15px 10px 15px' }}
            value={item.key}
            key={item.key}
            selected={selectedKey === item.key}
            onClick={event => this.handleClick(event, item.key)}
          >
            <i className="material-icons" style={{ marginRight: '15px' }}>{item.icon}</i>
            {intl.formatMessage({ id: item.name })}
          </MenuItem>
        ));
    const { rank } = this.props;
    return (
      <div className="siteSidebar" style={checked ? {} : { width: 87 }}>
        <Paper style={getMenuStyle()} className="sidebar">
          <Hidden mdDown>
            <div className="headerMenuItem">
              {checked ? <Typography component="span" color="inherit" className="headerMenuTitle"><FormattedMessage id="sidebar.navigation_headline" /></Typography> : ''}
              <Fab onClick={this.handleChange} className="navigationFab" size="small" aria-label="Collapse">
                <Icon style={{ color: '#ffffff' }}>
                  {checked ? 'arrow_back' : 'arrow_forward'}
                </Icon>
              </Fab>
            </div>
          </Hidden>
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
              style={{ fontSize: 13, padding: '10px 15px 10px 15px' }}
              onClick={() => window.open('https://docs.twasi.net', '_blank')}
            >
              <i className="material-icons" style={{ marginRight: '15px' }}>language</i>
              {intl.formatMessage({ id: 'sidebar.docs' })}
            </MenuItem>
            <MenuItem
              style={{ fontSize: 13, padding: '10px 15px 10px 15px' }}
              value="support"
              key="support"
              selected={selectedKey === 'support'}
              onClick={event => this.handleClick(event, 'support')}
            >
              <Badge color="secondary" variant="dot">
                <i className="material-icons" style={{ marginRight: '15px' }}>headset_mic</i>
                {intl.formatMessage({ id: 'sidebar.support' })}
              </Badge>
            </MenuItem>
            {rank === "TEAM" &&
            <MenuItem
              style={{ fontSize: 13, padding: '10px 15px 10px 15px' }}
              value="user_manager"
              key="user_manager"
              selected={selectedKey === 'manager'}
              onClick={event => this.handleClick(event, 'manager')}
            >
              <i className="material-icons" style={{ marginRight: '15px' }}>group</i>
              {intl.formatMessage({ id: 'sidebar.user_manager' })}
            </MenuItem>}
            <MenuItem
              style={{ fontSize: 13, padding: '10px 15px 10px 15px' }}
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
  plugins: PropTypes.arrayOf(PropTypes.shape({}))
};

const mapStateToProps = state => ({
  userName: authSelectors.getUser(state).name,
  plugins: pluginsSelectors.getAllPlugins(state),
  rank: authSelectors.getUser(state).rank
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(pluginsOperations.verifyData()),
  updateAllPlugins: () => dispatch(pluginsOperations.loadAllData())
});

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar)));
