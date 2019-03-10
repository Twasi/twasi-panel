import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

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
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.giveaways" /></Typography>
        </Breadcrumbs>
        <Grid container spacing={24}>
           <Grid item lg={6} md={12}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Giveaways</h4>
              <small>Erstelle ein neues Giveaway.</small>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent className="pluginCardContent">
                  <Grid container spacing={16}>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                      >
                        <Icon>close</Icon> Staff
                      </Button>
                    </Grid>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                      >
                        <Icon>close</Icon> Mods
                      </Button>
                    </Grid>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        variant="outlined"
                      >
                        <Icon>close</Icon> Subs
                      </Button>
                    </Grid>
                    <Grid item lg={3} md={12}>
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
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
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                          />
                          <br />
                          <br />
                          <Grid container spacing={16}>
                            <Grid item lg={6}>
                              <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                              >
                                Giveaway öffnen
                              </Button>
                            </Grid>
                            <Grid item lg={6}>
                              <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
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
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                            <Grid item lg={6}>
                              <TextField
                                label="bis"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                              />
                            </Grid>
                          </Grid>
                          <br />
                          <Grid container spacing={16}>
                            <Grid item lg={6}>
                              <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                              >
                                Giveaway öffnen
                              </Button>
                            </Grid>
                            <Grid item lg={6}>
                              <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                              >
                                Giveaway abbrechen
                              </Button>
                            </Grid>
                          </Grid>
                      </TabContainer>}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <br />
              <Grid container spacing={16}>
                <Grid item lg={9} md={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Auslosen
                  </Button>
                </Grid>
                <Grid item lg={3} md={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
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
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent className="giveawayCard">
                  <Grid container spacing={0}>
                    <Grid item md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography>Blechkelle</Typography>
                    </Grid>
                    <Grid item md={6} style={{ textAlign: 'center' }}>
                      <Chip
                        label="Staff"
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                  <br/>
                  <Grid container spacing={0}>
                    <Grid item md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography>Spendendose</Typography>
                    </Grid>
                    <Grid item md={6} style={{ textAlign: 'center' }}>
                      <Chip
                        label="Zuschauer"
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                  <br/>
                  <Grid container spacing={0}>
                    <Grid item md={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography>Mekalix</Typography>
                    </Grid>
                    <Grid item md={6} style={{ textAlign: 'center' }}>
                      <Chip
                        label="Moderator"
                        color="primary"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
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
