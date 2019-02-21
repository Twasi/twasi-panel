import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import { FormattedMessage } from 'react-intl';

import { authSelectors } from '../../state/auth';
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
    const { classes, userName, avatar, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          <FormattedMessage id="accountswitch.switch_account" />
        </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormattedMessage id="accountswitch.subheadline" />
            </DialogContentText>
            <br />
            <Card className="pluginCard">
              <CardContent style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                <List style={{ padding: '0px' }}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar className="accountSwitchAvatar">
                        <Icon style={{ fontSize: 36, position: 'absolute' }}>check</Icon>
                        <img width="45px" height="45px" src={avatar} alt="Avatar" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={userName} />
                    <Chip label="Eigener Account" color="secondary" style={{ marginRight: '5px' }} />
                    <Chip label="Vollzugriff" color="primary" />
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
                      <Chip label="Vollzugriff" color="primary" />
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

AccountSwitch.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  classes: PropTypes.isRequired
};

AccountSwitch.defaultProps = {
  userName: 'Unknown',
  avatar: 'Unknown'
};

const mapStateToProps = state => ({
  userName: authSelectors.getUser(state).displayName,
  avatar: authSelectors.getUserAvatar(state)
});

export default connect(mapStateToProps)(AccountSwitch);
