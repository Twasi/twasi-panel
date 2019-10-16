import React from 'react';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import first_place from '../common/resources/first_place.svg';
import second_place from '../common/resources/second_place.svg';
import third_place from '../common/resources/third_place.svg';

import './_style.css';
import RequireAuth from '../../auth/RequireAuth';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

let id = 0;
function createData(place, name, viewtime) {
  id += 1;
  return { id, place, name, viewtime };
}

const rows = [
  createData(1, 'Blechkelle', '24h 31m'),
  createData(2, 'mekalix', '20h 15m'),
  createData(3, 'DieserMerlin', '19h 10m'),
  createData(4, 'Larcce', '15h 5m'),
  createData(5, 'Spendendose', '10h 1m')
];

class Public extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <RequireAuth optional>
        <Paper className="pageContainer" style={{ borderRadius: '4px', padding: '0px' }}>
          <Grid style={{ alignItems: 'center' }} container spacing={0}>
            <Grid item xs={6}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label={(
                  <span>
                    <Icon>code</Icon><br/>
                    Befehle
                  </span>
                )} />
                <Tab label={(
                  <span>
                    <Icon>format_quote</Icon><br/>
                    Zitate
                  </span>
                )} />
                <Tab label={(
                  <span>
                    <Icon>emoji_events</Icon><br/>
                    Bestenliste
                  </span>
                )} />
              </Tabs>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ float: 'right', marginRight: '15px' }}
                color="primary"
                variant="contained">
                Mit Twitch verbinden
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {value === 0 && <TabContainer>
          <Paper className="pageContainer" style={{ padding: '10px 0px 0px 0px', marginBottom: '15px', borderRadius: '0px 0px 4px 4px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell><FormattedMessage id="commands.table.command" /></TableCell>
                  <TableCell><FormattedMessage id="commands.table.output" /></TableCell>
                  <TableCell><FormattedMessage id="commands.table.access" /></TableCell>
                  <TableCell style={{ textAlign: 'center' }}><FormattedMessage id="commands.table.uses" /></TableCell>
                  <TableCell style={{ textAlign: 'center' }}><FormattedMessage id="commands.table.cooldown" /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>!twasi</b>
                  </TableCell>
                  <TableCell
                    style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '200px' }}
                  >
                    Twasi ist cool.
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={<FormattedMessage id={"commands.new_command.VIEWER"} />}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: 'center' }}>1337</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>5 Minuten</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </TabContainer>}
        {value === 1 && <TabContainer></TabContainer>}
        {value === 2 && <TabContainer>
          <Paper className="pageContainer" style={{ marginBottom: '15px' }}>
            <Typography component={"div"}>
              <h4 className="pageContainerTitle">
                Deine Statistiken
              </h4>
              <small>
                Hier siehst du deine Statistiken, für den Kanal von %username%.
              </small>
            </Typography>
            <Grid style={{ alignItems: 'center' }} container spacing={3}>
              <Grid item xs={3}>
                <Card style={{ marginTop: '25px' }} className="pluginCard">
                  <CardContent className="pluginCardContent anim">
                    <Typography component={"div"}>
                      <h1 className="pageContainerTitle">
                        #1
                      </h1>
                      <h4 className="pageContainerTitle">
                        Platz auf der Bestenliste
                      </h4>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card style={{ marginTop: '25px' }} className="pluginCard">
                  <CardContent className="pluginCardContent anim">
                    <Typography component={"div"}>
                      <h1 className="pageContainerTitle">
                        24h 31m
                      </h1>
                      <h4 className="pageContainerTitle">
                        Zugeschaute Zeit
                      </h4>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card style={{ marginTop: '25px' }} className="pluginCard">
                  <CardContent className="pluginCardContent anim">
                    <Typography component={"div"}>
                      <h1 className="pageContainerTitle">
                        immer lol
                      </h1>
                      <h4 className="pageContainerTitle">
                        Follower seit
                      </h4>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={3}>
                <Card style={{ marginTop: '25px' }} className="pluginCard">
                  <CardContent className="pluginCardContent anim">
                    <Typography component={"div"}>
                      <h1 className="pageContainerTitle">
                        Blechlöffel
                      </h1>
                      <h4 className="pageContainerTitle">
                        Rang
                      </h4>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
          <Paper className="pageContainer" style={{ padding: '10px 0px 0px 0px', marginBottom: '15px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell>Platzierung</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell style={{ textAlign: 'right' }}>Zugeschaute Zeit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {(() => {
                        switch (row.place) {
                          case 1: return ( <div className="rank_trophy">
                            <img
                              style={{ height: '32px' }}
                              src={first_place}
                              alt="first_place"
                            />
                          </div>);
                          case 2: return ( <img
                            className="rank_trophy_two"
                            style={{ height: '32px' }}
                            src={second_place}
                            alt="second_place"
                          />);
                          case 3: return ( <img
                            className="rank_trophy_three"
                            style={{ height: '32px' }}
                            src={third_place}
                            alt="third_place"
                          />);
                          default: return ( <Chip
                            label={row.place}
                            color="primary"
                          />);
                        }
                      })()}
                    </TableCell>
                    <TableCell><b>{row.name}</b></TableCell>
                    <TableCell style={{ textAlign: 'right' }}><Chip color="primary" label={row.viewtime}></Chip></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </TabContainer>}
      </RequireAuth>
    );
  }
}

export default Public;
