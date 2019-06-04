import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import { AreaChart, Area, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

import './_style.css';

const COLORS = ['#02d4d4', '#E87722', '#F1B300', '#009A17', '#00B8DE', '#006CB0', '#ff4f4a', '#85459F', '#D12B92', '#F67599'];

const data05 = [{ name: 'Das Nutella', value: 936 },
  { name: 'Der Nutella', value: 67 },
  { name: 'Die Nutella', value: 334 }];

class Votings extends Component {
  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.votings" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Typography>
            <h3 className="pageContainerTitle">
              <FormattedMessage id="votings.headline" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ open: true })} variant="contained" color="primary">
                  <FormattedMessage id="votings.new_voting" />
                </Button>
              </span>
            </h3>
            <small>
              <FormattedMessage id="votings.subheadline" />
            </small>
          </Typography>
          <ExpansionPanel style={{ marginTop: '25px' }}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                  <Typography><h4 className="pageContainerTitle">Umfrage</h4><small>Heißt es das, der oder die Nutella?</small></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography><h4 className="pageContainerTitle">Erstellt am</h4><small>27.03.2019 - 17:49</small></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography><h4 className="pageContainerTitle">Teilnehmer</h4><small>1.337</small></Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography><h4 className="pageContainerTitle">Status</h4><Chip className="statusBadgeSupport" color="secondary" label="beendet" /></Typography>
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <Card style={{ borderRadius: '0px 0px 4px 4px' }} className="pluginCard">
              <CardContent style={{ padding: '24px' }}>
                <Grid container spacing={24}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <ListItemText>
                          <Typography>
                            <h4 className="pageContainerTitle">
                                Das Nutella
                            </h4>
                            <small>
                                70% (936 Stimmen)
                            </small>
                          </Typography>
                          <LinearProgress variant="determinate" value="70" style={{ marginTop: '5px' }} />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          <Typography>
                            <h4 className="pageContainerTitle">
                                Der Nutella
                            </h4>
                            <small>
                                5% (67 Stimmen)
                            </small>
                          </Typography>
                          <LinearProgress variant="determinate" value="5" style={{ marginTop: '5px' }} />
                        </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemText>
                          <Typography>
                            <h4 className="pageContainerTitle">
                                Die Nutella
                            </h4>
                            <small>
                                25% (334 Stimmen)
                            </small>
                          </Typography>
                          <LinearProgress variant="determinate" value="25" style={{ marginTop: '5px' }} />
                        </ListItemText>
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6}>
                    <ResponsiveContainer height="100%" width="100%">
                      <PieChart width={730} height={250}>
                        <Tooltip />
                        <Pie data={data05} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} strokeWidth="0" isAnimationActive={false} label>
                          {
                          	data05.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                          }
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </ExpansionPanel>
        </Paper>
      </div>
    );
  }
}

Votings.propTypes = {};

export default withRouter(connect()(Votings));
