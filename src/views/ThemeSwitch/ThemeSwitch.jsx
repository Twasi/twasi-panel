import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import storage from 'local-storage';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

import './_style.css';

const themes = [{
  name: 'Twasi Dark Blue',
  key: 'twasi-darkblue',
  backgroundColor: '#1a2035',
  paperColor: '#202940',
  cardColor: '#232f4a',
  primaryColor: '#3f51b5',
  secondaryColor: '#de6464'
}, {
  name: 'Twasi Dark',
  key: 'twasi-dark',
  backgroundColor: '#151e21',
  paperColor: '#1b292d',
  cardColor: '#162226',
  primaryColor: '#00aeae',
  secondaryColor: '#e53935'
}, {
  name: 'Dark Grey',
  key: 'dark-grey',
  backgroundColor: '#191919',
  paperColor: '#272727',
  cardColor: '#313131',
  primaryColor: '#00aeae',
  secondaryColor: '#e53935'
}, {
  name: 'BTTV Dark',
  key: 'bttv-dark',
  backgroundColor: '#0f0e11',
  paperColor: '#19171c',
  cardColor: '#232127',
  primaryColor: '#5f459a',
  secondaryColor: '#ec1313'
}, {
  name: 'Tipeee Dark',
  key: 'tipeee-dark',
  backgroundColor: '#272b37',
  paperColor: '#3b4254',
  cardColor: '#474e62',
  primaryColor: '#7885a5',
  secondaryColor: '#e53935'
}, {
  name: 'Windows 95',
  key: 'windows95',
  backgroundColor: '#008080',
  paperColor: '#bdbebd',
  cardColor: '#dbdbdb',
  primaryColor: '#000080',
  secondaryColor: '#bdbebd'
}, {
  name: 'Twasi Light',
  key: 'twasi-light',
  backgroundColor: '#e6e6e6',
  paperColor: '#fff',
  cardColor: '#f9f9f9',
  primaryColor: '#00aeae',
  secondaryColor: '#e53935',
  }, {
  name: 'Halloween (Release 31.10.2019)',
  key: 'halloween',
  backgroundColor: '#051016',
  paperColor: '#071d29',
  cardColor: '#0d2431',
  primaryColor: '#fe8000',
  secondaryColor: '#c34444',
  disabled: true
}];

class ThemeSwitch extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleListItemClick = value => {
    storage('twasi-theme', value.key);
    this.props.updateTheme(value.key);
    this.props.onClose(value);
  };

  handleBannerAsHeader = value => {
    storage('bannerAsHeader', value.target.checked);
    this.props.updateBannerAsHeader(value.target.checked);
  };

  handleComicSans = value => {
    storage('comicsans', value.target.checked);
    this.props.updateComicSans(value.target.checked);
  };

  render() {
    const { classes, onClose, selectedValue, selectedBannerAsHeaderValue, selectedComicSansValue, updateTheme, updateBannerAsHeader, updateComicSans, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="themeswitch.switch_theme" />
            </h4>
            <small>
              Hier hast du die Möglichkeit, das Aussehen des Panels für deine Bedürfnisse zu verändern.
            </small>
          </Typography>
          <br /><br />
          <Card className="pluginCard">
            <CardContent className="pluginCardContent">
              <List>
                <ListItem style={{ paddingTop: '0px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleBannerAsHeader}
                        color="primary"
                        checked={selectedBannerAsHeaderValue}
                      />
                    }
                    label={<FormattedMessage id="themeswitch.banner_as_header" />}
                  />
                </ListItem>
                <ListItem style={{ paddingTop: '0px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleComicSans}
                        color="primary"
                        checked={selectedComicSansValue}
                      />
                    }
                    label={<FormattedMessage id="themeswitch.comicsans" />}
                  />
                </ListItem>
                <Divider />
                <br />
                {themes.map(theme => (
                  <ListItem
                    button
                    onClick={() => this.handleListItemClick(theme)}
                    key={theme.key}
                    disabled={theme.disabled}
                  >
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: this.props.selectedValue === theme.key ? theme.primaryColor : '' }}>
                        <Icon style={{ fontSize: 36 }}>{this.props.selectedValue === theme.key ? 'check' : 'color_lens'}</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={theme.name} />
                    <Tooltip title={<FormattedMessage id="themeswitch.background_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.backgroundColor }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.content_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.paperColor }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.special_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.cardColor }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.primary_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.primaryColor }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.secondary_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.secondaryColor }} />
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    );
  }
}

ThemeSwitch.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  classes: PropTypes.string
};

const ThemeSwitchWrapped = (ThemeSwitch);

const mapStateToProps = state => ({
  selectedValue: appInfoSelectors.getTheme(state),
  selectedBannerAsHeaderValue: appInfoSelectors.getBannerAsHeader(state),
  selectedComicSansValue: appInfoSelectors.getComicSans(state),
});

const mapDispatchToProps = dispatch => ({
  updateTheme: name => dispatch(appInfoOperations.updateTheme(name)),
  updateBannerAsHeader: bannerAsHeader => dispatch(appInfoOperations.updateBannerAsHeader(bannerAsHeader)),
  updateComicSans: comicsans => dispatch(appInfoOperations.updateComicSans(comicsans)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitchWrapped);
