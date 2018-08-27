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
import TextField from '@material-ui/core/TextField';

import './_style.css';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

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
                          <Tab label="Keyword" />
                          <Tab label="Zufällige Zahl" />
                        </Tabs>
                      </AppBar>
                        {this.state.value === 0 && <TabContainer>
                          <p>
                            Bestimme ein Keyword, welches in deinen Chat geschrieben werden muss, um teilzunehmen.
                          </p>
                          <TextField
                            label="Keyword"
                            placeholder="#Twasi"
                            fullWidth
                          />
                          <br />
                          <br />
                          <Grid container spacing={16}>
                            <Grid item lg={6}>
                              <Button
                                fullWidth
                                className="buttonToggled"
                                variant="outlined"
                              >
                                Giveaway öffnen
                              </Button>
                            </Grid>
                            <Grid item lg={6}>
                              <Button
                                fullWidth
                                className="buttonCancel"
                                variant="outlined"
                              >
                                Giveaway abbrechen
                              </Button>
                            </Grid>
                          </Grid>
                        </TabContainer>}
                        {this.state.value === 1 && <TabContainer>
                          <p>
                            Hier wird eine zufällige Zahl bestimmt, welche erraten werden muss. Derjenige, der die Zahl zuerst errät gewinnt.
                          </p>
                          <Grid container spacing={16}>
                            <Grid item lg={6}>
                              <TextField
                                label="von"
                                fullWidth
                              />
                            </Grid>
                            <Grid item lg={6}>
                              <TextField
                                label="bis"
                                fullWidth
                              />
                            </Grid>
                          </Grid>
                          <br />
                          <Grid container spacing={16}>
                            <Grid item lg={6}>
                              <Button
                                fullWidth
                                className="buttonToggled"
                                variant="outlined"
                              >
                                Giveaway öffnen
                              </Button>
                            </Grid>
                            <Grid item lg={6}>
                              <Button
                                fullWidth
                                className="buttonCancel"
                                variant="outlined"
                              >
                                Giveaway abbrechen
                              </Button>
                            </Grid>
                          </Grid>
                      </TabContainer>}
                    </Grid>
                  </Grid>
                </CardText>
              </Card>
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
            </Paper>
          </Grid>
          <Grid item lg={6} md={12}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Teilnehmer</h4>
              <small>Hier werden alle Teilnehmer des aktuellen Giveaways aufgelistet.</small>
              <Divider className="marginDivider" />

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
