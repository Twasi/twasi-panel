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
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

function generateStringColor(string) {
  const num = hashCode(string);
  return intToRGB(num);
}
function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
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
