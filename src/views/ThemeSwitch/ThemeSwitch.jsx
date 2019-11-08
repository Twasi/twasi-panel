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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';
import storage from 'local-storage';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';
import { themesOperations, themesSelectors } from '../../state/themes';

import './_style.css';

const themes = [{
  name: 'Twasi Dark Blue',
  key: 'twasi-darkblue',
  backgroundColor: '#1a2035',
  paperColor: '#202940',
  cardColor: '#232f4a',
  primaryColor: '#3f51b5',
  secondaryColor: '#de6464',
  verified: true
}, {
  name: 'Twasi Dark',
  key: 'twasi-dark',
  backgroundColor: '#151e21',
  paperColor: '#1b292d',
  cardColor: '#162226',
  primaryColor: '#00aeae',
  secondaryColor: '#e53935',
  verified: true
}, {
  name: 'BTTV Dark',
  key: 'bttv-dark',
  backgroundColor: '#0f0e11',
  paperColor: '#19171c',
  cardColor: '#232127',
  primaryColor: '#5f459a',
  secondaryColor: '#ec1313',
  verified: true
}, {
  name: 'Tipeee Dark',
  key: 'tipeee-dark',
  backgroundColor: '#272b37',
  paperColor: '#3b4254',
  cardColor: '#474e62',
  primaryColor: '#7885a5',
  secondaryColor: '#e53935',
  verified: true
}, {
  name: 'Windows 95',
  key: 'windows95',
  backgroundColor: '#008080',
  paperColor: '#bdbebd',
  cardColor: '#dbdbdb',
  primaryColor: '#000080',
  secondaryColor: '#bdbebd',
  verified: true
}, {
  name: 'Halloween',
  key: 'halloween',
  backgroundColor: '#051016',
  paperColor: '#071d29',
  cardColor: '#0d2431',
  primaryColor: '#fe8000',
  secondaryColor: '#c34444',
  verified: true
}];

class ThemeSwitch extends React.Component {

  handleClose = () => {
    this.props.onClose();
  };

  handleListItemClick = value => {
    storage('twasi-theme', value);
    this.props.updateTheme(value);
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
    const { classes, onClose, selectedValue, installedthemes, selectedBannerAsHeaderValue, selectedComicSansValue, updateTheme, updateBannerAsHeader, updateComicSans, ...other } = this.props;
    return (
      <Dialog
        scroll='body'
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
                <ListItem style={{ paddingTop: '0px', paddingBottom: '23px' }}>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <RouterLink style={{ width: '100%' }} to='/themecreator' onClick={this.handleClose}>
                        <Button fullWidth color="primary" variant="contained">Theme erstellen</Button>
                      </RouterLink>
                    </Grid>
                    <Grid item xs={6}>
                      <RouterLink style={{ width: '100%' }} to='/themes' onClick={this.handleClose}>
                        <Button fullWidth color="primary" variant="contained">Themes ansehen</Button>
                      </RouterLink>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem style={{ paddingTop: '23px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleBannerAsHeader}
                        color="primary"
                        checked={selectedBannerAsHeaderValue}
                      />
                    }
                    label={<small><FormattedMessage id="themeswitch.banner_as_header" /></small>}
                  />
                </ListItem>
                <ListItem style={{ paddingTop: '0px', paddingBottom: '23px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleComicSans}
                        color="primary"
                        checked={selectedComicSansValue}
                      />
                    }
                    label={<small><FormattedMessage id="themeswitch.comicsans" /></small>}
                  />
                </ListItem>
                <Divider />
                <br />
                {themes.map(theme => (
                  <ListItem
                    button
                    onClick={() => this.handleListItemClick(theme.key)}
                    key={theme.key}
                    disabled={theme.disabled}
                  >
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: this.props.selectedValue === theme.key ? theme.primaryColor : '' }}>
                        <Icon style={{ fontSize: 36 }}>{this.props.selectedValue === theme.key ? 'check' : 'color_lens'}</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={theme.name} secondary='verified'/>
                    <Tooltip title={<FormattedMessage id="themeswitch.background_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.backgroundColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.content_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.paperColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.special_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.cardColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.primary_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.primaryColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.secondary_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: theme.secondaryColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                  </ListItem>
                ))}
                {installedthemes.length !== 0 &&
                <Divider className="marginDivider" />}
                {installedthemes.map(installedtheme => (
                  <ListItem
                    button
                    onClick={() => this.handleListItemClick(installedtheme.id)}
                    key={installedtheme.id}
                    disabled={!installedtheme.installed}
                  >
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: this.props.selectedValue === installedtheme.id ? installedtheme.theme.primaryColor : '' }}>
                        <Icon style={{ fontSize: 36 }}>{this.props.selectedValue === installedtheme.id ? 'check' : 'color_lens'}</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={(
                      <span>
                        {installedtheme.name}
                        <small> by {installedtheme.creator}</small>
                      </span>
                      )} secondary={installedtheme.approved ? 'verified' : ''}/>
                    <Tooltip title={<FormattedMessage id="themeswitch.background_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: installedtheme.theme.backgroundColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.content_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: installedtheme.theme.panelBackgroundColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.special_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: installedtheme.theme.specialContentColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.primary_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: installedtheme.theme.primaryColor, width: '30px', height: '30px' }} />
                    </Tooltip>
                    <Tooltip title={<FormattedMessage id="themeswitch.secondary_color" />} placement="top">
                      <Badge children={''} style={{ backgroundColor: installedtheme.theme.secondaryColor, width: '30px', height: '30px' }} />
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
  installedthemes: themesSelectors.getInstalledThemes(state),
  selectedValue: appInfoSelectors.getTheme(state),
  selectedBannerAsHeaderValue: appInfoSelectors.getBannerAsHeader(state),
  selectedComicSansValue: appInfoSelectors.getComicSans(state),
});

const mapDispatchToProps = dispatch => ({
  updateInstalledThemes: () => dispatch(themesOperations.loadInstalledThemes()),
  updateTheme: name => dispatch(appInfoOperations.updateTheme(name)),
  updateBannerAsHeader: bannerAsHeader => dispatch(appInfoOperations.updateBannerAsHeader(bannerAsHeader)),
  updateComicSans: comicsans => dispatch(appInfoOperations.updateComicSans(comicsans)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitchWrapped);
