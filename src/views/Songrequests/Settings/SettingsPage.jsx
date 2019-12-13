import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Row, Col } from 'react-grid-system';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

class SettingsPage extends Component {

  constructor(props) {
    const { enableSpotifyAuth, settings } = props;
    super(props);
    this.state = {
      songs_per_broadcaster: settings.maxRequests.BROADCASTER === -1 ? 11 : settings.maxRequests.BROADCASTER,
      songs_per_mod: settings.maxRequests.MODERATOR === -1 ? 11 : settings.maxRequests.MODERATOR,
      songs_per_sub: settings.maxRequests.SUBSCRIBERS === -1 ? 11 : settings.maxRequests.SUBSCRIBERS,
      songs_per_viewer: settings.maxRequests.VIEWER === -1 ? 11 : settings.maxRequests.VIEWER,
      enableSpotifyAuth: enableSpotifyAuth,
    };
  }

  authenticateSpotify = () => {
    window.TSRI.spotifyAuth.init()
    this.setState({ enableSpotifyAuth: false });
  }

  unAuthenticateSpotify = () => {
    window.TSRI.spotifyAuth.remove()
    this.setState({ enableSpotifyAuth: true });
  }

  handleSongsPerBroadcaster = (event, songs_per_broadcaster) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ songs_per_broadcaster });
  };

  handleSetSongsPerBroadcaster = (event, songs_per_broadcaster) => {
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
    if(songs_per_viewer !== 11) {
      window.TSRI.playback.setSettings({maxRequests: {VIEWER: songs_per_viewer}})
    } else {
      window.TSRI.playback.setSettings({maxRequests: {VIEWER: -1}})
    }
  };

  render() {
    return (
      <div className="pageContent">
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
                <Switch disabled={this.state.enableSpotifyAuth} checked={true} color="primary" />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col sm={12}>
                {!this.state.enableSpotifyAuth &&
                <Button disabled={this.state.enableSpotifyAuth} onClick={this.unAuthenticateSpotify} color="secondary" variant="contained">
                  <FormattedMessage id="songrequest.settings.spotify.disconnect" />
                </Button>}
                {this.state.enableSpotifyAuth &&
                <Button disabled={!this.state.enableSpotifyAuth} onClick={this.authenticateSpotify} color="primary" variant="contained">
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
      </div>
    );
  }
}

export default SettingsPage;
