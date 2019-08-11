import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl';
import storage from 'local-storage';

import { i18nSelectors, i18nOperations } from '../../state/i18n';

import './_style.css';

import Flag_DE from '../common/resources/flag_de.png';
import Flag_EN from '../common/resources/flag_en.png';

const languages = [{
  name: <FormattedMessage id="languageswitch.german" />,
  key: 'DE_DE',
  avatar: Flag_DE
}, {
  name: <FormattedMessage id="languageswitch.english" />,
  key: 'EN_EN',
  avatar: Flag_EN
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
    const { classes, onClose, selectedValue, updateLanguage, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        {...other}
      >
        <DialogContent>
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="languageswitch.title" />
            </h4>
            <small>
              <FormattedMessage id="languageswitch.subtitle" />
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
                    key={language.key}
                  >
                    <ListItemAvatar>
                      <Avatar src={language.avatar} className={this.props.selectedValue === language.key ? 'selectedLanguage' : ''}>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={language.name} />
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
