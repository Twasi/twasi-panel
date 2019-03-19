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

const languages = ['Deutsch | DE', 'Englisch | EN'];

class LanguageSwitch extends React.Component {
  handleClose = () => {
    this.props.onClose();
  }

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { classes, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <h4 className="pageContainerTitle">
            Sprache ändern
          </h4>
          <small>
            Hier kannst du die Sprache ändern.
          </small>
          <br /><br />
          <Card className="pluginCard">
            <CardContent className="pluginCardContent">
              <List style={{ padding: '0px' }}>
                {languages.map(language => (
                  <ListItem
                    button
                    onClick={() => this.handleListItemClick(language)}
                    key={language}
                  >
                    <ListItemText primary={language} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          <br />
          <small>
            Die Erde ist Flach.
          </small>
        </DialogContent>
      </Dialog>
    );
  }
}

export default LanguageSwitch;
