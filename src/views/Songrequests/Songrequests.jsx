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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import GivePLZ from '../common/resources/giveplz.png';

import SongrequestSettings from './SongrequestSettings';
//import SongrequestConnectionStatus from './SongrequestConnectionStatus';
//import SongrequestPlayer from './SongrequestPlayer';
import { isValidBrowser } from './browserCheck.js';
//import songrequestSync from '../../services/songrequestSync';
import { authSelectors } from '../../state/auth';

import spotifylogo from '../common/resources/spotifyIcon.png';

import './_style.css';

var songqueue = [];

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
      song: {
        provider: 'spotify',
        requester: 'John Doe',
        timestamp: Date.now(),
        title: 'Snow (Hey Oh)',
        artist: 'Red Hot Chilli Peppers',
        media: 'https://images-na.ssl-images-amazon.com/images/I/91ODLT7BLmL._SX466_.jpg'
      },
      volume: 50,
      time: 50, // timeline
      playback: false,
      enableSpotifyAuth: false,
      tabValue: 0,
      sync: {
        status: 'disconnected',
        timestamp: Date.now()
      }
    };
    const events = {
      enableSpotifyAuth: (enable) => {
          // true = spotify button active
          this.setState({ enableSpotifyAuth: enable });
      }, initialized: function (status) {
          // called when player initializes
          console.log("Status: %s", JSON.stringify(status));
      }, pause: () => {
          // called when player pauses
          this.setState({ playback: false });
      }, play: () => {
          // called when player starts playing
          this.setState({ playback: true });
      }, position: (position) => {
          // called when timeline of song changes
          this.setState({ time: position * 100 });
      }, song: function (song) {
          // called when new song data is available
          console.log(song)
      }, stop: function () {
          // called when player stops playing
          console.log("STOP")
      }, volume: function (volume) {
          // called when volume changes
          console.log("VOLUME: " + volume)
      }, queueUpdate: (queue) => {
          // called when queue updates
          songqueue = queue;
      }
    };
    this.events = events;
    //this.sync = songrequestSync;
  }

  componentDidMount() {
    window.TSRI.init(this.props.jwt, 'ws://srv-01.twasi.net:8090', this.events);

    /*
    this.sync.setTwitchId(this.props.twitchid);
    this.sync.setJwtToken(this.props.jwt);
    this.sync.connect();

    this.sync.onStatus = status =>
      this.setState({ sync: { ...this.state.sync, status } });
    this.sync.onKeepalive = timestamp =>
      this.setState({ sync: { ...this.state.sync, timestamp } });

    this.sync.requestStatus();
    */
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleChangePlayback = () => {
    this.setState({ playback: !this.state.playback })
    if(!this.state.playback){
      window.TSRI.playback.play({provider:1,uri:"spotify:track:3ztCt91U2wGkDZuzbCwH6H"})
    } else {
      window.TSRI.playback.pause()
    }
    this.setState({ song: {
      provider: 'spotify',
      requester: 'John Doe',
      timestamp: Date.now(),
      title: 'Snow (Hey Oh)',
      artist: 'Red Hot Chilli Peppers',
      media: 'https://images-na.ssl-images-amazon.com/images/I/91ODLT7BLmL._SX466_.jpg'
    }})
    /*
    if(this.state.song.provider === 'spotify') {
      this.setState({ song: {
        provider: 'youtube',
        requester: 'Blechkelle',
        timestamp: Date.now(),
        title: 'Sin (Official Video)',
        artist: 'Kakkmaddafakka',
        media: 'https://www.fritz.de/content/dam/rbb/frz/aus-plato/35/87/9160_36074.jpg.jpg/rendition=kakkmaddafakkapressefotos2013_1280_36074.jpg/size=708x398.jpg'
      }})
    } else {
      this.setState({ song: {
        provider: 'spotify',
        requester: 'John Doe',
        timestamp: Date.now(),
        title: 'Snow (Hey Oh)',
        artist: 'Red Hot Chilli Peppers',
        media: 'https://images-na.ssl-images-amazon.com/images/I/91ODLT7BLmL._SX466_.jpg'
      }})
    }
    */
  }

  handleCloseSongrequestSettings = () => {
    this.setState({ openSongrequestSettings: false });
  };

  handleTabChange = (event, tabValue) => {
    this.setState({
      tabValue,
    });
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
            <FormattedMessage id="songrequest.browsersupport.title" />
          </h3>
          <small>
            <FormattedMessage id="songrequest.browsersupport.subtitle" />
          </small>
        </Typography>
      </Paper>
    );
  }

  renderSongqueue() {
    return songqueue.map(song => (
      <TableRow>
        <TableCell>-</TableCell>
        <TableCell>{song.name}</TableCell>
        <TableCell>{song.artist}</TableCell>
        <TableCell>{song.duration}</TableCell>
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
          <Tooltip title={<FormattedMessage id="songrequest.table_fav" />} placement="top">
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
    ));
  }

  render() {
    const { volume, time } = this.state;
    return (
      <div className="pageContent">
        {/*<SongrequestPlayer/>*/}
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.songrequests" /></Typography>
        </Breadcrumbs>
        {/*
        <span style={{ float: 'right', position: 'relative', top: '-23px' }}>
          <SongrequestConnectionStatus
            status={this.state.sync.status}
            timestamp={new Date(this.state.sync.timestamp).toLocaleString()}
          />
        </span>
        */}
        {isValidBrowser() &&
        <Paper className="pageContainer" style={{ padding: '0px', position: 'relative' }}>
          <div
            style={{
              width: '100%',
              height: '248px',
              position: 'absolute',
              backgroundImage: `url(${this.state.song.media})`,
              opacity: '.1',
              zIndex: '10'
            }}
          >
          </div>
          <Grid container spacing={3} style={{ padding: '12px 23px', position: 'relative', zIndex: '20' }}>
            <Grid item>
              <div className="songrequestsCoverImage">
                {this.state.song.provider === 'spotify' &&
                  <img
                    src={this.state.song.media}
                    alt="albumcover"
                    style={{ height: '200px', width: '200px' }}
                />}
                {this.state.song.provider === 'youtube' &&
                <iframe title="ytplayer" id="ytplayer" type="text/html" height="200" width="355"
                  src="http://www.youtube.com/embed/RVfwQylsAq4?autoplay=1&showinfo=0&controls=0"
                  frameborder="0"
                />}
              </div>
            </Grid>
            <Grid item style={{ position: 'relative' }}>
              <Typography color="textPrimary">
                <h1 style={{ padding: '0px', margin: '0px' }}>
                  {this.state.song.title}
                </h1>
                <h3 style={{ padding: '0px', margin: '0px' }}>
                  {this.state.song.artist}
                </h3>
                <small style={{ position: 'absolute', bottom: '18px' }}>
                  <em>
                    <FormattedMessage id="songrequest.requestby" /> <b>{this.state.song.requester}</b><br/>
                    <FormattedMessage id="songrequest.request.at" /> {new Date(this.state.song.timestamp).toLocaleString()}<br/>
                    <FormattedMessage id="songrequest.request.provided_by" /> {this.state.song.provider}
                  </em>
                </small>
              </Typography>
            </Grid>
            <span style={{ position: 'absolute', right: '33px', bottom: '23px' }}>
              <Button style={{ marginLeft: '15px' }} color="secondary" variant="contained">
                <FormattedMessage id="songrequest.request.block_song" />
              </Button>
              <Button style={{ marginLeft: '15px' }} color="secondary" variant="contained">
                <FormattedMessage id="songrequest.request.block_user" />
              </Button>
            </span>
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
            <Grid item xs={5} style={{ verticalAlign: 'middle' }}>
              <Slider
                style={{
                  width: '70%',
                  marginTop: '6px',
                  float: 'left'
                }}
                value={time}
                onChange={this.handleTimelineChange}
                valueLabelDisplay="auto"
              />
              <Typography style={{ float: 'left', minWidth: '80px', marginLeft: '10px', paddingTop: '7px' }} color="textPrimary">
                <small>00:00 / 00:00</small>
              </Typography>
            </Grid>
            <Grid item style={{ verticalAlign: 'middle' }}>
              <div style={{ textAlign: 'right', float: 'right', paddingTop: '5px' }}>
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
              </div>
            </Grid>
            <Grid item style={{ position: 'absolute', right: '23px' }}>
              <Fab style={{ marginLeft: '15px' }} size="small" color="primary" aria-label="settings" onClick={() => this.setState({ openSongrequestSettings: true })}>
                <Icon className="actionButtons">settings</Icon>
              </Fab>
            </Grid>
          </Grid>
        </Paper>}
        {isValidBrowser() &&
        <Paper className="pageContainer" style={{ padding: '0px', marginTop: '33px' }}>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            value={this.state.tabValue}
            onChange={this.handleTabChange}
          >
            <Tab label={<FormattedMessage id="songrequest.tab.wishes" />} />
            <Tab label={<FormattedMessage id="songrequest.tab.history" />} />
          </Tabs>
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
              {this.renderSongqueue()}
            </TableBody>
          </Table>
        </Paper>}
        {this.state.openSongrequestSettings &&
          <SongrequestSettings
            open
            enableSpotifyAuth={this.state.enableSpotifyAuth}
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
