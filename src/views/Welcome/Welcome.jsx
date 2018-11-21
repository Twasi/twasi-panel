import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

import DummyLoadingPage from '../DummyLoadingPage';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

import './_style.css';

class Welcome extends Component {
  state = {
    finished: false,
    stepIndex: 0
  };

  componentWillMount() {
    const { updateUserStatus } = this.props;
    updateUserStatus();
  }

  getStepContent() {
    switch (this.state.stepIndex) {
      case 0:
        return (
          <div className="setupContent">
            <h1>Willkommen bei Twasi 2</h1>
            <p>
              Bitte melde dich bei einem Admin, um dich freischalten zu lassen.<br /><br />
              Bitte <b>UNBEDINGT BEACHTEN</b>, dass dies eine sehr Frühe Version ist und viele Funktionen noch nicht bzw. nur bedingt funktionstüchtig sind.<br />
              Es werden fast täglich neue Elemente und Funktionen hinzugefügt.<br /><br />
              Wir übernehmen geine Gewähr für verlorene Daten während der neuen Versionen.
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
            <h1>Migration deiner Daten</h1>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <p>
                  <div className="infoAlert">
                    Wir haben festgestellt, dass du bereits seit unserer BETA
                    Teil der Twasi Community bist.<br />
                    Du hast anschließend die Möglichkeit die Daten, die wir in
                    der BETA von dir gesammelt haben mitzunehmen oder einen
                    kompletten Neustart zu machen.
                  </div>
                  <div className="dangerAlert">
                    <b>Achtung!</b> Solltest du einen Neustart wählen, werden{' '}
                    <b>ALLE</b> Daten, die wir von dir und deinen Streams
                    gesammelt haben permanent gelöscht!
                  </div>
                </p>
                {/*
                <Paper className="welcomeBox">
                  <h4 className="welcomeSubHeadline">
                    Deine Daten aus der BETA
                  </h4>
                  <p className="welcomeSubHeadlineParagraph" />
                </Paper>
                */}
              </Grid>
            </Grid>
            <p>
              Bitte wähle alle Daten aus, die du in das neue Twasi übernehmen
              möchtest.
            </p>
            <Table
              style={{
                border: '1px solid rgb(224, 224, 224)'
              }}
            >
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableCell>Befehle</TableCell>
                  <TableCell>
                    <b>55</b> Datensätze
                  </TableCell>
                  <TableCell>
                    <Checkbox/>
                      Daten mitnehmen
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Variablen</TableCell>
                  <TableCell>
                    <b>14</b> Datensätze
                  </TableCell>
                  <TableCell>
                    <Checkbox/>
                      Daten mitnehmen
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Zitate</TableCell>
                  <TableCell>
                    <b>34</b> Datensätze
                  </TableCell>
                  <TableCell>
                    <Checkbox/>
                      Daten mitnehmen
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Songrequests</TableCell>
                  <TableCell>
                    <b>316</b> Datensätze
                  </TableCell>
                  <TableCell>
                    <Checkbox/>
                      Daten mitnehmen
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Streamdaten</TableCell>
                  <TableCell>
                    <b>4.302</b> Datensätze
                  </TableCell>
                  <TableCell>
                    <Checkbox/>
                      Daten mitnehmen
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bestenlisten</TableCell>
                  <TableCell>
                    <b>429</b> Datensätze
                  </TableCell>
                  <TableCell>
                    <Checkbox/>
                      Daten mitnehmen
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        );
      case 2:
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
      case 3:
        return 'Test';
      default:
        return 'Fehler';
    }
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3
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
                      Migration
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel style={{ fontWeight: 'bold' }}>
                      Plugins
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
                                return 'Weiter';
                              case 3:
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

    return <DummyLoadingPage/>;
  }
}

Welcome.propTypes = {
  children: PropTypes.node,
  userStatus: PropTypes.string,
  updateUserStatus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userStatus: appInfoSelectors.getUserStatus(state)
});

const mapDispatchToProps = dispatch => ({
  updateUserStatus: () => dispatch(appInfoOperations.loadUserStatus())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Welcome)
);
