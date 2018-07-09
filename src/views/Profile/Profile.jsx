import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card';
import { Container, Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
// import { Container, Row, Col } from 'react-grid-system';

import twitterlogo from '../common/resources/twitter.svg';
import googlelogo from '../common/resources/google.svg';
import facebooklogo from '../common/resources/facebook.svg';
import youtubelogo from '../common/resources/youtube.svg';
import instagramlogo from '../common/resources/instagram.svg';
import snapchatlogo from '../common/resources/snapchat.svg';
import spotifylogo from '../common/resources/spotify.svg';
import soundcloudlogo from '../common/resources/soundcloud.svg';
import telegramlogo from '../common/resources/telegram.svg';
import githublogo from '../common/resources/github.svg';

import { statusSelectors, statusOperations } from '../../state/status';
import './_style.css';

class Profile extends Component {
  /* componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  } */

  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.profile" />
        </h2>

        <Row>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">
                Deine Twasi Daten{' '}
                <span style={{ float: 'right' }}>
                  <RaisedButton
                    backgroundColor="#00aeae"
                    labelColor="#ffffff"
                    label="Refresh"
                  />
                </span>
              </h4>
              <small>Hier findest du deine Twasi Daten.</small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardText>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Twitch Name</TableCell>
                        <TableCell>
                          <b>John Doe</b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Twitch ID</TableCell>
                        <TableCell>
                          <b>********</b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Twasi Rang</TableCell>
                        <TableCell>
                          <b>Streamer</b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Registriert seit</TableCell>
                        <TableCell>
                          <b>01.01.1997</b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ borderBottom: '0px' }}>
                          Löschen
                        </TableCell>
                        <TableCell style={{ borderBottom: '0px' }}>
                          <a href="#" className="red">
                            Account Löschen
                          </a>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardText>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">
                Badges
                <span style={{ float: 'right' }}>
                  <RaisedButton
                    backgroundColor="#00aeae"
                    labelColor="#ffffff"
                    label="Speichern"
                  />
                </span>
              </h4>
              <small>
                Hier kannst du dein Aussehen in Leaderboards anpassen.<br /> Du
                kannst bis zu 3 Badges gleichzeitig auswählen.
              </small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardText>
                  <h4 className="pageContainerTitle">Deine Badges</h4>
                  <Divider />
                  <br />
                  <img
                    src="https://twasi.net/public/img/badges/team_badge.svg"
                    alt="Badge"
                    style={{ height: '35px', margin: '0px 10px 0px 10px' }}
                  />
                  <img
                    src="https://twasi.net/public/img/badges/beta_badge.svg"
                    alt="Badge"
                    style={{ height: '35px', margin: '0px 10px 0px 10px' }}
                  />
                  <img
                    src="https://twasi.net/public/img/badges/gamescom_badge_blue.svg"
                    alt="Badge"
                    style={{ height: '35px', margin: '0px 10px 0px 10px' }}
                  />
                  <img
                    src="https://twasi.net/public/img/badges/gamescom_badge_blue18.svg"
                    alt="Badge"
                    style={{ height: '35px', margin: '0px 10px 0px 10px' }}
                  />
                </CardText>
              </Card>
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Social Media</h4>
              <small>
                Hier kannst du deine Social Media Pages verlinken.<br /> Plugins
                können mit deiner Zustimmung auf bestimmte Daten der verbundenen
                Accounts zurückgreifen.
              </small>
              <Divider className="marginDivider" />
              <Row>
                <Col sm={12}>
                  <RaisedButton
                    backgroundColor="#1da1f2"
                    labelColor="#fff"
                    disabled={true}
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#137cbd'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={twitterlogo}
                        alt="twitter-logo"
                      />
                    </span>
                    <small>
                      Verbunden als <b>@Blechkelle</b>.{' '}
                      <a style={{ color: '#e53935' }} href="#">
                        Trennen
                      </a>{' '}
                      <a style={{ color: '#00aeae' }} href="#">
                        Berechtigungen
                      </a>
                    </small>
                  </RaisedButton>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#d9432f"
                    labelColor="#ffffff"
                    label="Google"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#a23425'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={googlelogo}
                        alt="google-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#0088cc"
                    labelColor="#ffffff"
                    label="Telegram"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#006394'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={telegramlogo}
                        alt="telegram-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#6ae368"
                    labelColor="#ffffff"
                    label="Spotify"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#52b550'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={spotifylogo}
                        alt="spotify-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#f50"
                    labelColor="#ffffff"
                    label="Soundcloud"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#bf4000'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={soundcloudlogo}
                        alt="soundcloud-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#3b5998"
                    labelColor="#ffffff"
                    label="Facebook"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#2a406d'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={facebooklogo}
                        alt="facebook-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#FF0000"
                    labelColor="#ffffff"
                    label="Youtube"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#d20202'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={youtubelogo}
                        alt="youtube-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#962fbf"
                    labelColor="#ffffff"
                    label="Instagram"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#6b2288'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={instagramlogo}
                        alt="instagram-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#FFFB00"
                    labelColor="#000000"
                    label="Snapchat"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#d6d300'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={snapchatlogo}
                        alt="snapchat-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#333"
                    labelColor="#FFFFFF"
                    label="Github"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#000000'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={githublogo}
                        alt="github-logo"
                      />
                    </span>
                  </RaisedButton>
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '6px' }}>
                    <small>Noch nicht verbunden.</small>
                  </div>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

Profile.propTypes = {};

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
