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

import { i18nSelectors, i18nOperations } from '../../state/i18n';

const languages = [{
  name: 'Deutsch | DE',
  key: 'DE_DE'
}, {
  name: 'English | EN',
  key: 'EN_EN'
}];

class LanguageSwitch extends React.Component {
  handleClose = () => {
    this.props.onClose();
  }

  handleListItemClick = value => {
    storage('language', value.key);
    this.props.updateLanguage(value.key);
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Typography>
            <h3 className="pageContainerTitle">
              Sprache ändern
            </h3>
            <small>
              Hier kannst du die Sprache ändern.
            </small>
          </Typography>
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
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: this.props.selectedValue === language.key }}>
                        <Icon style={{ fontSize: 36 }}>{this.props.selectedValue === language.key ? 'check' : 'color_lens'}</Icon>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={language.name} />
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

LanguageSwitch.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  updateLanguage: PropTypes.func.isRequired
};

const LanguageSwitchWrapped = (LanguageSwitch);

const mapStateToProps = state => ({
  selectedValue: i18nSelectors.getLocale(state)
});

const mapDispatchToProps = dispatch => ({
  updateLanguage: language => dispatch(i18nOperations.updateLanguage(language))
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitchWrapped);
