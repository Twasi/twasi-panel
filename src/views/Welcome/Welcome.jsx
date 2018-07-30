import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import { Row, Col } from 'react-grid-system';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';

import './_style.css';

const muiTheme = getMuiTheme({
  stepper: {
    iconColor: '#00aeae' // or logic to change color
  }
});

class Welcome extends Component {
  state = {
    finished: false,
    stepIndex: 2
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
            <h1>Willkommen bei Twasi</h1>
            <p>
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
          </div>
        );
      case 1:
        return (
          <div className="setupContent">
            <h1>Migration deiner Daten</h1>
            <Row>
              <Col sm={12}>
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
              </Col>
            </Row>
            <Divider />
            <RadioButtonGroup
              style={{ marginBottom: '10px' }}
              name="firstStep"
              defaultSelected="1"
            >
              <RadioButton
                value="1"
                label="Ich möchte meine Daten aus der Twasi BETA mitnehmen."
                iconStyle={{ fill: '#00aeae' }}
                style={{
                  marginBottom: '10px',
                  marginTop: '10px',
                  fontWeight: 'bold'
                }}
              />
              <RadioButton
                value="2"
                label="Ich möchte einen Neustart und bin damit einverstanden, dass ALLE gesammelten Daten aus der BETA permanent gelöscht werden."
                iconStyle={{ fill: '#00aeae' }}
                style={{
                  fontWeight: 'bold'
                }}
              />
            </RadioButtonGroup>
            <Divider />
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
                  <TableRowColumn>Befehle</TableRowColumn>
                  <TableRowColumn>
                    <b>55</b> Datensätze
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      label="Daten mitnehmen"
                      iconStyle={{ fill: '#00aeae' }}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Variablen</TableRowColumn>
                  <TableRowColumn>
                    <b>14</b> Datensätze
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      label="Daten mitnehmen"
                      iconStyle={{ fill: '#00aeae' }}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Zitate</TableRowColumn>
                  <TableRowColumn>
                    <b>34</b> Datensätze
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      label="Daten mitnehmen"
                      iconStyle={{ fill: '#00aeae' }}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Songrequests</TableRowColumn>
                  <TableRowColumn>
                    <b>316</b> Datensätze
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      label="Daten mitnehmen"
                      iconStyle={{ fill: '#00aeae' }}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Streamdaten</TableRowColumn>
                  <TableRowColumn>
                    <b>4.302</b> Datensätze
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      label="Daten mitnehmen"
                      iconStyle={{ fill: '#00aeae' }}
                    />
                  </TableRowColumn>
                </TableRow>
                <TableRow>
                  <TableRowColumn>Bestenlisten</TableRowColumn>
                  <TableRowColumn>
                    <b>429</b> Datensätze
                  </TableRowColumn>
                  <TableRowColumn>
                    <Checkbox
                      label="Daten mitnehmen"
                      iconStyle={{ fill: '#00aeae' }}
                    />
                  </TableRowColumn>
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
            <Row>
              <Col sm={4}>
                <Card className="pluginCard">
                  <CardHeader
                    avatar=""
                    title="Teilchenbeschleuniger"
                    subtitle="John Doe"
                    actAsExpander
                    showExpandableButton
                  />
                  <Divider />
                  <CardText>
                    <RaisedButton
                      label="Installieren"
                      backgroundColor="#00aeae"
                      labelColor="#fff"
                      fullWidth
                    />
                  </CardText>
                  <CardText expandable>
                    <p>
                      <b>Version 1.0</b>
                    </p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla
                    facilisi. Donec vulputate interdum sollicitudin. Nunc
                    lacinia auctor quam sed pellentesque. Aliquam dui mauris,
                    mattis quis lacus id, pellentesque lobortis odio.
                  </CardText>
                </Card>
              </Col>
            </Row>
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
        <MuiThemeProvider muiTheme={muiTheme}>
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
                        <FlatButton
                          label="Zurück"
                          disabled={stepIndex === 0}
                          onClick={this.handlePrev}
                          style={{ marginRight: 12 }}
                        />
                        <RaisedButton
                          label={(() => {
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
                          backgroundColor="#00aeae"
                          labelColor="#fff"
                          onClick={this.handleNext}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Paper>
            </div>
          </div>
        </MuiThemeProvider>
      );
    }

    return <div>Loading...</div>;
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
