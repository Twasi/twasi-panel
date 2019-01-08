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
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';

import './_style.css';

const accounts = ['Larcce', 'DieserMerlin', 'mekalix', 'Spendendose'];

class AccountSwitch extends React.Component {
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
        onClose={this.handleClose}
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          <FormattedMessage id="accountswitch.switch_account" />
        </DialogTitle>
        <div>
          <List>
            <ListItem button>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: '#00aeae' }}>
                  <Icon style={{ fontSize: 36 }}>check</Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Blechkelle" />
            </ListItem>
            {accounts.map(account => (
              <ListItem
                button
                onClick={() => this.handleListItemClick(account)}
                key={account}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Icon style={{ fontSize: 36 }}>person</Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={account} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

AccountSwitch.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  classes: PropTypes.isRequired
};

export default (AccountSwitch);
