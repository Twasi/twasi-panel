import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'react-grid-system';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import twitterlogo from '../common/resources/twitter.svg';
import facebooklogo from '../common/resources/facebook.svg';
import googlelogo from '../common/resources/google.svg';
//import spotifylogo from '../common/resources/spotify.svg';
import soundcloudlogo from '../common/resources/soundcloud.svg';
import telegramlogo from '../common/resources/telegram.svg';

import './_style.css';

class SocialMedia extends Component {

  render() {
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="profile.social" />
            </h4>
            <small>
              <FormattedMessage id="profile.social_subline" />
            </small>
          </Typography>
          <div className="anim">
            <Row style={{ marginTop: '25px' }}>
              <Col sm={6}>
                <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#1da1f2'
                    }}
                  >
                    <img
                      className="socialIcon"
                      src={twitterlogo}
                      alt="twitter-logo"
                    />
                  </span>
                  <small>
                    Twitter
                  </small>
                </Button>
              </Col>
              <Col sm={6}>
                <div style={{ marginTop: '3px' }}>
                  <small>
                    <FormattedMessage id="profile.social_notconnected" />
                  </small>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={6}>
                <Button disabled fullWidth variant="contained" color="default" style={{ boxShadow: 'none' }}>
                  <small>
                    Telegram
                  </small>
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#0088cc'
                    }}
                  >
                    <img
                      className="socialIcon"
                      src={telegramlogo}
                      alt="telegram-logo"
                    />
                  </span>
                </Button>
              </Col>
              <Col sm={6}>
                <div style={{ marginTop: '3px' }}>
                  <small>
                    <FormattedMessage id="profile.social_notconnected" />
                  </small>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={6}>
                <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                  <small>
                    Facebook
                  </small>
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#3b5998'
                    }}
                  >
                    <img
                      className="socialIcon"
                      src={facebooklogo}
                      alt="facebook-logo"
                    />
                  </span>
                </Button>
              </Col>
              <Col sm={6}>
                <div style={{ marginTop: '3px' }}>
                  <small>
                    <FormattedMessage id="profile.social_notconnected" />
                  </small>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={6}>
                <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                  <small>
                    Google
                  </small>
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#db3236'
                    }}
                  >
                    <img
                      className="socialIcon"
                      src={googlelogo}
                      alt="google-logo"
                    />
                  </span>
                </Button>
              </Col>
              <Col sm={6}>
                <div style={{ marginTop: '3px' }}>
                  <small>
                    <FormattedMessage id="profile.social_notconnected" />
                  </small>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={6}>
                <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                  <small>
                    Soundcloud
                  </small>
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#ff8800'
                    }}
                  >
                    <img
                      className="socialIcon"
                      src={soundcloudlogo}
                      alt="soundcloud-logo"
                    />
                  </span>
                </Button>
              </Col>
              <Col sm={6}>
                <div style={{ marginTop: '3px' }}>
                  <small>
                    <FormattedMessage id="profile.social_notconnected" />
                  </small>
                </div>
              </Col>
            </Row>
            {/*
            <br />
            <Row>
              <Col sm={6}>
                <Button
                  onClick={() => { this.handleAuthentication(spotify.spotifyUri + "?environment=" + window.location + "&jwt=" + jwt) }}
                  fullWidth
                  disabled={spotify.spotify !== null}
                  variant="contained"
                  style={{ boxShadow: 'none' }}>
                  <small>
                    {spotify.spotify === null ? "Spotify" : spotify.spotify.userName}
                  </small>
                  <span
                    style={{
                      position: 'absolute',
                      left: '0',
                      width: '32px',
                      height: '32px',
                      textAlign: 'center',
                      backgroundColor: '#1db954'
                    }}
                  >
                    <img
                      className="socialIcon"
                      src={spotifylogo}
                      alt="spotify-logo"
                    />
                  </span>
                </Button>
              </Col>
              <Col sm={6}>
                {spotify.spotify === null &&
                  <div style={{ float: 'left', marginTop: '3px' }}>
                      <small>
                        <FormattedMessage id="profile.social_notconnected" />
                      </small>
                  </div>
                } {spotify.spotify !== null &&
                  <div style={{ float: 'left' }}>
                    <Button color="primary" size="small">
                      <FormattedMessage id="profile.social_permissions" />
                    </Button>
                    <Button
                      onClick={() => {
                        updateSpotifyDisconnect();
                        setTimeout(function() {
                            updateSpotifyAccount();
                        }, 500)
                      }}
                      color="secondary"
                      size="small">
                      <FormattedMessage id="profile.social_disconnect" />
                    </Button>
                  </div>
                }
              </Col>
            </Row>
            */}
          </div>
        </Paper>
      </div>
    );
  }
}

export default SocialMedia;
