import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './_style.css';
import { authSelectors } from '../../../state/auth';
import { appInfoSelectors } from '../../../state/appInfo';
import { StatusIcon } from '../../Status';
import { AccountSwitchIcon } from '../../AccountSwitch';
import { ThemeSwitchIcon } from '../../ThemeSwitch';
import { LanguageSwitchIcon } from '../../LanguageSwitch';
//import { FeedbackIcon } from '../../Feedback';
import Rank from '../Rank';
import Logo from '../Logo/Logo';

import {
  getAvatarStyle,
  getLogoStyle,
  getRankStyle,
  getLogoDescriptionStyle
} from './_style';

const Header = ({ userName, avatar, banner, selectedBannerAsHeaderValue, isSetUp }) => (
  <header>
    <div className="bannerHeaderTopBar" />
    {isSetUp && <div className="bannerHeader" style={{ opacity: banner && selectedBannerAsHeaderValue ? '0.4' : '1', backgroundImage: banner && selectedBannerAsHeaderValue ? `url(${banner})` : null }} />}
    <Grid container spacing={4}>
      <Grid item xs={4}>
        {isSetUp &&
        <div style={getLogoStyle()}>
          <span>
            {avatar && <img src={avatar} alt="Avatar" className="avatarStyle" style={getAvatarStyle()} />}
            <div style={getLogoDescriptionStyle()}>
              <span>
                <Typography color="inherit" className="userNameStyle">{userName}</Typography>
                <Typography color="inherit"><small className="rankNameStyle" style={getRankStyle()}><Rank /></small></Typography>
              </span>
            </div>
          </span>
        </div>
        }
      </Grid>
      <Grid style={{ paddingTop: '10px' }} item xs={4}>
        <div style={getLogoStyle()}>
          <span className="text_logo_wrapper" style={{ marginLeft: 'auto', marginRight: 'auto', width: '150px' }}>
            <div className="text_logo">
              <Logo />
            </div>
          </span>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div style={{ paddingTop: '5px' }}>
          {isSetUp &&<AccountSwitchIcon />}
          <ThemeSwitchIcon />
          <LanguageSwitchIcon />
          {isSetUp &&<StatusIcon />}
          {/* isSetUp && <FeedbackIcon /> */}
        </div>
      </Grid>
    </Grid>
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
  isSetUp: authSelectors.isSetUp(state),
  userName: authSelectors.getUser(state).displayName,
  rank: authSelectors.getUser(state).rank,
  avatar: authSelectors.getUserAvatar(state),
  banner: authSelectors.getUserBanner(state),
  selectedBannerAsHeaderValue: appInfoSelectors.getBannerAsHeader(state),
});

export default connect(mapStateToProps)(Header);
