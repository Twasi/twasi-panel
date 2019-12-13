import React from 'react';
import { FormattedMessage } from 'react-intl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Row, Col } from 'react-grid-system';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';

import gachiHYPER from '../common/resources/gachiHYPER.gif';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={0}>{children}</Box>
        </Typography>
    );
}

class SongrequestSettings extends React.Component {

  constructor(props) {
    const { enableSpotifyAuth, settings } = props;
    super(props);
    this.state = {
      tabValue: 0,
      songs_per_broadcaster: settings.maxRequests.BROADCASTER === -1 ? 11 : settings.maxRequests.BROADCASTER,
      songs_per_mod: settings.maxRequests.MODERATOR === -1 ? 11 : settings.maxRequests.MODERATOR,
      songs_per_sub: settings.maxRequests.SUBSCRIBERS === -1 ? 11 : settings.maxRequests.SUBSCRIBERS,
      songs_per_viewer: settings.maxRequests.VIEWER === -1 ? 11 : settings.maxRequests.VIEWER,
      enableSpotify: enableSpotifyAuth,
      changeBalanceSlider: false,
      balance: 0.5,
      spotifyplayback: false,
      youtubeplayback: false
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleTabChange = (event, tabValue) => {
    this.setState({
      tabValue,
    });
  };

  authenticateSpotify = () => {
    window.TSRI.spotifyAuth.init()
    this.setState({ enableSpotify: false });
  }

  unAuthenticateSpotify = () => {
    window.TSRI.spotifyAuth.remove()
    this.setState({ enableSpotify: true });
  }

  handleSongsPerBroadcaster = (event, songs_per_broadcaster) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_broadcaster });
  };

  handleSetSongsPerBroadcaster = (event, songs_per_broadcaster) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_broadcaster });
    if(songs_per_broadcaster !== 11) {
      window.TSRI.playback.setSettings({maxRequests: {BROADCASTER: songs_per_broadcaster}})
    } else {
      window.TSRI.playback.setSettings({maxRequests: {BROADCASTER: -1}})
    }
  };

  handleSongsPerMod = (event, songs_per_mod) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_mod });
  };

  handleSetSongsPerMod = (event, songs_per_mod) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_mod });
    if(songs_per_mod !== 11) {
      window.TSRI.playback.setSettings({maxRequests: {MODERATOR: songs_per_mod}})
    } else {
      window.TSRI.playback.setSettings({maxRequests: {MODERATOR: -1}})
    }
  };

  handleSongsPerSub = (event, songs_per_sub) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_sub });
  };

  handleSetSongsPerSub = (event, songs_per_sub) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_sub });
    if(songs_per_sub !== 11) {
      window.TSRI.playback.setSettings({maxRequests: {SUBSCRIBERS: songs_per_sub}})
    } else {
      window.TSRI.playback.setSettings({maxRequests: {SUBSCRIBERS: -1}})
    }
  };

  handleSongsPerViewer = (event, songs_per_viewer) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_viewer });
  };

  handleSetSongsPerViewer = (event, songs_per_viewer) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_viewer });
    if(songs_per_viewer !== 11) {
      window.TSRI.playback.setSettings({maxRequests: {VIEWER: songs_per_viewer}})
    } else {
      window.TSRI.playback.setSettings({maxRequests: {VIEWER: -1}})
    }
  };

  handleBalanceChange = (event, balance) => {
      this.setState({balance});
      this.setState({changeBalanceSlider: true});
  };

  handleBalanceSet = (event, balance) => {
      this.setState({balance});
      this.setState({changeBalanceSlider: false});
  };

  handleChangeSpotifyPlayback = async () => {
      this.setState({spotifyplayback: !this.state.spotifyplayback})
      if (!this.state.spotifyplayback) {
          await window.TSRI.playback.spotify.preview();
          this.setState({spotifyplayback: !this.state.spotifyplayback})
      }
  };

  handleChangeYoutubePlayback = async () => {
      this.setState({youtubeplayback: !this.state.youtubeplayback})
      if (!this.state.youtubeplayback) {
        await window.TSRI.playback.youtube.preview();
        this.setState({spotifyplayback: !this.state.spotifyplayback})
      }
  };

  render() {
    const { classes, onClose, settings, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        scroll="body"
        {...other}
      >
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={<FormattedMessage id="songrequest.settings.tab.settings" />} />
          <Tab label={<FormattedMessage id="songrequest.settings.tab.balance" />} />
        </Tabs>
        <DialogContent>
          <TabPanel value={this.state.tabValue} index={0}>
            <Typography component={"div"}>
              <h4 className="pageContainerTitle">
                <FormattedMessage id="songrequest.settings.title" />
              </h4>
              <small>
                <FormattedMessage id="songrequest.settings.subtitle" />
              </small>
            </Typography>
            <Card style={{ marginTop: '25px' }} className="pluginCard">
              <CardContent className="pluginCardContent anim">
                <Row>
                  <Col style={{ textAlign: 'left' }} sm={8}>
                    <Typography component={"div"}>
                      <h4 className="pageContainerTitle">
                        <FormattedMessage id="songrequest.settings.spotify.title" />
                      </h4>
                      <small>
                        <FormattedMessage id="songrequest.settings.spotify.subtitle" />
                      </small>
                    </Typography>
                  </Col>
                  <Col style={{ textAlign: 'right' }} sm={4}>
                    <Switch disabled={this.state.enableSpotify} checked={true} color="primary" />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col sm={12}>
                    {!this.state.enableSpotify &&
                    <Button disabled={this.state.enableSpotify} onClick={this.unAuthenticateSpotify} color="secondary" variant="contained">
                      <FormattedMessage id="songrequest.settings.spotify.disconnect" />
                    </Button>}
                    {this.state.enableSpotify &&
                    <Button disabled={!this.state.enableSpotify} onClick={this.authenticateSpotify} color="primary" variant="contained">
                      <FormattedMessage id="songrequest.settings.spotify.connect" />
                    </Button>}
                  </Col>
                </Row>
              </CardContent>
            </Card>
            <Card style={{ marginTop: '25px' }} className="pluginCard">
              <CardContent className="pluginCardContent anim">
                <Row>
                  <Col style={{ textAlign: 'left' }} sm={8}>
                    <Typography component={"div"}>
                      <h4 className="pageContainerTitle">
                        <FormattedMessage id="songrequest.settings.youtube.title" />
                      </h4>
                      <small>
                        <FormattedMessage id="songrequest.settings.youtube.subtitle" />
                      </small>
                    </Typography>
                  </Col>
                  <Col style={{ textAlign: 'right' }} sm={4}>
                    <Switch checked={true} color="primary" />
                  </Col>
                </Row>
              </CardContent>
            </Card>
            <Card style={{ marginTop: '25px' }} className="pluginCard">
              <CardContent style={{ paddingBottom: '0px' }}>
                <Typography component={"div"}>
                  <h4 className="pageContainerTitle">
                    Du: {this.state.songs_per_broadcaster === 11 ? 'Unendlich' : this.state.songs_per_broadcaster} Songwünsche
                  </h4>
                </Typography>
                <Slider
                  style={{ padding: '22px 0px' }}
                  aria-labelledby="label"
                  value={this.state.songs_per_broadcaster === -1 ? 11 : this.state.songs_per_broadcaster}
                  min={0}
                  max={11}
                  step={1}
                  onChange={this.handleSongsPerBroadcaster}
                  onChangeCommitted={this.handleSetSongsPerBroadcaster}
                />
              </CardContent>
            </Card>
            <Card style={{ marginTop: '25px' }} className="pluginCard">
              <CardContent style={{ paddingBottom: '0px' }}>
                <Typography component={"div"}>
                  <h4 className="pageContainerTitle">
                    Deine Moderatoren: {this.state.songs_per_mod === 11 ? 'Unendlich' : this.state.songs_per_mod} Songwünsche
                  </h4>
                </Typography>
                <Slider
                  style={{ padding: '22px 0px' }}
                  aria-labelledby="label"
                  value={this.state.songs_per_mod === -1 ? 11 : this.state.songs_per_mod}
                  min={0}
                  max={11}
                  step={1}
                  onChange={this.handleSongsPerMod}
                  onChangeCommitted={this.handleSetSongsPerMod}
                />
              </CardContent>
            </Card>
            <Card style={{ marginTop: '25px' }} className="pluginCard">
              <CardContent style={{ paddingBottom: '0px' }}>
                <Typography component={"div"}>
                  <h4 className="pageContainerTitle">
                    Deine Subscriber: {this.state.songs_per_sub === 11 ? 'Unendlich' : this.state.songs_per_sub} Songwünsche
                  </h4>
                </Typography>
                <Slider
                  style={{ padding: '22px 0px' }}
                  aria-labelledby="label"
                  value={this.state.songs_per_sub === -1 ? 11 : this.state.songs_per_sub}
                  min={0}
                  max={11}
                  step={1}
                  onChange={this.handleSongsPerSub}
                  onChangeCommitted={this.handleSetSongsPerSub}
                />
              </CardContent>
            </Card>
            <Card style={{ marginTop: '25px' }} className="pluginCard">
              <CardContent style={{ paddingBottom: '0px' }}>
                <Typography component={"div"}>
                  <h4 className="pageContainerTitle">
                    Deine Zuschauer: {this.state.songs_per_viewer === 11 ? 'Unendlich' : this.state.songs_per_viewer} Songwünsche
                  </h4>
                </Typography>
                <Slider
                  style={{ padding: '22px 0px' }}
                  aria-labelledby="label"
                  value={this.state.songs_per_viewer === -1 ? 11 : this.state.songs_per_viewer}
                  min={0}
                  max={11}
                  step={1}
                  onChange={this.handleSongsPerViewer}
                  onChangeCommitted={this.handleSetSongsPerViewer}
                />
              </CardContent>
            </Card>
            <br />
            Wir ermöglichen die Wiedergabe von Songrequests über den Spotify Musikdienst und über YouTube.
            Bitte beachte, dass die Wiedergabe nicht-eigener Werke im eigenen Livestream eine Copyrightverletzung darstellen kann,
            solange nicht die entsprechenden Lizenzen eingeholt wurden.
            Bei Nichtwissen über die Rechtslage empfehlen wir, auf die Songrequest-Funktion zu verzichten.
            Twasi bzw. das Twasi Team haftet nicht für Verletzungen des Urheberrechts.
          </TabPanel>
          <TabPanel value={this.state.tabValue} index={1}>
            <Typography component={"div"}>
              <h4 className="pageContainerTitle">
                Lautstärke Anpassung
              </h4>
              <small>
                Hier kannst du die Lautstärke Balance zwischen den verschiedenen Platformen anpassen.
              </small>
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Card style={{ marginTop: '25px' }} className="pluginCard">
                  <CardContent className="pluginCardContent">
                    <Typography component={"div"}>
                      <h4 className="pageContainerTitle">
                        Spotify
                      </h4>
                      <small>
                        Spotify Beispiel Sequenz
                      </small>
                    </Typography>
                    <br/>
                    <Fab onClick={this.handleChangeSpotifyPlayback}
                         style={{ boxShadow: 'none'}} color="primary"
                         aria-label="play">
                        <Icon className="actionButtons">{this.state.spotifyplayback ? 'stop' : 'play_arrow'}</Icon>
                    </Fab>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card style={{ marginTop: '25px' }} className="pluginCard">
                  <CardContent className="pluginCardContent">
                    <Typography component={"div"}>
                      <h4 className="pageContainerTitle">
                        YouTube
                      </h4>
                      <small>
                        Youtube Beispiel Sequenz
                      </small>
                    </Typography>
                    <br/>
                    <Fab onClick={this.handleChangeYoutubePlayback}
                         style={{ boxShadow: 'none' }} color="primary"
                         aria-label="play">
                        <Icon className="actionButtons">{this.state.youtubeplayback ? 'stop' : 'play_arrow'}</Icon>
                    </Fab>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className="pluginCard">
                  <CardContent className="pluginCardContent">
                  <Grid container spacing={3}>
                    <Grid item xs={6} style={{ textAlign: 'left' }}>
                      <Icon>
                          {this.state.balance === 0 && <img alt="volume_max" src={gachiHYPER} height="24px"/>}
                          {this.state.balance >= 0 && this.state.balance <= 0.4 && 'volume_up'}
                          {this.state.balance >= 0.4 && this.state.balance <= 0.7 && 'volume_down'}
                          {this.state.balance >= 0.7 && this.state.balance <= 1 && 'volume_mute'}
                      </Icon>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <Icon>
                          {this.state.balance === 1 && <img alt="volume_max" src={gachiHYPER} height="24px"/>}
                        {this.state.balance >= 0.6 && this.state.balance <= 1 && 'volume_up'}
                        {this.state.balance >= 0.3 && this.state.balance <= 0.6 && 'volume_down'}
                        {this.state.balance >= 0 && this.state.balance <= 0.3 && 'volume_mute'}
                      </Icon>
                    </Grid>
                  </Grid>
                  <Slider
                    value={this.state.balance}
                    onChange={this.handleBalanceChange}
                    onChangeCommitted={this.handleBalanceSet}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="off"
                    step={0.01}
                    min={0}
                    max={1}
                  />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
      </Dialog>
    );
  }
}

export default SongrequestSettings;
