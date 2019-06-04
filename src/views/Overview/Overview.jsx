import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col } from 'react-grid-system';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TooltipM from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import NotInstalledAlert from '../NotInstalledAlert/NotInstalledAlert.jsx';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';
import { utilitiesSelectors, utilitiesOperations } from '../../state/utilities';
import { commandsSelectors, commandsOperations } from '../../state/commands';

import Kreygasm from '../common/resources/Kreygasm.png';
import LUL from '../common/resources/LUL.png';
import Kappa from '../common/resources/Kappa.png';
import PogChamp from '../common/resources/PogChamp.png';
import SeriousSloth from '../common/resources/SeriousSloth.png';

import ViewerChart from './ViewerChart';
import PlayedGamesChart from './PlayedGamesChart';
import CommandsChart from './CommandsChart';
import ChattersChart from './ChattersChart';
import StatsList from './StatsList';
import GameTitleCard from './GameTitleCard';

import './_style.css';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

class Overview extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { updateStreamtracker } = this.props;
    updateStreamtracker();
    const { updateGlobalStreamtracker } = this.props;
    updateGlobalStreamtracker();
    const { updateCommands } = this.props;
    updateCommands();
  }

  render() {
    const { streamtracker, globalstreamtracker, utilities, disabled } = this.props;
    console.log(disabled);
    if (utilities.retrieve != null) {
      var totalTrackedFollowers = utilities.retrieve.followers;
    }
    const { value } = this.state;
    return (
      <div className="pageContent">
        <Container className="overviewHead">
          <Row>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>{totalTrackedFollowers}</span>
                  </h2>
                  <small>
                    <FormattedMessage id="overview.follower" />
                  </small>
                  <img
                    style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
                    src={Kreygasm}
                    alt="Kreygasm"
                  />
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
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
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
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
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
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
              </div>
            </Col>
          </Row>
        </Container>
        {streamtracker.streamId != null &&
        <Paper className="pageContainer" style={{ borderRadius: '4px', padding: '0px' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Letzter Stream" />
            <Tab label="Letzten 30 Tage" />
            <Tab label="Gesamt" />
          </Tabs>
        </Paper>
        }
        {value === 0 && <TabContainer>
          {streamtracker.streamId != null &&
          <Row>
            <Col sm={12}>
              <Paper className="pageContainer">
                <Typography>
                  <h3 className="pageContainerTitle">
                    <FormattedMessage id="overview.laststream" />
                    <span style={{ float: 'right' }}>
                      <Button variant="contained" color="primary" onClick={this.props.updateStreamtracker}>
                        <Icon style={{ marginRight: '5px' }}>cached</Icon>
                        <FormattedMessage id="common.refresh" />
                      </Button>
                    </span>
                  </h3>
                  <small>
                    <FormattedMessage id="overview.laststream.subtitle" />
                  </small>
                </Typography>
                <GameTitleCard />
              </Paper>
            </Col>
          </Row>
          }
          {streamtracker.streamId != null &&
          <Row>
            <Col sm={9}>
              <Paper className="pageContainer" style={{ height: '300px', paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px' }}>
                <Typography style={{ paddingLeft: '23px', position: 'absolute' }}>
                  <h3 className="pageContainerTitle">
                    <FormattedMessage id="overview.viewercourse" />
                  </h3>
                  <small>
                    <FormattedMessage id="overview.viewercourse.subtitle" />
                  </small>
                </Typography>
                <ViewerChart />
              </Paper>
              <Row>
                <Col sm={6}>
                  <Paper className="pageContainer" style={{ height: '350px', padding: '23px 0px 0px 0px' }}>
                    <Typography style={{ paddingLeft: '23px', position: 'absolute' }}>
                      <h3 className="pageContainerTitle">
                        <FormattedMessage id="overview.used_commands" />
                      </h3>
                      <small>
                        <FormattedMessage id="overview.used_commands.subtitle" />
                      </small>
                    </Typography>
                    {!disabled && <CommandsChart />}
                    {disabled &&
                    <Card style={{ margin: '60px 23px 23px 23px' }} className="pluginCard">
                      <CardContent className="pluginCardContent">
                        <Typography>Das Plugin für die Befehle ist nicht installiert. Um dieses Diagramm anzuzeigen, installiere bitte das Plugin "<b>Befehle</b>".</Typography>
                      </CardContent>
                    </Card>
                    }
                  </Paper>
                </Col>
                <Col sm={6}>
                  <Paper className="pageContainer" style={{ height: '350px', padding: '23px 0px 0px 0px' }}>
                    <Typography style={{ paddingLeft: '23px', position: 'absolute' }}>
                      <h3 className="pageContainerTitle">
                        <FormattedMessage id="overview.played_games" />
                      </h3>
                      <small>
                        <FormattedMessage id="overview.played_games.subtitle" />
                      </small>
                    </Typography>
                    <PlayedGamesChart />
                  </Paper>
                </Col>
              </Row>
              <Paper className="pageContainer" style={{ height: '500px', paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px' }}>
                <Typography style={{ paddingLeft: '23px', position: 'absolute' }}>
                  <h3 className="pageContainerTitle">
                    <FormattedMessage id="overview.chatterchart" />
                  </h3>
                  <small>
                    <FormattedMessage id="overview.chatterchart.subtitle" />
                  </small>
                </Typography>
                <ChattersChart />
              </Paper>
            </Col>
            <Col sm={3}>
              <div>
                <StatsList />
              </div>
            </Col>
          </Row>
          } {streamtracker.streamId == null &&
          <div>
            <Paper className="pageContainer">
              <Typography style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
                <h1 className="pageContainerTitle">
                  <FormattedMessage id="overview.no_streams_tracked_title" />
                  <img
                    style={{ position: 'relative', top: '15px', left: '10px', height: '50px' }}
                    src={SeriousSloth}
                    alt="SeriousSloth"
                  />
                </h1>
                <br />
                <small>
                  <FormattedMessage id="overview.no_streams_tracked_subtitle" />
                </small>
              </Typography>
            </Paper>
            <Paper className="pageContainer">
              <Row>
                <Col sm={3}>
                  <Card style={{ textAlign: 'center' }} className="pluginCard">
                    <CardContent className="pluginCardContent">
                      <Button variant="contained" color="primary">
                        <FormattedMessage id="overview.no_streams_tracked_plugins" />
                      </Button>
                    </CardContent>
                  </Card>
                </Col>
                <Col sm={3}>
                  <Card style={{ textAlign: 'center' }} className="pluginCard">
                    <CardContent className="pluginCardContent">
                      <Button variant="contained" color="primary">
                        <FormattedMessage id="overview.no_streams_tracked_docs" />
                      </Button>
                    </CardContent>
                  </Card>
                </Col>
                <Col sm={3}>
                  <Card style={{ textAlign: 'center' }} className="pluginCard">
                    <CardContent className="pluginCardContent">
                      <Button variant="contained" color="primary">
                        <FormattedMessage id="overview.no_streams_tracked_support" />
                      </Button>
                    </CardContent>
                  </Card>
                </Col>
                <Col sm={3}>
                  <Card style={{ textAlign: 'center' }} className="pluginCard">
                    <CardContent className="pluginCardContent">
                      <Button variant="contained" color="primary">
                        <FormattedMessage id="overview.no_streams_tracked_feedback" />
                      </Button>
                    </CardContent>
                  </Card>
                </Col>
              </Row>
            </Paper>
          </div>
          }
        </TabContainer>}
        {value === 1 && <TabContainer />}
        {value === 2 && <TabContainer />}
      </div>
    );
  }
}

Overview.propTypes = {
  updateStreamtracker: PropTypes.func.isRequired,
  streamtracker: PropTypes.arrayOf(PropTypes.shape({
    streamId: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    streamType: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      gameId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      game: PropTypes.string.isRequired,
      viewerCount: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    }))
  })),
  disabled: PropTypes.bool.isRequired,
  globalstreamtracker: PropTypes.arrayOf(PropTypes.shape({
    totalTrackedViewers: PropTypes.string.isRequired,
    totalTrackedStreams: PropTypes.string.isRequired,
    totalTrackedMessages: PropTypes.string.isRequired
  })),
  updateUtilities: PropTypes.func.isRequired,
  utilities: PropTypes.arrayOf(PropTypes.shape({
    retrieve: PropTypes.arrayOf(PropTypes.shape({
      game: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }))
  }))
};

const mapStateToProps = state => ({
  streamtracker: streamtrackerSelectors.getStreamtracker(state),
  globalstreamtracker: streamtrackerSelectors.getGlobalStreamtracker(state),
  utilities: utilitiesSelectors.getUtilities(state),
  disabled: commandsSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker()),
  updateGlobalStreamtracker: () => dispatch(streamtrackerOperations.loadGlobalStreamtracker()),
  updateUtilities: () => dispatch(utilitiesOperations.loadUtilities()),
  updateCommands: () => dispatch(commandsOperations.loadCommands())
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
