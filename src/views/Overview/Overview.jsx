import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

import html2canvas from 'html2canvas';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';
import { utilitiesSelectors, utilitiesOperations } from '../../state/utilities';
import { commandsSelectors, commandsOperations } from '../../state/commands';
import { authSelectors } from '../../state/auth';

import Kreygasm from '../common/resources/Kreygasm.png';
import LUL from '../common/resources/LUL.png';
import Kappa from '../common/resources/Kappa.png';
import PogChamp from '../common/resources/PogChamp.png';
import SeriousSloth from '../common/resources/SeriousSloth.png';
import MonkaS from '../common/resources/MonkaS.png';

import ViewerChart from './ViewerChart';
import PlayedGamesChart from './PlayedGamesChart';
import CommandsChart from './CommandsChart';
import ChattersChart from './ChattersChart';
import StatsList from './StatsList';
import GameTitleCard from './GameTitleCard';

import './_style.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

function getViewTime(data) {
  let time = 0;
  data.forEach((entry, index) => {
    time = time + entry.minutes;
  });
  return Math.round(time/1440) + ' Tage';
}

class Overview extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleClose = () => {
    window.location.hash = ""
    window.history.pushState('', '/', window.location.pathname);
  }

  handleClickBreadCrumb = (event, value) => {
      const { history } = this.props;
      history.push(value);
      this.setState({});
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleRedirect = (uri, blank) => {
    window.open(encodeURI(uri), blank);
  }

  handleSaveAsImage = () => {
    var backgroundColorCanvas = window.getComputedStyle(document.body, null).getPropertyValue('background-color');
    html2canvas(document.querySelector("#canvas_twasi_stats"), {
      backgroundColor: backgroundColorCanvas
    }).then(canvas => {
      //document.body.appendChild(canvas)
      var a = document.createElement('a');
      // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      a.download = 'twasi-statistics.jpg';
      a.click();
    });
  }

  componentDidMount() {
    const { updateStreamtracker } = this.props;
    updateStreamtracker();
    const { updateGlobalStreamtracker } = this.props;
    updateGlobalStreamtracker();
    const { updateAllStreams } = this.props;
    updateAllStreams();
    const { updateCommands } = this.props;
    updateCommands();
  }

  addZero= (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  formatTime = (timestamp) => {
    var date = new Date(timestamp);
    var day = this.addZero(date.getDate());
    var month = this.addZero(date.getMonth());
    var year = date.getFullYear();
    var hours = this.addZero(date.getHours());
    var minutes = this.addZero(date.getMinutes());
    return day+"."+month+"."+year+" - "+hours+":"+minutes;
  }

  renderStreams() {
    const { allstreams } = this.props;
    return allstreams.map(stream => (
      <Tab label={(
        <span>
          {allstreams[0].startedAt === stream.startedAt ? "Letzter Stream" : "Stream vom"}
          <br/>
          <b>{this.formatTime(stream.startedAt).toLocaleString()}</b>
        </span>
      )} />
    ));
  }

  render() {
    const { streamtracker, globalstreamtracker, disabled, isLoading, isGlobalLoading, noStreamData, user } = this.props;
    const { value } = this.state;
    let chatterschart;

    if (streamtracker.topChatters !== undefined) {
      if (streamtracker.topChatters.length !== 0) {
        chatterschart = <ChattersChart />;
      } else {
        chatterschart =
          <div>
            <Typography style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
              <img
                style={{ position: 'relative', height: '80px' }}
                src={MonkaS}
                alt="MonkaS"
              />
              <h3 className="pageContainerTitle">
                <FormattedMessage id="overview.no_viewers_tracked" />
              </h3>
              <small>
                <FormattedMessage id="overview.no_viewers_tracked.subtitle" />
              </small>
              <br/><br/>
              <Button
                onClick={() => { this.handleRedirect("https://twitter.com/intent/tweet?text=Ich bin jetzt Live mit "+ streamtracker.data.slice(-1)[0].game +"! schau doch gerne mal vorbei auf https://twitch.tv/" + user.displayName.toLowerCase(), "_blank") }}
                variant="contained"
                color="primary">
                <FormattedMessage id="overview.tweet" />
              </Button>
            </Typography>
          </div>;
      }
    }

    const Helpbuttons = () => (
      <Paper className="pageContainer">
        <Row>
          <Col sm={4}>
            <Card style={{ textAlign: 'center' }} className="pluginCard">
              <CardContent className="pluginCardContent">
                <Button onClick={event => this.handleClickBreadCrumb(event, '/plugins')} variant="contained" color="primary">
                  <FormattedMessage id="overview.no_streams_tracked_plugins" />
                </Button>
              </CardContent>
            </Card>
          </Col>
          <Col sm={4}>
            <Card style={{ textAlign: 'center' }} className="pluginCard">
              <CardContent className="pluginCardContent">
                <Button onClick={() => window.open('https://docs.twasi.net', '_blank')} variant="contained" color="primary">
                  <FormattedMessage id="overview.no_streams_tracked_docs" />
                </Button>
              </CardContent>
            </Card>
          </Col>
          <Col sm={4}>
            <Card style={{ textAlign: 'center' }} className="pluginCard">
              <CardContent className="pluginCardContent">
                <Button onClick={event => this.handleClickBreadCrumb(event, '/support')} variant="contained" color="primary">
                  <FormattedMessage id="overview.no_streams_tracked_support" />
                </Button>
              </CardContent>
            </Card>
          </Col>
        </Row>
      </Paper>
    );

    const ViewTimeBox = () => (
      <div>
        <h2 style={{ margin: '7px 0px 0px' }}>
          <span>{getViewTime(globalstreamtracker.viewTime)}</span>
        </h2>
        <small>
          <FormattedMessage id="overview.viewtime" />
        </small>
        <img
          style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
          src={Kreygasm}
          alt="Kreygasm"
        />
      </div>
    );

    const ViewerBox = () => (
      <div>
        <h2 style={{ margin: '7px 0px 0px' }}>
          <span>{globalstreamtracker.totalTrackedViewers}</span>
        </h2>
        <small>
          <FormattedMessage id="overview.viewer" />
        </small>
        <img
          style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
          src={LUL}
          alt="LUL"
        />
      </div>
    );

    const MessagesBox = () => (
      <div>
        <h2 style={{ margin: '7px 0px 0px' }}>
          <span>{globalstreamtracker.totalTrackedMessages}</span>
        </h2>
        <small>
          <FormattedMessage id="overview.messages" />
        </small>
        <img
          style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
          src={Kappa}
          alt="Kappa"
        />
      </div>
    );

    const StreamsBox = () => (
      <div>
        <h2 style={{ margin: '7px 0px 0px' }}>
          <span>{globalstreamtracker.totalTrackedStreams}</span>
        </h2>
        <small>
          <FormattedMessage id="overview.streams" />
        </small>
        <img
          style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
          src={PogChamp}
          alt="PogChamp"
        />
      </div>
    );

    return (
      <div className="pageContent">
        {isLoading &&
          <Paper className="pageContainer progressWrapper" style={{ marginTop: '0px', height: '800px' }}>
            <CircularProgress className="progressCircle" />
          </Paper>
        }
        {!noStreamData && !isLoading &&
        <Container className="overviewHead">
          <Row>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  {!isGlobalLoading ? <ViewTimeBox /> :
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Skeleton variant="rect" height={23} width={50} style={{ marginTop: '8px', marginBottom: '7px' }} />
                      <Skeleton variant="rect" height={13} width={150} />
                    </Grid>
                    <Grid item xs={3}>
                      <Skeleton variant="circle" height={45} width={45} style={{ marginTop: '6px' }} />
                    </Grid>
                  </Grid>
                  }
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  {!isGlobalLoading ? <ViewerBox /> :
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Skeleton variant="rect" height={23} width={50} style={{ marginTop: '8px', marginBottom: '7px' }} />
                      <Skeleton variant="rect" height={13} width={150} />
                    </Grid>
                    <Grid item xs={3}>
                      <Skeleton variant="circle" height={45} width={45} style={{ marginTop: '6px' }} />
                    </Grid>
                  </Grid>
                  }
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  {!isGlobalLoading ? <MessagesBox /> :
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Skeleton variant="rect" height={23} width={50} style={{ marginTop: '8px', marginBottom: '7px' }} />
                      <Skeleton variant="rect" height={13} width={150} />
                    </Grid>
                    <Grid item xs={3}>
                      <Skeleton variant="circle" height={45} width={45} style={{ marginTop: '6px' }} />
                    </Grid>
                  </Grid>
                  }
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  {!isGlobalLoading ? <StreamsBox /> :
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Skeleton variant="rect" height={23} width={50} style={{ marginTop: '8px', marginBottom: '7px' }} />
                      <Skeleton variant="rect" height={13} width={150} />
                    </Grid>
                    <Grid item xs={3}>
                      <Skeleton variant="circle" height={45} width={45} style={{ marginTop: '6px' }} />
                    </Grid>
                  </Grid>
                  }
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        }
        {!noStreamData && !isLoading &&
        <Paper className="pageContainer" style={{ borderRadius: '4px', padding: '0px' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
          >
            {this.renderStreams()}
          </Tabs>
        </Paper>
        }
        <TabPanel value={value} index={0}>
          {!noStreamData && !isLoading &&
          <Row>
            <Col sm={12}>
              <Paper className="pageContainer">
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">
                    <FormattedMessage id="overview.laststream" />
                    <span style={{ float: 'right' }}>
                      <Button style={{ marginRight: '16px' }} variant="contained" color="primary" onClick={this.handleSaveAsImage}>
                        <Icon style={{ marginRight: '5px' }}>save</Icon>
                        <FormattedMessage id="overview.saveasimage" />
                      </Button>
                      <Button variant="contained" color="primary" onClick={this.props.updateStreamtracker}>
                        <Icon style={{ marginRight: '5px' }}>cached</Icon>
                        <FormattedMessage id="common.refresh" />
                      </Button>
                    </span>
                  </h4>
                  <small>
                    <FormattedMessage id="overview.laststream.subtitle" />
                  </small>
                </Typography>
                <GameTitleCard />
              </Paper>
            </Col>
          </Row>
          }
          {!noStreamData && !isLoading &&
          <div id="canvas_twasi_stats">
            <Row>
              <Col sm={9}>
                <Paper className="pageContainer" style={{ height: '300px', paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px' }}>
                  <Typography component={'span'} style={{ paddingLeft: '23px', position: 'absolute' }}>
                    <h4 className="pageContainerTitle">
                      <FormattedMessage id="overview.viewercourse" />
                    </h4>
                    <small>
                      <FormattedMessage id="overview.viewercourse.subtitle" />
                    </small>
                  </Typography>
                  <ViewerChart />
                </Paper>
                <Row>
                  <Col sm={6}>
                    <Paper className="pageContainer" style={{ height: '350px', padding: '23px 0px 0px 0px' }}>
                      <Typography component={'span'} style={{ paddingLeft: '23px', position: 'absolute' }}>
                        <h4 className="pageContainerTitle">
                          <FormattedMessage id="overview.used_commands" />
                        </h4>
                        <small>
                          <FormattedMessage id="overview.used_commands.subtitle" />
                        </small>
                      </Typography>
                      {!disabled && <CommandsChart />}
                      {disabled &&
                      <Card style={{ margin: '60px 23px 23px 23px' }} className="pluginCard">
                        <CardContent className="pluginCardContent">
                          <Typography><small>Das Plugin für die Befehle ist nicht installiert. Um dieses Diagramm anzuzeigen, installiere bitte das Plugin "<b>Befehle</b>".</small></Typography>
                        </CardContent>
                      </Card>
                      }
                    </Paper>
                  </Col>
                  <Col sm={6}>
                    <Paper className="pageContainer" style={{ height: '350px', padding: '23px 0px 0px 0px' }}>
                      <Typography component={'span'} style={{ paddingLeft: '23px', position: 'absolute' }}>
                        <h4 className="pageContainerTitle">
                          <FormattedMessage id="overview.played_games" />
                        </h4>
                        <small>
                          <FormattedMessage id="overview.played_games.subtitle" />
                        </small>
                      </Typography>
                      <PlayedGamesChart />
                    </Paper>
                  </Col>
                </Row>
                <Paper className="pageContainer" style={{ height: '500px', paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px' }}>
                  <Typography component={'span'} style={{ paddingLeft: '23px', position: 'absolute' }}>
                    <h4 className="pageContainerTitle">
                      <FormattedMessage id="overview.chatterchart" />
                    </h4>
                    <small>
                      <FormattedMessage id="overview.chatterchart.subtitle" />
                    </small>
                  </Typography>
                  {chatterschart}
                </Paper>
                <Helpbuttons />
              </Col>
              <Col sm={3}>
                <div>
                  <StatsList />
                </div>
              </Col>
            </Row>
          </div>
          } {noStreamData && !isLoading &&
          <div>
            <Paper className="pageContainer" style={{ marginTop: '-22px' }}>
              <div>
                <Typography component={'div'} style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
                  <img
                    style={{ position: 'relative', height: '100px' }}
                    src={SeriousSloth}
                    alt="SeriousSloth"
                  />
                  <h3 className="pageContainerTitle">
                    <FormattedMessage id="overview.no_streams_tracked_title" />
                  </h3>
                  <small>
                    <FormattedMessage id="overview.no_streams_tracked_subtitle" />
                  </small>
                </Typography>
              </div>
            </Paper>
            <Helpbuttons />
          </div>
          }
        </TabPanel>
        <Dialog
          onClose={this.handleClose}
          open={window.location.hash === "#first_start"}
          scroll="body"
        >
          <DialogContent>
            <Typography component={'span'}>
              <h4 className="pageContainerTitle">
                Willkommen in der Closed Beta von Twasi!
              </h4>
              <small>
                Bitte lies dir diesen Hinweis genau durch.
              </small>
            </Typography>
            <br /><br />
            <Card className="pluginCard">
              <CardContent className="pluginCardContent">
                <h3 style={{ marginTop: '0px' }}>Vorwort</h3>
                Wir freuen uns sehr, dass du es bis hier geschafft hast!<br /><br />
                Wir haben sehr lange auf diesen Moment hingearbeitet und nun ist es soweit.<br />
                Es gibt jedoch gerade in dieser Version einiges zu beachten.<br />
                Da dies die <b>Closed Beta</b> ist kann es vorkommen,
                dass einige Inhalte, auch wenn sie angezeigt werden nur teilweise bis gar nicht funktionieren.<br /><br />

                <h3 style={{ marginTop: '0px' }}>Support / Hilfe</h3>
                Als Mitglied bei Twasi hast du jederzeit die Möglichkeit Hilfe über deinen Chat oder in diesem Panel unter dem Punkt "<b>Support</b>"
                links unten in der Navigation anzufordern.<br />
                Für Support in deinem Twitch Chat schreibe mit gestartetem Bot<br />
                <b>!help %deine Anfrage%</b>.<br /><br />

                <h3 style={{ marginTop: '0px' }}>Bugs / Fehler</h3>
                Hilf uns Twasi besser zu machen, indem du Bugs und Fehler jeglicher Art über unser Supportsystem meldest.<br /><br />

                <h3 style={{ marginTop: '0px' }}>Schlusswort</h3>
                Wir wünschen dir viel Spaß beim Entdecken unseres Bots.<br />
                Sende uns gerne Feedback über das Supportsystem, damit wir Twasi gemeinsam besser machen können.
              </CardContent>
            </Card>
            <Button
              fullWidth
              style={{ marginTop: '15px' }}
              variant="contained"
              color="primary"
              onClick={() => {
              this.handleClose()
            }}>
              Ok, lass mich endlich in das Panel!
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  streamtracker: streamtrackerSelectors.getStreamtracker(state),
  globalstreamtracker: streamtrackerSelectors.getGlobalStreamtracker(state),
  utilities: utilitiesSelectors.getUtilities(state),
  disabled: commandsSelectors.isDisabled(state),
  isLoading: streamtrackerSelectors.isLoading(state),
  noStreamData: streamtrackerSelectors.noStreamData(state),
  isGlobalLoading: streamtrackerSelectors.isGlobalLoading(state),
  user: authSelectors.getUser(state),
  allstreams: streamtrackerSelectors.getAllStreams(state),
});

const mapDispatchToProps = dispatch => ({
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker()),
  updateGlobalStreamtracker: () => dispatch(streamtrackerOperations.loadGlobalStreamtracker()),
  updateAllStreams: () => dispatch(streamtrackerOperations.loadAllStreams()),
  updateUtilities: () => dispatch(utilitiesOperations.loadUtilities()),
  updateCommands: () => dispatch(commandsOperations.loadCommands())
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
