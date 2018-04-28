import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import './_style.css';

import { settingsSelectors, settingsOperations } from '../../state/settings';

class Settings extends Component {
  componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const {
      language,
      updateLanguage,
      updateDirty,
      isDirty,
      pushChanges,
      intl
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 3 }
      },
      wrapperCol: {
        xs: { span: 8 },
        sm: { span: 4 }
      }
    };

    const unsavedChanges = intl.formatMessage({ id: 'settings.unsaved' });

    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.settings" />
        </h2>
        <Paper className="pageContainer">
          <form onSubmit={this.handleSubmit}>
            <div
              {...formItemLayout}
              label={intl.formatMessage({
                id: 'settings.selectLanguage'
              })}
            >
              <select
                showSearch
                style={{ width: 200 }}
                placeholder={intl.formatMessage({
                  id: 'settings.selectLanguage'
                })}
                optionFilterProp="children"
                onChange={lang => {
                  updateLanguage(lang);
                  updateDirty(true);
                }}
                value={language}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <option value="EN_GB">English (GB)</option>
                <option value="DE_DE">German</option>
              </select>
            </div>
            {isDirty && (
              <div {...formItemLayout} label={unsavedChanges}>
                <button type="primary" onClick={pushChanges}>
                  <FormattedMessage id="common.save" defaultMessage="Save" />
                </button>
              </div>
            )}
          </form>
        </Paper>
        <Row>
          <Col sm={6}>
            <div className="settingsHead">
              <div>Einstellungen</div>
              <small>Stelle dir Twasi nach deinen Bedürfnissen ein.</small>
            </div>
            <Paper style={{ marginTop: '0px' }} className="pageContainer">
              <Toggle
                label="Songrequests"
                labelStyle={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#5e5e5e'
                }}
                thumbSwitchedStyle={{ backgroundColor: '#00aeae' }}
              />
              <Divider style={{ marginTop: '15px' }} />
              <div className="settingsDescription">
                Mit dieser Einstellung <span className="green">aktivierst</span>{' '}
                oder <span className="red">deaktivierst</span> du die Funktion
                für das Hinzufügen und Abspielen von Songs der Streamplaylist.
              </div>
              <Divider style={{ marginTop: '15px' }} />
              <Row>
                <Col sm={6}>
                  <ListItem
                    primaryText="Requests nur für Abonnenten"
                    className="settingsToggle"
                    rightToggle={
                      <Toggle
                        thumbSwitchedStyle={{ backgroundColor: '#00aeae' }}
                      />
                    }
                  />
                </Col>
                <Col sm={6}>
                  <TextField
                    fullWidth="true"
                    floatingLabelFixed="true"
                    floatingLabelStyle={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#5e5e5e'
                    }}
                    hintText="Hint Text"
                    floatingLabelText="Requests pro Zuschauer"
                  />
                </Col>
                <Col sm={6}>
                  <ListItem
                    primaryText="Tokenkosten pro Requests"
                    className="settingsToggle"
                    rightToggle={
                      <Toggle
                        thumbSwitchedStyle={{ backgroundColor: '#00aeae' }}
                      />
                    }
                  />
                </Col>
                <Col sm={6}>
                  <TextField
                    fullWidth="true"
                    floatingLabelFixed="true"
                    floatingLabelStyle={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#5e5e5e'
                    }}
                    hintText="Hint Text"
                    floatingLabelText="Kosten pro Request"
                  />
                </Col>
                <Col sm={6}>
                  <ListItem
                    primaryText="Mindest Viewtime für Requesten"
                    className="settingsToggle"
                    rightToggle={
                      <Toggle
                        thumbSwitchedStyle={{ backgroundColor: '#00aeae' }}
                      />
                    }
                  />
                </Col>
                <Col sm={6}>
                  <TextField
                    fullWidth="true"
                    floatingLabelFixed="true"
                    floatingLabelStyle={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#5e5e5e'
                    }}
                    hintText="Hint Text"
                    floatingLabelText="Viewtime zum Requesten"
                  />
                </Col>
                <Col sm={6}>
                  <ListItem
                    primaryText="Skipvotes für Zuschauer"
                    className="settingsToggle"
                    rightToggle={
                      <Toggle
                        thumbSwitchedStyle={{ backgroundColor: '#00aeae' }}
                      />
                    }
                  />
                </Col>
                <Col sm={6}>
                  <TextField
                    fullWidth="true"
                    floatingLabelFixed="true"
                    floatingLabelStyle={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#5e5e5e'
                    }}
                    hintText="Hint Text"
                    floatingLabelText="Votes um Song zu skippen"
                  />
                </Col>
                <Col sm={6}>
                  <TextField
                    fullWidth="true"
                    floatingLabelFixed="true"
                    floatingLabelStyle={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#5e5e5e'
                    }}
                    hintText="Hint Text"
                    floatingLabelText="Minimallänge eines Songs"
                  />
                </Col>
                <Col sm={6}>
                  <TextField
                    fullWidth="true"
                    floatingLabelFixed="true"
                    floatingLabelStyle={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#5e5e5e'
                    }}
                    hintText="Hint Text"
                    floatingLabelText="Maximallänge eines Songs"
                  />
                </Col>
              </Row>
            </Paper>
          </Col>
          <Col sm={6} />
          <Col sm={6}>
            <Paper style={{ marginTop: '5px' }} className="pageContainer">
              <Toggle
                label="Tokens"
                labelStyle={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#5e5e5e'
                }}
                thumbSwitchedStyle={{ backgroundColor: '#00aeae' }}
              />
              <Divider style={{ marginTop: '15px' }} />
              <div className="settingsDescription">
                Mit dieser Einstellung <span className="green">aktivierst</span>{' '}
                oder <span className="red">deaktivierst</span> du das
                Tokensystem, dabei sammeln alle Chatter virtuelle Punkte für das
                Ansehen deines Streams.
              </div>
              <Divider style={{ marginTop: '15px' }} />
            </Paper>
          </Col>
          <Col sm={6} />
          <Col sm={6}>
            <Paper style={{ marginTop: '5px' }} className="pageContainer">
              <Toggle
                label="Zitate"
                labelStyle={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  color: '#5e5e5e'
                }}
                thumbSwitchedStyle={{ backgroundColor: '#00aeae' }}
              />
              <Divider style={{ marginTop: '15px' }} />
              <div className="settingsDescription">
                Mit dieser Einstellung <span className="green">aktivierst</span>{' '}
                oder <span className="red">deaktivierst</span> du das
                Zitatsystem, dabei kannst du Zitate deines Streams mithilfe von
                !zitat add hinzufügen oder zufällige Zitate mithilfe von !zitat
                im Chat ausgeben lassen.
              </div>
              <Divider style={{ marginTop: '15px' }} />
              {/*
              <Divider style={{ marginTop: '15px' }} />
              <div className="settingsAdvanced">Erweiterte Einstellungen</div>
              */}
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

Settings.propTypes = {
  language: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
  verifyData: PropTypes.func.isRequired,
  updateDirty: PropTypes.func.isRequired,
  isDirty: PropTypes.bool.isRequired,
  pushChanges: PropTypes.func.isRequired,
  intl: intlShape.isRequired // eslint-disable-line react/no-typos
};

const mapStateToProps = state => ({
  language: settingsSelectors.getLanguage(state),
  isDirty: settingsSelectors.isDirty(state)
});

const mapDispatchToProps = dispatch => ({
  updateLanguage: language =>
    dispatch(settingsOperations.updateLanguage(language)),
  verifyData: () => dispatch(settingsOperations.verifyData()),
  updateDirty: isDirty => dispatch(settingsOperations.updateDirty(isDirty)),
  pushChanges: () => dispatch(settingsOperations.pushChanges())
});

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(Settings)
);
