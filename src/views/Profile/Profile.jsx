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
                        <TableCell>Account Löschen</TableCell>
                        <TableCell>
                          <RaisedButton
                            backgroundColor="#ffffff"
                            labelColor="#c14b4b"
                            label="Account Löschen"
                          />
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
                Hier kannst du deine Social Media Pages verlinken. Deine Social
                Media Pages werden auf der Startseite, auf Leaderboards und auf
                deinem Profil angezeigt.
              </small>
              <Divider className="marginDivider" />
              <Row>
                <Col sm={6}>
                  <RaisedButton
                    backgroundColor="#1da1f2"
                    labelColor="#fff"
                    label="Twitter"
                    fullWidth={true}
                    style={{ boxShadow: 'none' }}
                  />
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '5px' }}>Noch nicht verbunden.</div>
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
                  />
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '5px' }}>Noch nicht verbunden.</div>
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
                  />
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '5px' }}>Noch nicht verbunden.</div>
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
                  />
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '5px' }}>Noch nicht verbunden.</div>
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
                  />
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '5px' }}>Noch nicht verbunden.</div>
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
                  />
                </Col>
                <Col sm={6}>
                  <div style={{ marginTop: '5px' }}>Noch nicht verbunden.</div>
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
