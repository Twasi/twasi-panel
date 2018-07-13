import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
// import PersonIcon from '@material-ui/icons/Person';
// import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

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
      <Dialog onClose={this.handleClose} {...other}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div>
          <List>
            {emails.map(email => (
              <ListItem button onClick={() => this.handleListItemClick(email)} key={email}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <Icon
                      style={{ fontSize: 36 }}
                    >
                    person
                    </Icon>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItem>
            ))}
            <ListItem button onClick={() => this.handleListItemClick('addAccount')}>
              <ListItemAvatar>
                <Avatar>
                  <Icon
                    style={{ fontSize: 36 }}
                  >
                  add
                  </Icon>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="add account" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    );
  }
}

AccountSwitch.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string
};

const AccountSwitchWrapped = withStyles(styles)(AccountSwitch);

export default AccountSwitchWrapped;
