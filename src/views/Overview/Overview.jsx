import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col } from 'react-grid-system';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TooltipM from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AreaChart, Area, LineChart, Line, ReferenceArea, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LabelList } from 'recharts';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';

import Kreygasm from '../common/resources/Kreygasm.png';
import LUL from '../common/resources/LUL.png';
import Kappa from '../common/resources/Kappa.png';
import PogChamp from '../common/resources/PogChamp.png';
import SeriousSloth  from '../common/resources/SeriousSloth.png';

import './_style.css';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

const COLORS = ['#02d4d4', '#E87722', '#F1B300', '#009A17', '#00B8DE', '#006CB0', '#ff4f4a', '#85459F', '#D12B92', '#F67599'];

const data01 = [{name: '!twitter', value: 400},
                {name: '!check', value: 200},
                {name: '!noob', value: 278}, {name: '!sr', value: 189}]

const data02 = [
      {name: 'Page A', pv: 2400},
      {name: 'Page B', pv: 1398},
      {name: 'Page C', pv: 9800},
      {name: 'Page D', pv: 3908},
      {name: 'Page E', pv: 4800},
      {name: 'Page F', pv: 3800},
      {name: 'Page G', pv: 4300},
      {name: 'Page H', pv: 9800},
      {name: 'Page I', pv: 3908},
      {name: 'Page J', pv: 4800},
];

class Overview extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  constructor(props) {
    super(props);

