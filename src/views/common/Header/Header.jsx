import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import { authSelectors } from '../../../state/auth';

import {
  getHeaderStyle,
  getAvatarStyle,
  getLogoStyle,
  getSwapStyle,
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
      <span style={getSwapStyle()}>
        <Tooltip id="tooltip-left" title="Swap Account" placement="left">
          <a href="" style={{ color: '#fff', height: '36px' }}>
            <Icon style={{ fontSize: 36 }}>swap_horizontal_circle</Icon>
          </a>
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
