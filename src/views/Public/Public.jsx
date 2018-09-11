import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FormattedMessage } from 'react-intl';

let id = 0;
function createData(place, name, points, viewtime) {
  id += 1;
  return { id, place, name, points, viewtime };
}

const rows = [
  createData( 1, 'Blechkelle', 159, 159),
  createData( 2, 'mekalix', 237, 237),
  createData( 3, 'DieserMerlin', 262, 262),
  createData( 4, 'Larcce', 305, 305),
  createData( 5, 'Spendendose', 356, 356),
];

const Public = () => (
  <div className="pageContent">
    <Paper className="pageContainer">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Platzierung</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Viewtime</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell>{row.place}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.points}</TableCell>
                <TableCell>{row.viewtime}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  </div>
);

export default Public;
