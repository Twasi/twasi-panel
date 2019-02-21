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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
          <DialogContent>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="accountswitch.switch_account" />
            </h4>
            <small>
              <FormattedMessage id="accountswitch.subheadline" />
            </small>
            <br /><br />
            <Card className="pluginCard">
              <CardContent style={{ paddingTop: '15px', paddingBottom: '15px', marginBottom: '15px' }}>
                <List style={{ padding: '0px' }}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar className="accountSwitchAvatar">
                        <Icon style={{ fontSize: 36, position: 'absolute' }}>check</Icon>
                        <img width="45px" height="45px" src={avatar} alt="Avatar" />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={userName} />
                    <Chip label="Vollzugriff" color="primary" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
            <Card className="pluginCard">
              <CardContent style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                <List style={{ padding: '0px' }}>
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
                      <Tooltip
                        placement="right"
                        title={
                          <React.Fragment>
                            <Chip
                              color="primary"
                              icon={<Icon>add</Icon>}
                              label="Kann Moderatoren hinzufügen"
                            />
                            <Chip
                              color="primary"
                              style={{ marginTop: '5px' }}
                              icon={<Icon>remove</Icon>}
                              label="Kann Moderatoren entfernen"
                            />
                            <Chip
                              color="primary"
                              style={{ marginTop: '5px' }}
                              icon={<Icon>gamepad</Icon>}
                              label="Kann Titel und Kategorie ändern"
                            />
                            <Chip
                              color="primary"
                              style={{ marginTop: '5px' }}
                              icon={<Icon>code</Icon>}
                              label="Kann Befehle verwalten"
                            />
                            <Chip
                              color="primary"
                              style={{ marginTop: '5px' }}
                              icon={<Icon>library_music</Icon>}
                              label="Kann Songrequests verwalten"
                            />
                          </React.Fragment>
                        }
                      >
                        <Avatar style={{ width: '32px', height: '32px', marginRight: '5px' }}>
                          <Icon>
                            priority_high
                          </Icon>
                        </Avatar>
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
