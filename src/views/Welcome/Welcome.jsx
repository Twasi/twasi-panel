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
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import DummyLoadingPage from '../DummyLoadingPage';

import { appInfoSelectors, appInfoOperations } from '../../state/appInfo';
import { pluginsOperations } from '../../state/plugins';

import './_style.css';

// let id = 0;
function createData(name, description) {
  // id += 1;
  return { name, description };
}

const rows = [
  createData('Befehle', 'Ermöglicht das Hinzufügen, Entfernen und Bearbeiten von Textbefehlen im Chat.'),
  createData('Giveaways', 'Funktionen, um ein Giveaway zu veranstallten.')
];

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
          <div>
            <Grid container spacing={16} style={{ marginTop: '0px' }}>
              <Grid item xs={6}>
                <div className="translucentBox">
                  <div className="media-body">
                    <Typography style={{ color: '#ffffff' }}>
                      <h2 style={{ margin: '7px 0px 7px 0px' }}>
                        <span>Ich bin Moderator oder Zuschauer</span>
                      </h2>
                      <small>
                        Wähle diese Option, wenn du Moderator oder Zuschauer bei einem Streamer bist, der Twasi als Chatbot nutzt.
                      </small>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="translucentBox">
                  <div className="media-body">
                    <Typography style={{ color: '#ffffff' }}>
                      <h2 style={{ margin: '7px 0px 7px 0px' }}>
                        <span>Ich bin Streamer</span>
                      </h2>
                      <small>
                        Wähle diese Option, wenn du Streamer bist und Twasi als Chatbot auf deinem Kanal nutzen möchtest. Es folgt die Einrichtung des Bots.
                      </small>
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        return (
          <div>
            <Typography>
              <h2 style={{ marginBottom: '5px' }} className="pageContainerTitle">Willkommen zur geschlossenen Beta von Twasi 2</h2>
              <small>
                Hier kannst du deinen persönlichen Beta Key einlösen, um an der geschlossenen Beta von Twasi 2 teilzunehmen.<br />
                Wie du an einen Beta Code kommst erfährst du <Link color="primary" href="/">hier</Link>.
              </small>
            </Typography>
            <Card className="pluginCard" style={{ marginTop: '25px' }}>
              <CardContent style={{ padding: '24px', marginBottom: '25px' }}>
                <TextField
                  style={{ marginBottom: '25px' }}
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
                <FormControlLabel
                  style={{ margin: '0px' }}
                  control={
                    <Checkbox color="primary" value="checkedA" />
                  }
                  label={<Typography>Ich habe die <Link color="primary" href="/">Nutzungsbedingungen</Link> gelesen und akzeptiere diese.</Typography>}
                />
              </CardContent>
            </Card>
            <Typography>
                Bitte <b>UNBEDINGT BEACHTEN</b>, dass dies eine sehr frühe Version ist und viele Funktionen noch nicht bzw. nur bedingt funktionieren.<br />
                Es werden regelmäßig neue Elemente und Funktionen hinzugefügt.<br /><br />
                Wir übernehmen keine Gewähr für verloren gegangene Daten während der neuen Versionen.
            </Typography>

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
      case 2:
        return (
          <div>
            <Typography>
              <h2>Plugins</h2>
              Hier kannst du auswählen, welche Plugins du aktiviert bzw.
              deaktiviert haben möchtest.<br /> Plugins beinhalten den
              kompletten Funktionsumfang von Twasi.<br />
              Es gibt Plugins, die du nicht deaktivieren kannst, da sie
              essentiell für den Betrieb des Bots sind.<br />
              <br />
              Alle Plugins lassen sich auch im nachhinein noch aktivieren,
              deaktivieren und einstellen.
            </Typography>
            <Table style={{ marginTop: '25px' }}>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell>
                    Plugin
                  </TableCell>
                  <TableCell>
                    Beschreibung
                  </TableCell>
                  <TableCell>
                    Installieren / Deinstallieren
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow>
                    <TableCell>
                      {row.name}
                    </TableCell>
                    <TableCell>
                      {row.description}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                      >
                        installieren
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
      const { stepIndex } = this.state;
      const contentStyle = { margin: '0 16px' };
      return (
        <div className="contentWelcome">
          <div className="pageContent">
            <Paper className="pageContainer">
              <Stepper alternativeLabel nonLinear activeStep={stepIndex}>
                <Step>
                  <StepLabel>
                      Willkommen
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                      Closed Beta
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                      Plugins
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>Fertig</StepLabel>
                </Step>
              </Stepper>
              <div style={contentStyle}>
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
                            return 'Zum Panel';
                          default:
                            return null;
                        }
                      })()}
                    </Button>
                  </div>
                </div>
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
