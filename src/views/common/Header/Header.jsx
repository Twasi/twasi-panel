import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './_style.css';
import { authSelectors } from '../../../state/auth';
import { appInfoSelectors } from '../../../state/appInfo';
import { AccountSwitchIcon } from '../../AccountSwitch';
import { ThemeSwitchIcon } from '../../ThemeSwitch';
import { LanguageSwitchIcon } from '../../LanguageSwitch';
import { FeedbackIcon } from '../../Feedback';
import Rank from '../Rank';
import twasilogo from '../../common/resources/twasi_flat_white.svg';

import {
  getAvatarStyle,
  getLogoStyle,
  getRankStyle,
  getLogoDescriptionStyle
} from './_style';

const Header = ({ userName, avatar, banner, selectedBannerAsHeaderValue }) => (
  <header>
    <div className="bannerHeader" style={{ backgroundImage: banner && selectedBannerAsHeaderValue ? `url(${banner})` : null }} />
    <div style={getLogoStyle()}>
      <span>
        <img src={avatar} alt="Avatar" style={getAvatarStyle()} />
        <div style={getLogoDescriptionStyle()}>
          <span>
            {userName}
            <small style={getRankStyle()}><Rank /></small>
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
      <span style={{ width: '200px' }}>
        <AccountSwitchIcon />
        <ThemeSwitchIcon />
        <LanguageSwitchIcon />
        <FeedbackIcon />
      </span>
    </div>
  </header>
);

Header.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  banner: PropTypes.string
};

Header.defaultProps = {
  userName: 'Unknown',
  avatar: 'Unknown',
  banner: 'Unknown'
};

const mapStateToProps = state => ({
  userName: authSelectors.getUser(state).displayName,
  rank: authSelectors.getUser(state).rank,
  avatar: authSelectors.getUserAvatar(state),
  banner: authSelectors.getUserBanner(state),
  selectedBannerAsHeaderValue: appInfoSelectors.getBannerAsHeader(state),
});

export default connect(mapStateToProps)(Header);
