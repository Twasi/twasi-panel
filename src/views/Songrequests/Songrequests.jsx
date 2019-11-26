import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Slider from '@material-ui/core/Slider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import VolumeIcon from '@material-ui/icons/VolumeUp';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import GivePLZ from '../common/resources/giveplz.png';

import SongrequestSettings from './SongrequestSettings';
import SongrequestConnectionStatus from './SongrequestConnectionStatus';
import SongrequestPlayer from './SongrequestPlayer';
import { isValidBrowser } from './browserCheck.js';
import songrequestSync from '../../services/songrequestSync';
import { authSelectors } from '../../state/auth';

import spotifylogo from '../common/resources/spotifyIcon.png';

import './_style.css';

class Songrequests extends React.Component {
  handleVolumeChange = (event, volume) => {
    this.setState({ volume });
  };

  handleTimelineChange = (event, time) => {
    this.setState({ time });
  };

  constructor(props) {
    super(props);
    this.state = {
      openSongrequestSettings: false,
      volume: 50,
      time: 50,
      playback: false,
      sync: {
        status: 'disconnected',
        timestamp: Date.now()
      }
    };
    this.sync = songrequestSync;
  }

  componentDidMount() {
    this.sync.setTwitchId(this.props.twitchid);
    this.sync.setJwtToken(this.props.jwt);
    this.sync.connect();

    this.sync.onStatus = status =>
      this.setState({ sync: { ...this.state.sync, status } });
    this.sync.onKeepalive = timestamp =>
      this.setState({ sync: { ...this.state.sync, timestamp } });

    this.sync.requestStatus();
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleChangePlayback = () => {
    this.setState({ playback: !this.state.playback })
  }

  handleCloseSongrequestSettings = () => {
    this.setState({ openSongrequestSettings: false });
  };

  renderUnsupportedBrowser() {
    return (
      <Paper className="pageContainer" style={{ paddingTop: '1px', borderRadius: '0px 0px 4px 4px' }}>
        <Typography component={'div'} style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
          <img
            style={{ position: 'relative', height: '150px' }}
            src={GivePLZ}
            alt="GivePLZ"
          />
          <h3 className="pageContainerTitle">
            Dieser Browser wird nicht Supportet.
          </h3>
          <small>
            Bitte nutze Firefox, Chrome oder Opera, um die Songrequest Funktion zu nutzen.
          </small>
        </Typography>
      </Paper>
    );
  }

  render() {
    const { volume, time } = this.state;
    const image = 'https://qph.fs.quoracdn.net/main-qimg-4441921147e85b468845f56460c53654';
    return (
      <div className="pageContent">
        <SongrequestPlayer/>
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.songrequests" /></Typography>
        </Breadcrumbs>
        <span style={{ float: 'right', position: 'relative', top: '-23px' }}>
          <SongrequestConnectionStatus
            status={this.state.sync.status}
            timestamp={new Date(this.state.sync.timestamp).toLocaleString()}
          />
        </span>
        {isValidBrowser() &&
        <Paper className="pageContainer" style={{ padding: '0px', position: 'relative' }}>
          <div
            style={{
              width: '100%',
              height: '195px',
              position: 'absolute',
              backgroundImage: 'url('+image+')',
              opacity: '.1',
              zIndex: '10'
            }}
          >
          </div>
          <Grid container spacing={3} style={{ padding: '12px 23px', position: 'relative', zIndex: '20' }}>
            <Grid item>
              <div className="songrequestsCoverImage">
                <img
                  src={image}
                  alt="albumcover"
                  style={{ height: '150px', width: '150px' }}
                />
              </div>
            </Grid>
            <Grid item style={{ position: 'relative' }}>
              <Typography color="textPrimary">
                <h1 style={{ padding: '0px', margin: '0px' }}>
                  Krasser Songtitel
                </h1>
                <h4 style={{ padding: '0px', margin: '0px' }}>
                  Noch krasserer Interpret
                </h4>
                <small style={{ position: 'absolute', bottom: '18px' }}>
                  <em>
                    <FormattedMessage id="songrequest.requestby" /> <b>John Doe</b>
                  </em>
                </small>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} className="songrequestsPlayer" style={{ padding: '23px 23px 10px 23px', position: 'relative', zIndex: '20' }}>
            <Grid item>
              <Fab size="small" color="primary" aria-label="previous" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }}>
                <Icon className="actionButtons">skip_previous</Icon>
              </Fab>
              <Fab onClick={this.handleChangePlayback} size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} color="primary" aria-label="play">
                <Icon className="actionButtons">{this.state.playback ? 'stop' : 'play_arrow'}</Icon>
              </Fab>
              <Fab size="small" style={{ margin: '0px 5px 0px 5px', boxShadow: 'none' }} color="primary" aria-label="skip">
                <Icon className="actionButtons">skip_next</Icon>
              </Fab>
            </Grid>
            <Grid item xs={4} style={{ verticalAlign: 'middle' }}>
              <Slider
                style={{
                  width: '100%',
                  marginTop: '5px'
                }}
                value={time}
                onChange={this.handleTimelineChange}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
              />
            </Grid>
            <Grid item>
              <div style={{ textAlign: 'right', float: 'right' }}>
                <Chip
                  style={{ verticalAlign: 'middle', marginRight: '5px' }}
                  avatar={
                    <Avatar>
                      <VolumeIcon />
                    </Avatar>
                  }
                  label={<div style={{
                    padding: '5px 0px 0px 5px',
                    margin: '12px 0px 11px 0px',
                    width: '150px' }}>
                    <Slider
                      value={volume}
                      onChange={this.handleVolumeChange}
                      aria-labelledby="discrete-slider"
                      valueLabelDisplay="auto"/>
                  </div>}
                />
                {/* Settings */}
                <Fab style={{ marginLeft: '15px' }} size="small" color="primary" aria-label="settings" onClick={() => this.setState({ openSongrequestSettings: true })}>
                  <Icon className="actionButtons">settings</Icon>
                </Fab>
                <Button style={{ marginLeft: '15px' }} color="secondary" variant="outlined">
                  Song sperren
                </Button>
                <Button style={{ marginLeft: '15px' }} color="secondary" variant="outlined">
                  Nutzer sperren
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>}
        {isValidBrowser() &&
        <Paper className="pageContainer" style={{ padding: '0px' }}>
          <Table>
            <TableHead
              adjustForCheckbox={false}
              displaySelectAll={false}
              selectable={false}
            >
              <TableRow className="TableRow">
                <TableCell>
                  <FormattedMessage id="songrequest.table_id" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_title" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_channel" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_duration" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_requestby" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="songrequest.table_platform" />
                </TableCell>
                <TableCell>
                  <FormattedMessage id="common.actions" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Queen - Bohemian Rhapsody</TableCell>
                <TableCell>Queen</TableCell>
                <TableCell>13:37</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>
                  <div>
                    <Tooltip title="Spotify" placement="top">
                      <img
                        src={spotifylogo}
                        alt="spotify"
                        style={{ height: '32px', marginTop: '7px' }}
                      />
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>
                  <Tooltip title="Favorisieren" placement="top">
                    <Fab
                      className="noshadow"
                      color="primary"
                      size="small"
                      aria-label="favSong"
                    >
                      <Icon className="actionButtons">star</Icon>
                    </Fab>
                  </Tooltip>{' '}
                  <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
                    <Fab
                      className="noshadow"
                      color="secondary"
                      size="small"
                      aria-label="deleteSong"
                    >
                      <Icon className="actionButtons">delete</Icon>
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>}
        {console.log(this.state.openSongrequestSettings)}
        {this.state.openSongrequestSettings &&
          <SongrequestSettings
            open
            onClose={this.handleCloseSongrequestSettings}
          />
        }
        {!isValidBrowser() && this.renderUnsupportedBrowser()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  twitchid: authSelectors.getUser(state).twitchid,
  jwt: authSelectors.getJwt(state)
});

export default connect(mapStateToProps)(Songrequests);
