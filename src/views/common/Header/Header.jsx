import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';

import './_style.css';
import { authSelectors } from '../../../state/auth';
import { AccountSwitchIcon } from '../../AccountSwitch';

import {
  getHeaderStyle,
  getAvatarStyle,
  getLogoStyle,
  getRankStyle,
  getLogoDescriptionStyle
} from './_style';

const Header = ({ userName, rank, avatar }) => (
  <header>
    <div style={getHeaderStyle()} />
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
      <span style={{ width: '150px' }}>
        <AccountSwitchIcon />
        <Tooltip title="Feedback geben" placement="left">
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
