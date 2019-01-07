import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';

import './_style.css';
import { authSelectors } from '../../../state/auth';
import { AccountSwitchIcon } from '../../AccountSwitch';
import { ThemeSwitchIcon } from '../../ThemeSwitch';
import twasilogo from '../../common/resources/twasi_flat_white.svg';

import {
  getHeaderStyle,
  getAvatarStyle,
  getLogoStyle,
  getRankStyle,
  getLogoDescriptionStyle
} from './_style';

const Header = ({ userName, rank, avatar }) => (
  <header>
    <div className="bannerHeader" />
    <div style={getLogoStyle()}>
      <span>
        <img src={avatar} alt="Avatar" style={getAvatarStyle()} />
        <div style={getLogoDescriptionStyle()}>
          <span>
            {userName}
            <small style={getRankStyle()}>{rank}</small>
          </span>
        </div>
      </span>
      <span style={{ marginLeft: 'auto', marginRight: 'auto', width: '150px' }}>
        <img
          className="twasiLogo"
          src={twasilogo}
          alt="twasi-logo"
        />
      </span>
      <span style={{ width: '150px' }}>
        <AccountSwitchIcon />
        <ThemeSwitchIcon />
        <Tooltip title="Feedback geben" placement="bottom">
          <Icon
            className="feedbackIcon"
            style={{ fontSize: 36, float: 'right' }}
          >
            favorite_border
          </Icon>
        </Tooltip>
      </span>
    </div>
  </header>
);

Header.propTypes = {
  userName: PropTypes.string,
  rank: PropTypes.string,
  avatar: PropTypes.string
};

Header.defaultProps = {
  userName: 'Unknown',
  rank: 'Unknown',
  avatar: 'Unknown'
};

const mapStateToProps = state => ({
  userName: authSelectors.getUser(state).displayName,
  rank: authSelectors.getUser(state).rank,
  avatar: authSelectors.getUserAvatar(state)
});

export default connect(mapStateToProps)(Header);
