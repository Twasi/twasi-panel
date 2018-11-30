import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { Tabs, Tab } from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import { Container, Row, Col } from 'react-grid-system';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import './_style.css';

import { AreaChart, Area, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, ReferenceArea, CartesianGrid, Label } from 'recharts';

let data = [];
let visits = 100;
for (let i = 1; i < 100; i++) {
  visits += Math.round((Math.random() < 0.5 ? 1 : 2) * Math.random() * 10);
  data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const data01 = [{name: 'Group A', value: 400},
                {name: 'Group D', value: 200},
                {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

const data02 = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

class Overview extends Component {
  render() {
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
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Row>
          <Col sm={12}>
            <Paper className="pageContainer" style={{ marginTop: '0px' }}>
              <h4 className="pageContainerTitle">Statistiken deines letzten Streams
                <span style={{ float: 'right' }}>
                  <Button variant="contained" color="primary">Aktualisieren</Button>
                </span>
              </h4>
              <small>Hier findest du die Statisten deines letzten von Twasi erfassten Streams.</small>
            </Paper>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
              <div>
                <List dense style={{ padding: '0px' }}>
                  <Paper className="pageContainer" style={{ padding: '15px', margin: '23px 0px 0px 0px' }}>
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Stream ID</h4>
                        <small>1337</small>
                      </Col>
                    </Row>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Dauer</h4>
                        <small>13:37</small>
                      </Col>
                    </Row>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Chatnachrichten</h4>
                        <small>1337</small>
                      </Col>
                    </Row>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Befehle ausgeführt</h4>
                        <small>1337</small>
                      </Col>
                    </Row>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Follower +</h4>
                        <small>1337</small>
                      </Col>
                    </Row>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Aufrufe +</h4>
                        <small>1337</small>
                      </Col>
                    </Row>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Zuschauer Maximum</h4>
                        <small>1337</small>
                      </Col>
                    </Row>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Zuschauer Durchschnitt</h4>
                        <small>1337</small>
                      </Col>
                    </Row>
                    </ListItem>
                    <Divider />
                    <ListItem>
                    <Row>
                      <Col sm={12}>
                        <h4 className="pageContainerTitle">Individuelle Zuschauer</h4>
                        <small>1337</small>
                      </Col>
                    </Row>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem style={{ padding: '0px' }}>
                      <Button fullWidth variant="contained" color="secondary">
                        Streamdaten Löschen
                      </Button>
                    </ListItem>
                  </Paper>
                </List>
              </div>
          </Col>
          <Col sm={9}>
            <Paper className="pageContainer" style={{ height: '300px', paddingRight: '0px', paddingLeft: '0px' }}>
              <h4 className="pageContainerTitle" style={{ textAlign: 'center' }}>
                Zuschauerverlauf
              </h4>
              <ResponsiveContainer height='100%' width='100%'>
                <AreaChart margin={{ top: 15, right: 0, left: 0, bottom: 0 }} data={data}>
                  <ReferenceArea x1={0} x2={20} y1={0} y2={1000} fill="#0088FE" fillOpacity=".1">
                    <Label value="Minecraft" fill="#b7b7b7" offset={10} position="insideTop" />
                  </ReferenceArea>
                  <ReferenceArea x1={20} x2={50} y1={0} y2={1000} fill="#00C49F" fillOpacity=".1">
                    <Label value="GTA V" fill="#b7b7b7" offset={10} position="insideTop" />
                  </ReferenceArea>
                  <ReferenceArea x1={50} x2={98} y1={0} y2={1000} fill="#FFBB28" fillOpacity=".1">
                    <Label value="RDR 2" fill="#b7b7b7" offset={10} position="insideTop" />
                  </ReferenceArea>
                  <Tooltip/>
                  <Area type="monotone" dataKey="value" stroke="#00aeae" strokeWidth="0" fill="#00aeae" fillOpacity="1" />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
            <Row>
              <Col sm={6}>
                <Paper className="pageContainer" style={{ height: '300px', paddingRight: '0px', paddingLeft: '0px' }}>
                  <h4 className="pageContainerTitle" style={{ textAlign: 'center' }}>
                    Genutzte Befehle
                  </h4>
                  <ResponsiveContainer height='100%' width='100%'>
                    <PieChart width={730} height={250}
                        margin={{top: 15, right: 0, left: 0, bottom: 0}}>
                      <Tooltip/>
                      <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} strokeWidth="0" fillOpacity="1">
                      {
                      	data01.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                      }
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Paper>
              </Col>
              <Col sm={6}>
                <Paper className="pageContainer" style={{ height: '300px', paddingRight: '0px', paddingLeft: '0px' }}>
                  <h4 className="pageContainerTitle" style={{ textAlign: 'center' }}>
                    Gespielte Spiele
                  </h4>
                  <ResponsiveContainer height='100%' width='100%'>
                    <BarChart backgroundOpacity=".1" width={600} height={300} data={data02}
                        margin={{top: 15, right: 0, left: 0, bottom: 0}}>
                     <Tooltip cursor={{ fill: '#283c42' }} />
                     <Bar dataKey="pv" fill="#00aeae">
                     {
                       data02.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                     }
                     </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Paper>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Overview.propTypes = {};

export default withRouter(connect()(Overview));
