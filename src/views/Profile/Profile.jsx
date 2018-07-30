import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Card, CardText } from 'material-ui/Card';
import { Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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

import { authSelectors } from '../../state/auth';
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
                <FormattedMessage id="profile.your_data" />
                <span style={{ float: 'right' }}>
                  <RaisedButton
                    backgroundColor="#00aeae"
                    labelColor="#ffffff"
                    label={
                      <FormattedMessage id="profile.your_data_refreshbutton" />
                    }
                  />
                </span>
              </h4>
              <small>
                <FormattedMessage id="profile.your_data_subline" />
              </small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardText>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <FormattedMessage id="profile.your_data_twitchname" />
                        </TableCell>
                        <TableCell>
                          <b title={this.props.user.name}>
                            {this.props.user.displayName}
                          </b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <FormattedMessage id="profile.your_data_twitchid" />
                        </TableCell>
                        <TableCell>
                          <b>{this.props.user.twitchid}</b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <FormattedMessage id="profile.your_data_rank" />
                        </TableCell>
                        <TableCell>
                          <b>{this.props.user.rank}</b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <FormattedMessage id="profile.your_data_registerdate" />
                        </TableCell>
                        <TableCell>
                          <b>01.01.1997</b>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ borderBottom: '0px' }}>
                          <FormattedMessage id="profile.your_data_delete" />
                        </TableCell>
                        <TableCell style={{ borderBottom: '0px' }}>
                          <a href="#" className="red">
                            <FormattedMessage id="profile.your_data_deletelink" />
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
                <FormattedMessage id="profile.badges" />
                <span style={{ float: 'right' }}>
                  <RaisedButton
                    backgroundColor="#00aeae"
                    labelColor="#ffffff"
                    label={<FormattedMessage id="profile.badges_savebutton" />}
                  />
                </span>
              </h4>
              <small>
                <FormattedMessage id="profile.badges_subline" />
              </small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardText>
                  <h4 className="pageContainerTitle">
                    <FormattedMessage id="profile.badges_yourbadges" />
                  </h4>
                  <Divider />
                  <br />
                  <img
                    src="https://twasi.net/public/img/badges/team_badge.svg"
                    alt="Badge"
                    className="profileBadge selected"
                  />
                  <img
                    src="https://twasi.net/public/img/badges/beta_badge.svg"
                    alt="Badge"
                    className="profileBadge selected"
                  />
                  <img
                    src="https://twasi.net/public/img/badges/gamescom_badge_blue.svg"
                    alt="Badge"
                    className="profileBadge"
                  />
                  <img
                    src="https://twasi.net/public/img/badges/gamescom_badge_blue18.svg"
                    alt="Badge"
                    className="profileBadge"
                  />
                </CardText>
              </Card>
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">
                <FormattedMessage id="profile.social" />
              </h4>
              <small>
                <FormattedMessage id="profile.social_subline" />
              </small>
              <Divider className="marginDivider" />
              <Row>
                <Col sm={12}>
                  <RaisedButton
                    backgroundColor="#1da1f2"
                    labelColor="#fff"
                    disabled
                    fullWidth
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
                      <FormattedMessage id="profile.social_connected_as" />{' '}
                      <b>@Blechkelle</b>.{' '}
                      <a style={{ color: '#e53935' }} href="#">
                        <FormattedMessage id="profile.social_disconnect" />
                      </a>{' '}
                      <a style={{ color: '#00aeae' }} href="#">
                        <FormattedMessage id="profile.social_permissions" />
                      </a>
                    </small>
                  </RaisedButton>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#0088cc"
                    labelColor="#ffffff"
                    label="Telegram"
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
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
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
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
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
                  </div>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#d9432f"
                    labelColor="#ffffff"
                    label="Google"
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
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
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
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
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
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
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
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
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
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
                    fullWidth
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
                    <small>
                      <FormattedMessage id="profile.social_notconnected" />
                    </small>
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

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string,
    twitchid: PropTypes.string,
    rank: PropTypes.string
  })
};

const mapStateToProps = state => ({
  user: authSelectors.getUser(state)
});

export default withRouter(connect(mapStateToProps, null)(Profile));
