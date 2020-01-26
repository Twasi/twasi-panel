import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { authSelectors } from '../../state/auth';
import { twitchSelectors, twitchOperations } from '../../state/integrations/twitch';
import './_style.css';

class OwnBotAccount extends Component {

  handleAuthentication = (uri) => {
    window.location = encodeURI(uri);
  }

  handleProfileActive = (event) => {
    this.setState({
      profileActive: event.target.checked
    });
  }

  render() {
    //const { twitch, updateTwitchDisconnect, updateTwitchAccount, jwt } = this.props;
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="profile.own_bot.title" />
            </h4>
            <small>
              <FormattedMessage id="profile.own_bot.subtitle" />
            </small>
          </Typography>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent">
              <Grid container spacing={0}>
                <Grid item md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography>
                    Twasibot
                    {/*twitch.twitch === null ? "Twasibot" : twitch.twitch.userName*/}
                  </Typography>
                </Grid>
                <Grid item md={6} style={{ textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled>
                    <FormattedMessage id="profile.own_bot.connect" />
                  </Button>
                  {/*twitch.twitch === null &&
                    <Button
                      onClick={() => { this.handleAuthentication(twitch.twitchUri + "?environment=" + window.location + "&jwt=" + jwt) }}
                      variant="contained"
                      color="primary"
                      disabled>
                      <FormattedMessage id="profile.own_bot.connect" />
                    </Button>}
                  {twitch.twitch !== null &&
                    <Button
                      onClick={() => {
                        updateTwitchDisconnect();
                        setTimeout(function() {
                            updateTwitchAccount();
                        }, 500)
                      }}
                      variant="contained"
                      color="secondary">
                      <FormattedMessage id="profile.own_bot.disconnect" />
                    </Button>*/}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateTwitchAccount: () => dispatch(twitchOperations.loadTwitchAccount()),
  updateTwitchAuthUri: () => dispatch(twitchOperations.loadTwitchAuthUri()),
  updateTwitchDisconnect: () => dispatch(twitchOperations.loadTwitchDisconnect())
});

const mapStateToProps = state => ({
  twitch: twitchSelectors.getTwitchAccount(state),
  twitchUri: twitchSelectors.getTwitchAuthUri(state),
  twitchDisconnect: twitchSelectors.getTwitchDisconnect(state),
  jwt: authSelectors.getJwt(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnBotAccount));
