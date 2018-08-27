import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Container, Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import Button from '@material-ui/core/Button';
import { Card, CardText } from 'material-ui/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import './_style.css';

class Giveaways extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.giveaways" />
        </h2>
        <Grid container spacing={24}>
           <Grid item lg={6} md={12}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Giveaways</h4>
              <small>Erstelle ein neues Giveaway.</small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardText>
                  <Grid container spacing={16}>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        className="buttonNotToggled"
                        variant="outlined"
                      >
                        <Icon>close</Icon> Staff
                      </Button>
                    </Grid>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        className="buttonNotToggled"
                        variant="outlined"
                      >
                        <Icon>close</Icon> Mods
                      </Button>
                    </Grid>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        className="buttonNotToggled"
                        variant="outlined"
                      >
                        <Icon>close</Icon> Subs
                      </Button>
                    </Grid>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        className="buttonToggled"
                        variant="outlined"
                      >
                        <Icon>check</Icon> User
                      </Button>
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={24}>
                    <Grid item lg={12}>
                      <AppBar style={{ boxShadow: 'none' }} position="static" color="default">
                        <Tabs
                          style={{ border: '1px solid rgba(0, 0, 0, 0.23)' }}
                          value={this.state.value}
                          onChange={this.handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          fullWidth
                        >
                          <Tab label="Zufälliger User" />
                          <Tab label="Zufällige Zahl" />
                        </Tabs>
                      </AppBar>
                      Einstellungen
                    </Grid>
                  </Grid>
                  <br />
                  <Grid container spacing={16}>
                    <Grid item lg={9} md={12}>
                      <Button
                        fullWidth
                        className="buttonToggled"
                        variant="outlined"
                      >
                        Auslosen
                      </Button>
                    </Grid>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        className="buttonToggled"
                        variant="outlined"
                      >
                        Reroll
                      </Button>
                    </Grid>
                  </Grid>
                </CardText>
              </Card>
            </Paper>
          </Grid>
          <Grid item lg={6} md={12}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Chat</h4>
              <small>Dein Twitch Chat.</small>
              <Divider className="marginDivider" />
              <iframe
                frameborder="0"
                scrolling="no"
                id="chat_embed"
                src="http://www.twitch.tv/embed/blechkelle/chat"
                height="600"
                width="100%"
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Giveaways.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string
  })
};

export default withRouter(connect()(Giveaways));
