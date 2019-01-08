import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import { FormattedMessage } from 'react-intl';
import storage from 'local-storage';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

import './_style.css';

const themes = [{
  name: 'Twasi Dark',
  key: 'twasi-dark',
  backgroundColor: '#151e21',
  paperColor: '#1b292d',
  cardColor: '#162226',
  primaryColor: '#00aeae',
  secondaryColor: '#e53935'
}, {
  name: 'Twasi Light',
  key: 'twasi-light',
  backgroundColor: '#e6e6e6',
  paperColor: '#fff',
  cardColor: '#f9f9f9',
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
}];
const styles = {
  paper: {
    borderRadius: 0,
    borderTop: '5px solid #00aeae'
  }
};

class ThemeSwitch extends React.Component {
  handleClose = () => {
    this.props.onClose();
  };

  handleListItemClick = value => {
    storage('twasi-theme', value.key);
    this.props.updateTheme(value.key);
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        classes={{
          paper: classes.paper
        }}
        onClose={this.handleClose}
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          <FormattedMessage id="themeswitch.switch_theme" />
        </DialogTitle>
        <div>
          <List>
            <Divider />
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value="bannerAsHeader"
                  />
                }
                label="Twitch Banner als Header nutzen"
              />
            </ListItem>
            <Divider />
            {themes.map(theme => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(theme)}
                key={theme}
              >
                <ListItemAvatar>
                  <Avatar style={{ backgroundColor: this.props.selectedValue === theme.key ? '#00aeae' : '' }}>
                    <Icon style={{ fontSize: 36 }}>{this.props.selectedValue === theme.key ? 'check' : 'color_lens'}</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={theme.name} />
                  <Tooltip title="Hintergrund" placement="top">
                    <Badge style={{ backgroundColor: theme.backgroundColor }} />
                  </Tooltip>
                  <Tooltip title="Inhalts Boxen" placement="top">
                    <Badge style={{ backgroundColor: theme.paperColor }} />
                  </Tooltip>
                  <Tooltip title="Besondere Inhalte" placement="top">
                    <Badge style={{ backgroundColor: theme.cardColor }} />
                  </Tooltip>
                  <Tooltip title="Primärfarbe" placement="top">
                    <Badge style={{ backgroundColor: theme.primaryColor }} />
                  </Tooltip>
                  <Tooltip title="Sekundärfarbe" placement="top">
                    <Badge style={{ backgroundColor: theme.secondaryColor }} />
                  </Tooltip>
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

ThemeSwitch.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  classes: PropTypes.isRequired,
  updateTheme: PropTypes.func.isRequired
};

const ThemeSwitchWrapped = withStyles(styles)(ThemeSwitch);

const mapStateToProps = state => ({
  selectedValue: appInfoSelectors.getTheme(state)
});

const mapDispatchToProps = dispatch => ({
  updateTheme: name => dispatch(appInfoOperations.updateTheme(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitchWrapped);
