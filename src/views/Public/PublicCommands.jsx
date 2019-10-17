import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

class PublicCommands extends Component {

  render() {
    return (
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
    );
  }
}

export default PublicCommands;
