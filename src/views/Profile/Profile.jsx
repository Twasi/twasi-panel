import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Row, Col } from 'react-grid-system';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

import twitterlogo from '../common/resources/twitter.svg';
import facebooklogo from '../common/resources/facebook.svg';
import youtubelogo from '../common/resources/youtube.svg';
import spotifylogo from '../common/resources/spotify.svg';
import soundcloudlogo from '../common/resources/soundcloud.svg';
import telegramlogo from '../common/resources/telegram.svg';

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
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.profile" /></Typography>
        </Breadcrumbs>
        <Row>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">
                <FormattedMessage id="profile.your_data" />
                <span style={{ float: 'right' }}>
                  <Button variant="contained" color="primary">
                    <Icon style={{ marginRight: '5px' }}>cached</Icon>
                    <FormattedMessage id="profile.your_data_refreshbutton" />
                  </Button>
                </span>
              </h4>
              <small>
                <FormattedMessage id="profile.your_data_subline" />
              </small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardContent className="pluginCardContent">
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
                </CardContent>
              </Card>
            </Paper>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">
                <FormattedMessage id="profile.badges" />
                <span style={{ float: 'right' }}>
                  <Button variant="contained" color="primary">
                    <FormattedMessage id="profile.badges_savebutton" />
                  </Button>
                </span>
              </h4>
              <small>
                <FormattedMessage id="profile.badges_subline" />
              </small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardContent className="pluginCardContent">
                  <h4 className="pageContainerTitle">
                    <FormattedMessage id="profile.badges_yourbadges" />
                  </h4>
                  <br />
                  <Divider />
                  <br />
                  <Tooltip title="Twasi Team" placement="top">
                    <IconButton>
                      <img
                        src="https://twasi.net/public/img/badges/team_badge.svg"
                        alt="Badge"
                        className="profileBadge"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Twasi Beta" placement="top">
                    <IconButton>
                      <img
                        src="https://twasi.net/public/img/badges/beta_badge.svg"
                        alt="Badge"
                        className="profileBadge"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Gamescom 2017" placement="top">
                    <IconButton>
                      <img
                        src="https://twasi.net/public/img/badges/gamescom_badge_blue.svg"
                        alt="Badge"
                        className="profileBadge"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Gamescom 2018" placement="top">
                    <IconButton>
                      <img
                        src="https://twasi.net/public/img/badges/gamescom_badge_blue18.svg"
                        alt="Badge"
                        className="profileBadge"
                      />
                    </IconButton>
                  </Tooltip>
                </CardContent>
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
                <Col sm={6}>
                  <Button disabled fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
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
                      <b>@Blechkelle</b>{' '}
                    </small>
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button color="primary" size="small">
                    <FormattedMessage id="profile.social_permissions" />
                  </Button>
                  <Button color="secondary" size="small">
                    <FormattedMessage id="profile.social_disconnect" />
                  </Button>
                </Col>
              </Row>
              <br />
              <Row>
                <Col sm={6}>
                  <Button fullWidth variant="contained" color="default" style={{ boxShadow: 'none' }}>
                    <small>
                      Telegram
                    </small>
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
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
                  <Button fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                    <small>
                      Facebook
                    </small>
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
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
                  <Button fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                    <small>
                      Youtube
                    </small>
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
                        backgroundColor: '#ff0000'
                      }}
                    >
                      <img
                        className="socialIcon"
                        src={youtubelogo}
                        alt="youtube-logo"
                      />
                    </span>
                  </Button>
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
                  <Button fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                    <small>
                      Soundcloud
                    </small>
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
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
                  <Button fullWidth variant="contained" style={{ boxShadow: 'none' }}>
                    <small>
                      Spotify
                    </small>
                    <span
                      style={{
                        position: 'absolute',
                        left: '0',
                        width: '36px',
                        height: '36px',
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
