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
import Button from '@material-ui/core/Button';
import { FormattedMessage } from 'react-intl';
import storage from 'local-storage';

import { i18nSelectors, i18nOperations } from '../../state/i18n';
import { statusOperations } from '../../state/status';

import './_style.css';

import Flag_DE from '../common/resources/flag_de.png';
import Flag_EN from '../common/resources/flag_en.png';

const languages = [{
  name: <FormattedMessage id="languageswitch.german" />,
  key: 'DE_DE',
  avatar: Flag_DE
}, {
  name: <FormattedMessage id="languageswitch.english" />,
  key: 'EN_GB',
  avatar: Flag_EN
}];

class LanguageSwitch extends React.Component {

  state = {
    restartBotDialog: false
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleListItemClick = value => {
    console.log(value.key)
    storage('language', value.key);
    this.props.updateLanguage(value.key);
    this.props.updateBotLanguage(value.key);
    this.setState({ restartBotDialog: true });
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, updateLanguage, updateBotLanguage, ...other } = this.props;
    return (
      <div>
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
        <Dialog open={this.state.restartBotDialog}>
          <DialogContent>
            <Typography component={'div'}>
              <h4 className="pageContainerTitle">
                <FormattedMessage id="languageswitch.confirmation.title" />
              </h4>
              <small>
                <FormattedMessage id="languageswitch.confirmation.text" />
              </small>
            </Typography>
            <Button
              style={{ marginTop: '15px', marginRight: '16px' }}
              variant="contained"
              color="primary"
              onClick={() => {
                this.props.stopBot();
                this.props.startBot();
                this.setState({ restartBotDialog: false })
              }}>
              <FormattedMessage id="languageswitch.confirmation.restart" />
            </Button>
            <Button
              style={{ marginTop: '15px' }}
              variant="contained"
              color="secondary"
              onClick={() => {
                  this.setState({ restartBotDialog: false })
              }}>
              <FormattedMessage id="languageswitch.confirmation.cancel" />
            </Button>
          </DialogContent>
        </Dialog>
      </div>
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
  selectedValue: i18nSelectors.getLocale(state),
});

const mapDispatchToProps = dispatch => ({
  updateLanguage: language => dispatch(i18nOperations.updateLanguage(language)),
  updateBotLanguage: languageCode => dispatch(statusOperations.loadBotLanguage(languageCode)),
  stopBot: () => dispatch(statusOperations.stopBot()),
  startBot: () => dispatch(statusOperations.startBot())
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitchWrapped);
