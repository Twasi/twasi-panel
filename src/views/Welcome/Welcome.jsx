import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import DummyLoadingPage from '../DummyLoadingPage';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';
import { pluginsOperations } from '../../state/plugins';

import './_style.css';

class Welcome extends Component {
  state = {
    finished: false,
    stepIndex: 0
  };

  componentWillMount() {
    const { updateUserStatus, loadPlugins } = this.props;
    updateUserStatus();
    loadPlugins();
  }

  getStepContent() {
    switch (this.state.stepIndex) {
      case 0:
        return (
          <div className="setupContent">
            <h2>Willkommen zur geschlossenen Beta von Twasi 2</h2>
            <p>
              Hier kannst du deinen persönlichen Beta Key einlösen, um an der geschlossenen Beta von Twasi 2 teilzunehmen.<br />
              Wie du an einen Beta Code kommst erfährst du <a href="#">hier</a>.<br /><br /><br />
              <TextField
                label="Dein Beta Key"
                multiline
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                placeholder="tWiTcH"
                // Falls gültig color auf primary und Text abändern.
                helperText={<Typography color="secondary">Dieser Key ist ungültig.</Typography>}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>
                        vpn_key
                      </Icon>
                    </InputAdornment>
                  )
                }}
              />
              <br />
              <br />
              <FormControlLabel
                control={
                  <Checkbox color="primary" value="checkedA" />
                }
                label={<Typography>Ich habe die <a href="#">Nutzungsbedingungen</a> gelesen und akzeptiere diese.</Typography>}
              />
              <br />
              <br />
              <br />
              Bitte <b>UNBEDINGT BEACHTEN</b>, dass dies eine sehr Frühe Version ist und viele Funktionen noch nicht bzw. nur bedingt funktionstüchtig sind.<br />
              Es werden fast täglich neue Elemente und Funktionen hinzugefügt.<br /><br />
              Wir übernehmen keine Gewähr für verloren gegangene Daten während der neuen Versionen.
            </p>

            {/*
              Wir freuen uns, dass du dich für Twasi als Chatbot entschieden
              hast.<br /> Twasi ist ein Chatbot, der durch Ideen einer
              vielseitigen Community entstanden ist.
              <br />
              <br />
              Bevor es los geht benötigen wir einige Informationen, die uns
              dabei helfen Twasi für dich optimal anzupassen.
              <br />
              Bitte lies dir in den folgenden <b>3 Schritten</b> alles genau
              durch.
            </p>
            <div className="infoAlert">
              Du wurdest von <b>Blechkelle</b> geworben (Reflink).<br />{' '}
              Blechkelle erhällt durch deine Registrierung eine Belohnung in
              Form von Refpunkten.
            </div>
            */}
          </div>

        );
      case 1:
        return (
          <div className="setupContent">
            <h1>Plugins</h1>
            <p>
              Hier kannst du auswählen, welche Plugins du aktiviert bzw.
              deaktiviert haben möchtest.<br /> Plugins beinhalten den
              kompletten Funktionsumfang von Twasi.<br />
              Es gibt Plugins, die du nicht deaktivieren kannst, da sie
              essentiell für den Betrieb des Bots sind.<br />
              <br />
              Alle Plugins lassen sich auch im nachhinein noch aktivieren,
              deaktivieren und einstellen.
            </p>
            <Divider />
            <br />
          </div>
        );
      case 2:
        return 'Test';
      default:
        return 'Fehler';
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  render() {
    const { userStatus, children } = this.props;

    if (userStatus === 'OK') {
      return children;
    }
    if (userStatus === 'SETUP') {
      const { finished, stepIndex } = this.state;
      const contentStyle = { margin: '0 16px' };
      return (
        <div className="contentWelcome">
          <div className="pageContent">
            <Paper className="pageContainer">
              <Stepper activeStep={stepIndex}>
                <Step>
                  <StepLabel style={{ fontWeight: 'bold' }}>
                      Willkommen
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel style={{ fontWeight: 'bold' }}>
                      Plugins aktivieren
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel style={{ fontWeight: 'bold' }}>Fertig</StepLabel>
                </Step>
              </Stepper>
              <div style={contentStyle}>
                {finished ? (
                  <p>
                    <a
                      href="#"
                      onClick={event => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
                    >
                        Click here
                    </a>{' '}
                      to reset the example.
                  </p>
                ) : (
                  <div>
                    <p>{this.getStepContent(stepIndex)}</p>
                    <Divider />
                    <div style={{ marginTop: 20 }}>
                      <Button
                        color="primary"
                        variant="contained"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{ marginRight: 12 }}
                      >
                          Zurück
                      </Button>
                      <Button
                        disabled
                        color="primary"
                        variant="contained"
                        onClick={this.handleNext}
                      >
                        {(() => {
                          switch (stepIndex) {
                            case 0:
                              return "Los Geht's";
                            case 1:
                              return 'Weiter';
                            case 2:
                              return 'Fertig';
                            default:
                              return null;
                          }
                        })()}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Paper>
          </div>
        </div>
      );
    }

    return <DummyLoadingPage />;
  }
}

Welcome.propTypes = {
  children: PropTypes.node,
  userStatus: PropTypes.string,
  updateUserStatus: PropTypes.func.isRequired,
  loadPlugins: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userStatus: appInfoSelectors.getUserStatus(state)
});

const mapDispatchToProps = dispatch => ({
  updateUserStatus: () => dispatch(appInfoOperations.loadUserStatus()),
  loadPlugins: () => dispatch(pluginsOperations.loadData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Welcome)
);
