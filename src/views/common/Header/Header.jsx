import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { authSelectors } from '../../../state/auth';

import {
  getHeaderStyle,
  getAvatarStyle,
  getLogoStyle,
  getRankStyle,
  getLogoDescriptionStyle
} from './_style';

const Header = ({ userName, rank }) => (
  <header>
    <div style={getHeaderStyle()} />
    <div style={getLogoStyle()}>
      <img
        src="https://static-cdn.jtvnw.net/jtv_user_pictures/larcce-profile_image-be973d0efe0837bd-300x300.png"
        alt=""
        style={getAvatarStyle()}
      />
      <div style={getLogoDescriptionStyle()}>
        <span>
          {userName}
          <small style={getRankStyle()}>{rank}</small>
        </span>
      </div>
    </div>
  </header>
);

Header.propTypes = {
  userName: PropTypes.string,
  rank: PropTypes.string
};

Header.defaultProps = {
  userName: 'Unknown',
  rank: 'Unknown'
};

const mapStateToProps = state => ({
  userName: authSelectors.getUser(state).name,
  rank: authSelectors.getUser(state).rank
});

export default connect(mapStateToProps)(Header);
