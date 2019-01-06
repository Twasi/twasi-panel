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
import { FormattedMessage } from 'react-intl';
import storage from 'local-storage';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

import './_style.css';

const themes = [{
  name: 'Twasi Dark',
  key: 'twasi-dark'
}, {
  name: 'Twasi Light',
  key: 'twasi-light'
}, {
  name: 'Dark Grey',
  key: 'dark-grey'
}, {
  name: 'BTTV Dark',
  key: 'bttv-dark'
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
