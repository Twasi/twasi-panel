import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const userGroups = [
  <ToggleButton className="welcomeToggleButton" key={1} value="viewer">
    <div className="media-body">
      <Typography style={{ color: '#ffffff' }}>
        <h2 style={{ margin: '7px 0px 7px 0px' }}>
          <span>Ich bin Moderator oder Zuschauer</span>
        </h2>
        <small>
          Wähle diese Option, wenn du Moderator oder Zuschauer bei einem Streamer bist, der Twasi als Chatbot nutzt.
        </small>
      </Typography>
    </div>
  </ToggleButton>,
  <ToggleButton className="welcomeToggleButton" key={2} value="streamer">
    <div className="media-body">
      <Typography style={{ color: '#ffffff' }}>
        <h2 style={{ margin: '7px 0px 7px 0px' }}>
          <span>Ich bin Streamer</span>
        </h2>
        <small>
          Wähle diese Option, wenn du Streamer bist und Twasi als Chatbot auf deinem Kanal nutzen möchtest.
          Es folgt die Einrichtung des Bots.
        </small>
      </Typography>
    </div>
  </ToggleButton>
];

class SetupStart extends Component {

  state = {
    userGroup: 'viewer'
  };

  handleUserGroupChange = (event, newUserGroup) => {
    if (newUserGroup == null) {
      this.setState({ userGroup: 'streamer' });
    }
    this.setState({ userGroup: newUserGroup });
  }

  render() {
    return (
      <div>
        <Typography>
          <h2 style={{ marginBottom: '5px' }} className="pageContainerTitle">Willkommen bei Twasi</h2>
          <small>
            <p>
              Wir freuen uns, dass du dich für Twasi als Chatbot entschieden
              hast.<br /> Twasi ist ein Chatbot, der durch Ideen einer
              vielseitigen <b>Open Source</b> Community entstanden ist.
              <br />
              <br />
              Bevor es los geht benötigen wir einige Informationen, die uns
              dabei helfen Twasi für dich optimal anzupassen.
            </p>
            {/*
            <div className="infoAlert">
              Du wurdest von <b>Blechkelle</b> geworben (Reflink).<br />{' '}
              Blechkelle erhällt durch deine Registrierung eine Belohnung.
            </div>
            */}
          </small>
        </Typography>
        <Card style={{ marginTop: '25px' }} className="pluginCard">
          <CardContent className="pluginCardContent anim">
            <Grid container spacing={16} style={{ marginTop: '0px' }}>
              <Grid item xs={12}>
                <ToggleButtonGroup size="small" value={this.state.userGroup} onChange={this.handleUserGroupChange} exclusive>
                  {userGroups}
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default SetupStart;
