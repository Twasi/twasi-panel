import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

let id = 0;
function createData(place, name, points, viewtime) {
  id += 1;
  return { id, place, name, points, viewtime };
}

const rows = [
  createData( 1, 'Blechkelle', 512, '24h 31m'),
  createData( 2, 'mekalix', 128, '20h 15m'),
  createData( 3, 'DieserMerlin', 64, '19h 10m'),
  createData( 4, 'Larcce', 32, '15h 5m'),
  createData( 5, 'Spendendose', 16, '10h 1m'),
];

class Public extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className="pageContent">
        <Paper className="pageContainer" style={{ borderRadius: '4px', padding: '0px' }}>
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Befehle" />
            <Tab label="Streamzitate" />
            <Tab label="Bestenliste" />
          </Tabs>
        </Paper>
        {value === 0 && <TabContainer>
          <Paper className="pageContainer" style={{ padding: '10px 0px 0px 0px', marginBottom: '15px', borderRadius: '0px 0px 4px 4px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell>Befehl</TableCell>
                  <TableCell>Ausgabe</TableCell>
                  <TableCell>Zugriffslevel</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography>
                      !twasi
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      Twasi ist ein für Streamer entwickelter, modularer Chatbot. Twasi ist der erste gehostete Chatbot für Twitch, der selbst geschriebene Plugins unterstützt.
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label="Moderatoren" color="primary" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>
          <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
            <h4 className="pageContainerTitle">Bestenliste
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary">
                  Mit Twitch verbinden
                </Button>
              </span>
            </h4>
            <small>
              Hier findest du die Bestenliste.
            </small><br /><br />
            <Chip
              color="primary"
              avatar={<Avatar>5</Avatar>}
              label="Punkte jede Minute"
            />
          </Paper>
          <Paper className="pageContainer" style={{ padding: '10px 0px 0px 0px', marginBottom: '15px', borderRadius: '0px 0px 4px 4px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell>Platzierung</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Punkte</TableCell>
                  <TableCell>Zugeschaute Zeit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Chip
                          label={row.place}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={row.points}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>{row.viewtime}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </TabContainer>}
      </div>
    );
  }
}

export default Public;