    this.renderListItems = this.renderListItems.bind(this);
  }

  componentDidMount() {
    const { updateStreamtracker } = this.props;
    updateStreamtracker();
  }

  renderListItems() {
    const { streamtracker } = this.props;
    return (
      <List dense style={{ padding: '0px' }}>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '23px 0px 0px 0px' }}>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">{streamtracker.streamId}</h3>
                  <small><FormattedMessage id="overview.table_id" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="Jetzt Live" placement="right">
              <Icon
                color="secondary"
                style={{ position: 'absolute', right: '17px', fontSize: '15px' }}
              >
                brightness_1
              </Icon>
            </TooltipM>
          </ListItem>
          <Card className="pluginCard noshadow" style={{ borderRadius: '0px' }}>
            <CardContent style={{ padding: '0px' }}>
              <ListItem>
                <Row>
                  <Col sm={12}>
                    <Typography>
                      <h3 className="pageContainerTitle">13:37</h3>
                      <small><FormattedMessage id="overview.table_duration" /></small>
                    </Typography>
                  </Col>
                </Row>
                <TooltipM title="+ 5:12" placement="right">
                  <Icon
                    color="primary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_up
                  </Icon>
                </TooltipM>
              </ListItem>
            </CardContent>
          </Card>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">1.243</h3>
                  <small><FormattedMessage id="overview.table_chatmessages" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="+ 125" placement="right">
              <Icon
                color="primary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_up
              </Icon>
            </TooltipM>
          </ListItem>
          <Card className="pluginCard noshadow" style={{ borderRadius: '0px' }}>
            <CardContent style={{ padding: '0px' }}>
              <ListItem>
                <Row>
                  <Col sm={12}>
                    <Typography>
                      <h3 className="pageContainerTitle">354</h3>
                      <small><FormattedMessage id="overview.table_commands_used" /></small>
                    </Typography>
                  </Col>
                </Row>
                <TooltipM title="- 5" placement="right">
                  <Icon
                    color="secondary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_down
                  </Icon>
                </TooltipM>
              </ListItem>
            </CardContent>
          </Card>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">54</h3>
                  <small><FormattedMessage id="overview.table_follower" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="+- 0" placement="right">
              <Icon
                style={{ position: 'absolute', right: '13px', color: '#da7720' }}
              >
                trending_flat
              </Icon>
            </TooltipM>
          </ListItem>
          <Card className="pluginCard noshadow" style={{ borderRadius: '0px' }}>
            <CardContent style={{ padding: '0px' }}>
              <ListItem>
                <Row>
                  <Col sm={12}>
                    <Typography>
                      <h3 className="pageContainerTitle">263</h3>
                      <small><FormattedMessage id="overview.table_views" /></small>
                    </Typography>
                  </Col>
                </Row>
                <TooltipM title="+- 0" placement="right">
                  <Icon
                    style={{ position: 'absolute', right: '13px', color: '#da7720' }}
                  >
                    trending_flat
                  </Icon>
                </TooltipM>
              </ListItem>
            </CardContent>
          </Card>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">32</h3>
                  <small><FormattedMessage id="overview.table_viewermax" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="+ 7" placement="right">
              <Icon
                color="primary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_up
              </Icon>
            </TooltipM>
          </ListItem>
          <Card className="pluginCard noshadow" style={{ borderRadius: '0px' }}>
            <CardContent style={{ padding: '0px' }}>
              <ListItem>
                <Row>
                  <Col sm={12}>
                    <Typography>
                      <h3 className="pageContainerTitle">25</h3>
                      <small><FormattedMessage id="overview.table_average" /></small>
                    </Typography>
                  </Col>
                </Row>
                <TooltipM title="- 2" placement="right">
                  <Icon
                    color="secondary"
                    style={{ position: 'absolute', right: '13px' }}
                  >
                    trending_down
                  </Icon>
                </TooltipM>
              </ListItem>
            </CardContent>
          </Card>
          <ListItem>
            <Row>
              <Col sm={12}>
                <Typography>
                  <h3 className="pageContainerTitle">197</h3>
                  <small><FormattedMessage id="overview.table_individual" /></small>
                </Typography>
              </Col>
            </Row>
            <TooltipM title="- 50" placement="right">
              <Icon
                color="secondary"
                style={{ position: 'absolute', right: '13px' }}
              >
                trending_down
              </Icon>
            </TooltipM>
          </ListItem>
        </Paper>
      </List>
    );
  }

  render() {
    const { streamtracker } = this.props;
    const { value } = this.state;
    return (
      <div className="pageContent">
        <Container className="overviewHead">
          <Row>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>
                    <FormattedMessage id="overview.follower" />
                  </small>
                  <img
                    style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
                    src={Kreygasm}
                    alt="Kreygasm"
                  />
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>
                    <FormattedMessage id="overview.viewer" />
                  </small>
                  <img
                    style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
                    src={LUL}
                    alt="LUL"
                  />
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>
                    <FormattedMessage id="overview.messages" />
                  </small>
                  <img
                    style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
                    src={Kappa}
                    alt="Kappa"
                  />
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>
                    <FormattedMessage id="overview.streams" />
                  </small>
                  <img
                    style={{ position: 'absolute', top: '15px', right: '30px', height: '50px' }}
                    src={PogChamp}
                    alt="PogChamp"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {streamtracker.streamId != null &&
        <Paper className="pageContainer" style={{ borderRadius: '4px', padding: '0px' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Letzter Stream" />
            <Tab label="Letzten 30 Tage" />
            <Tab label="Gesamt" />
          </Tabs>
        </Paper>
        }
        {value === 0 && <TabContainer>
        {streamtracker.streamId != null &&
        <Row>
          <Col sm={12}>
            <Paper className="pageContainer">
              <Typography>
                <h3 class="pageContainerTitle">
                  <FormattedMessage id="overview.laststream" />
                  <span style={{ float: 'right' }}>
                    <Button variant="contained" color="primary" onClick={this.props.updateLastStream}>
                      <Icon style={{ marginRight: '5px' }}>cached</Icon>
                      <FormattedMessage id="common.refresh" />
                    </Button>
                  </span>
                </h3>
                <small>
                  <FormattedMessage id="overview.laststream.subtitle" />
                </small>
              </Typography>
              <Card className="pluginCard" style={{ marginTop: '15px' }}>
                <CardContent style={{ padding: '24px' }}>
                  <Grid container spacing={16}>
                    <Grid item lg={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                      <TextField
                        label={<FormattedMessage id="overview.title" />}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                              >
                                <Icon>
                                  save
                                </Icon>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item lg={6} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                      <TextField
                        label={<FormattedMessage id="overview.game" />}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="send-support-message"
                              >
                                <Icon>
                                  save
                                </Icon>
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Paper>
          </Col>
        </Row>
        }
        {streamtracker.streamId != null &&
        <Row>
          <Col sm={9}>
            <Paper className="pageContainer" style={{ height: '300px', paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px' }}>
              <Typography style={{ paddingLeft: '23px', position: 'absolute' }}>
                <h3 class="pageContainerTitle">
                  <FormattedMessage id="overview.viewercourse" />
                </h3>
                <small>
                  <FormattedMessage id="overview.viewercourse.subtitle" />
                </small>
              </Typography>
              <ResponsiveContainer height='100%' width='100%'>
                <LineChart margin={{ top: 55, right: 0, left: 0, bottom: 0 }} data={streamtracker.data}>
                  <Tooltip
                    labelFormatter={() => ""}
                  />
                  {/*
                  <ReferenceArea x1={0} x2={10} fill={COLORS[0]} fillOpacity={0.4} />
                  <ReferenceArea x1={10} x2={25} fill={COLORS[1]} fillOpacity={0.4} />
                  <ReferenceArea x1={25} x2={40} fill={COLORS[2]} fillOpacity={0.4} />
                  <ReferenceArea x1={40} x2={100} fill={COLORS[3]} fillOpacity={0.4} />
                  */}
                  <Line type='monotone' dataKey="viewerCount" name="Zuschauer" strokeWidth='2' stroke={COLORS[0]} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
            <Row>
              <Col sm={6}>
                <Paper className="pageContainer" style={{ height: '350px', padding: '23px 0px 23px 0px' }}>
                  <Typography style={{ paddingLeft: '23px' }}>
                    <h3 class="pageContainerTitle">
                      <FormattedMessage id="overview.used_commands" />
                    </h3>
                    <small>
                      <FormattedMessage id="overview.used_commands.subtitle" />
                    </small>
                  </Typography>
                  <ResponsiveContainer height='100%' width='100%'>
                    <PieChart width={730} height={250}
                        margin={{top: 15, right: 0, left: 0, bottom: 23}}>
                      <Tooltip/>
                      <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} strokeWidth="2" fillOpacity=".8" label>
                        {
                        	data01.map((entry, index) => <Cell stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]}/>)
                        }
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Col>
              <Col sm={6}>
                <Paper className="pageContainer" style={{ height: '350px', padding: '23px 0px 23px 0px' }}>
                  <Typography style={{ paddingLeft: '23px' }}>
                    <h3 class="pageContainerTitle">
                      <FormattedMessage id="overview.played_games" />
                    </h3>
                    <small>
                      <FormattedMessage id="overview.played_games.subtitle" />
                    </small>
                  </Typography>
                  <ResponsiveContainer height='100%' width='100%'>
                    <BarChart backgroundOpacity=".1" width={600} height={300} data={data02}
                        margin={{top: 15, right: 0, left: 0, bottom: 0}}>
                     <Tooltip cursor={{ fill: '#283c42' }} />
                     <Bar dataKey="pv" strokeWidth="2" fillOpacity=".8">
                       <LabelList dataKey="pv" position="top" />
                       {
                         data02.map((entry, index) => <Cell stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]}/>)
                       }
                     </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Col>
            </Row>
          </Col>
          <Col sm={3}>
            <div>
              {this.renderListItems()}
            </div>
          </Col>
        </Row>
        } {streamtracker.streamId == null &&
        <div>
          <Paper className="pageContainer">
            <Typography style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
              <h1 class="pageContainerTitle">
                <FormattedMessage id="overview.no_streams_tracked_title" />
                <img
                  style={{ position: 'relative', top: '15px', left: '10px', height: '50px' }}
                  src={SeriousSloth}
                  alt="SeriousSloth"
                />
              </h1>
              <br />
              <small>
                <FormattedMessage id="overview.no_streams_tracked_subtitle" />
              </small>
            </Typography>
          </Paper>
          <Paper className="pageContainer">
            <Row>
              <Col sm={3}>
                <Card style={{ textAlign: 'center' }} className="pluginCard">
                  <CardContent className="pluginCardContent">
                    <Button variant="contained" color="primary">
                      <FormattedMessage id="overview.no_streams_tracked_plugins" />
                    </Button>
                  </CardContent>
                </Card>
              </Col>
              <Col sm={3}>
                <Card style={{ textAlign: 'center' }} className="pluginCard">
                  <CardContent className="pluginCardContent">
                    <Button variant="contained" color="primary">
                      <FormattedMessage id="overview.no_streams_tracked_docs" />
                    </Button>
                  </CardContent>
                </Card>
              </Col>
              <Col sm={3}>
                <Card style={{ textAlign: 'center' }} className="pluginCard">
                  <CardContent className="pluginCardContent">
                    <Button variant="contained" color="primary">
                      <FormattedMessage id="overview.no_streams_tracked_support" />
                    </Button>
                  </CardContent>
                </Card>
              </Col>
              <Col sm={3}>
                <Card style={{ textAlign: 'center' }} className="pluginCard">
                  <CardContent className="pluginCardContent">
                    <Button variant="contained" color="primary">
                      <FormattedMessage id="overview.no_streams_tracked_feedback" />
                    </Button>
                  </CardContent>
                </Card>
              </Col>
            </Row>
          </Paper>
        </div>
        }
        </TabContainer>}
        {value === 1 && <TabContainer>
        </TabContainer>}
        {value === 2 && <TabContainer>
        </TabContainer>}
      </div>
    );
  }
}

Overview.propTypes = {
  updateStreamtracker: PropTypes.func.isRequired,
  streamtracker: PropTypes.arrayOf(PropTypes.shape({
    streamId: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    streamType: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      gameId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      game: PropTypes.string.isRequired,
      viewerCount: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    })),
  })),
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  streamtracker: streamtrackerSelectors.getStreamtracker(state),
  isLoaded: streamtrackerSelectors.isLoaded(state),
  disabled: streamtrackerSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(streamtrackerOperations.verifyData()),
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
