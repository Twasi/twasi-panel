import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

class Commands extends Component {
  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.commands" />
        </h2>
        <Paper className="pageContainer" style={{ borderRadius: '0px' }}>
          <h4 className="pageContainerTitle">
            Deine Befehle
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary">
                Befehl Hinzufügen
              </Button>
            </span>
          </h4>
          <small>
            Hier hast du die Möglichkeit deine Chatbefehle zu verwalten.
          </small>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px' }}>
          <Table>
            <TableHead
              adjustForCheckbox={false}
              displaySelectAll={false}
              selectable={false}
            >
              <TableRow className="TableRow">
                <TableCell>ID</TableCell>
                <TableCell>Befehl</TableCell>
                <TableCell>Ausgabe</TableCell>
                <TableCell>Zugriff</TableCell>
                <TableCell>Uses</TableCell>
                <TableCell style={{ minWidth: '100px' }}>Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                  <b>!test</b>
                </TableCell>
                <TableCell
                  style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
                >
                  Das ist ein sehr langer Test, um zu schauen, wie sich die
                  Tabelle bei längeren Einträgen verhält.
                </TableCell>
                <TableCell>Alle</TableCell>
                <TableCell>1.337</TableCell>
                <TableCell>
                  <Tooltip title="Bearbeiten" placement="top">
                    <Button
                      variant="fab"
                      color="primary"
                      className="noshadow"
                      mini
                      aria-label="editCommand"
                    >
                      <Icon style={{ color: '#ffffff' }}>edit</Icon>
                    </Button>
                  </Tooltip>{' '}
                  <Tooltip title="Löschen" placement="top">
                    <Button
                      variant="fab"
                      color="secondary"
                      className="noshadow"
                      mini
                      aria-label="deleteCommand"
                    >
                      <Icon style={{ color: '#ffffff' }}>delete</Icon>
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>
                  <b>!test</b>
                </TableCell>
                <TableCell
                  style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
                >
                  Das ist ein Test.
                </TableCell>
                <TableCell>Alle</TableCell>
                <TableCell>1.337</TableCell>
                <TableCell>
                  <Tooltip title="Bearbeiten" placement="top">
                    <Button
                      variant="fab"
                      color="primary"
                      className="noshadow"
                      mini
                      aria-label="editCommand"
                    >
                      <Icon style={{ color: '#ffffff' }}>edit</Icon>
                    </Button>
                  </Tooltip>{' '}
                  <Tooltip title="Löschen" placement="top">
                    <Button
                      variant="fab"
                      color="secondary"
                      className="noshadow"
                      mini
                      aria-label="deleteCommand"
                    >
                      <Icon style={{ color: '#ffffff' }}>delete</Icon>
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>
                  <b>!test</b>
                </TableCell>
                <TableCell
                  style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
                >
                  Das ist ein Test.
                </TableCell>
                <TableCell>Alle</TableCell>
                <TableCell>1.337</TableCell>
                <TableCell>
                  <Tooltip title="Bearbeiten" placement="top">
                    <Button
                      variant="fab"
                      color="primary"
                      className="noshadow"
                      mini
                      aria-label="editCommand"
                    >
                      <Icon style={{ color: '#ffffff' }}>edit</Icon>
                    </Button>
                  </Tooltip>{' '}
                  <Tooltip title="Löschen" placement="top">
                    <Button
                      variant="fab"
                      color="secondary"
                      className="noshadow"
                      mini
                      aria-label="deleteCommand"
                    >
                      <Icon style={{ color: '#ffffff' }}>delete</Icon>
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default Commands;
