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
    const { enableSpotifyAuth } = props;
    super(props);
    this.state = {
      tabValue: 0,
      songs_per_user: 5,
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

  handleSongsPerUser = (event, songs_per_user) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_user });
  };

  handleBalanceChange = (event, balance) => {
      this.setState({balance});
      this.setState({changeBalanceSlider: true});
  };

  handleBalanceSet = (event, balance) => {
      this.setState({balance});
      this.setState({changeBalanceSlider: false});
  };

  handleChangeSpotifyPlayback = () => {
      this.setState({spotifyplayback: !this.state.spotifyplayback})
      if (!this.state.spotifyplayback) {
          //play
      } else {
          //pause
      }
  };

  handleChangeYoutubePlayback = () => {
      this.setState({youtubeplayback: !this.state.youtubeplayback})
      if (!this.state.youtubeplayback) {
          //play
      } else {
          //pause
      }
  };

  render() {
    const { classes, onClose, ...other } = this.props;
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
            {/*
            <Card style={{ marginTop: '25px' }} className="pluginCard">
              <CardContent className="pluginCardContent anim">
                <Row>
                  <Col style={{ textAlign: 'left' }} sm={12}>
                    <Typography component={"div"}>
                      <h4 className="pageContainerTitle"><FormattedMessage id="songrequest.settings.songs_per_user.title" /> {this.state.songs_per_user}</h4>
                    </Typography>
                    <Slider
                      style={{ padding: '22px 0px' }}
                      aria-labelledby="label"
                      value={this.state.songs_per_user}
                      min={0}
                      max={10}
                      step={1}
                      onChange={this.handleSongsPerUser}
                    />
                    <Typography>
                      <small><FormattedMessage id="songrequest.settings.songs_per_user.helpertext" /></small>
                    </Typography>
                  </Col>
                </Row>
              </CardContent>
            </Card>
            */}
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
                          {this.state.balance >= 0 && this.state.balance <= 0.3 && 'volume_up'}
                          {this.state.balance >= 0.3 && this.state.balance <= 0.6 && 'volume_down'}
                          {this.state.balance >= 0.6 && this.state.balance <= 1 && 'volume_mute'}
                      </Icon>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                      <Icon>
                          {this.state.balance === 1 && <img alt="volume_max" src={gachiHYPER} height="24px"/>}
                          {this.state.balance >= 0 && this.state.balance <= 0.3 && 'volume_mute'}
                          {this.state.balance >= 0.3 && this.state.balance <= 0.6 && 'volume_down'}
                          {this.state.balance >= 0.6 && this.state.balance <= 1 && 'volume_up'}
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
