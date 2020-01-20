import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { Row, Col } from 'react-grid-system';

import './_style.css';

import { authSelectors } from '../../state/auth';

class PublicProfile extends Component {

  state = {
    profileActive: false
  };

  handleProfileActive = (event) => {
    this.setState({
      profileActive: event.target.checked
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="profile.public_profile" />
            </h4>
            <small>
              <FormattedMessage id="profile.public_profile.subtitle" />
            </small>
          </Typography>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent anim">
              <Typography component={"div"}>
                <TextField
                  label={<FormattedMessage id="profile.public_profile.your_profile" />}
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="send-support-message"
                          onClick={e => {
                            navigator.clipboard.writeText(`${window.location.origin + "/profile/" + user.name}`);
                            e.stopPropagation();
                          }}
                        >
                          <Icon>
                            link
                          </Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position="start">
                        <RouterLink to={"/profile/" + user.name}>
                          {window.location.origin + "/profile/" + user.name}
                        </RouterLink>
                      </InputAdornment>
                    )
                  }}
                />
              </Typography>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent anim">
              <Row>
                <Col style={{ textAlign: 'left' }} sm={6}>
                  <Typography style={{ padding: '7px' }}>
                    <b><FormattedMessage id="profile.public_profile.activate_public" /></b>
                  </Typography>
                </Col>
                <Col style={{ textAlign: 'right' }} sm={6}>
                  <Switch checked={this.state.profileActive} color="primary" onChange={this.handleProfileActive} />
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col style={{ textAlign: 'left' }} sm={6}>
                  <Typography style={{ padding: '7px' }}>
                    <small><FormattedMessage id="profile.public_profile.activate_leaderboard" /></small>
                  </Typography>
                </Col>
                <Col style={{ textAlign: 'right' }} sm={6}>
                  <Switch disabled={!this.state.profileActive} color="primary" />
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: 'left' }} sm={6}>
                  <Typography style={{ padding: '7px' }}>
                    <small><FormattedMessage id="profile.public_profile.activate_commands" /></small>
                  </Typography>
                </Col>
                <Col style={{ textAlign: 'right' }} sm={6}>
                  <Switch disabled={!this.state.profileActive} color="primary" />
                </Col>
              </Row>
              <Row>
                <Col style={{ textAlign: 'left' }} sm={6}>
                  <Typography style={{ padding: '7px' }}>
                    <small><FormattedMessage id="profile.public_profile.activate_quotes" /></small>
                  </Typography>
                </Col>
                <Col style={{ textAlign: 'right' }} sm={6}>
                  <Switch disabled={!this.state.profileActive} color="primary" />
                </Col>
              </Row>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
});

export default withRouter(connect(mapStateToProps)(PublicProfile));
