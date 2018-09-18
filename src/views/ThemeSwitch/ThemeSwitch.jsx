import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { FormattedMessage } from 'react-intl';

import './_style.css';

const themes = ['Dark Grey', 'Light', 'Torben´s Special Dark Theme'];
const styles = {
  paper: {
    borderRadius: 0,
    borderTop: '5px solid #00aeae'
  }
};

class ThemeSwitch extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
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
            <ListItem button>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: '#00aeae' }}>
                  <Icon style={{ fontSize: 36 }}>check</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Dark Twasi" />
            </ListItem>
            {themes.map(theme => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(theme)}
                key={theme}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Icon style={{ fontSize: 36 }}>color_lens</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={theme} />
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
  classes: PropTypes.isRequired
};

const ThemeSwitchWrapped = withStyles(styles)(ThemeSwitch);

export default withStyles(styles)(ThemeSwitchWrapped);
