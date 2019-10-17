import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import first_place from '../common/resources/first_place.svg';
import second_place from '../common/resources/second_place.svg';
import third_place from '../common/resources/third_place.svg';

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

class PublicLeaderboard extends Component {

  render() {
    return (
      <div>
        <Paper className="pageContainer" style={{ marginBottom: '15px' }}>
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              Deine Statistiken
            </h4>
            <small>
              Hier siehst du deine Statistiken, für den Kanal von %username%.
            </small>
          </Typography>
          <Grid className="anim" style={{ alignItems: 'center' }} container spacing={3}>
            <Grid item xs={3}>
              <Card style={{ marginTop: '25px' }} className="pluginCard">
                <CardContent className="pluginCardContent translucentBoxLeaderboard">
                  <Typography component={"div"} style={{ color: '#ffffff' }}>
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
                <CardContent className="pluginCardContent translucentBoxLeaderboard">
                  <Typography component={"div"} style={{ color: '#ffffff' }}>
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
                <CardContent className="pluginCardContent translucentBoxLeaderboard">
                  <Typography component={"div"} style={{ color: '#ffffff' }}>
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
                <CardContent className="pluginCardContent translucentBoxLeaderboard">
                  <Typography component={"div"} style={{ color: '#ffffff' }}>
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
            <TableBody className="anim">
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
      </div>
    );
  }
}

export default PublicLeaderboard;
