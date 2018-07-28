import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

class Commands extends Component {
  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.commands" />
        </h2>
        <Paper className="pageContainer">
          <h4 className="pageContainerTitle">
            Deine Befehle
            <span style={{ float: 'right' }}>
              <RaisedButton
                backgroundColor="#00aeae"
                labelColor="#ffffff"
                label="Befehl Hinzufügen"
              />
            </span>
          </h4>
          <small>
            Hier hast du die Möglichkeit deine Chatbefehle zu verwalten.
          </small>
        </Paper>
        <Table>
          <TableHeader
            adjustForCheckbox={false}
            displaySelectAll={false}
            selectable={false}
          >
            <TableRow className="TableRow">
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Befehl</TableHeaderColumn>
              <TableHeaderColumn>Ausgabe</TableHeaderColumn>
              <TableHeaderColumn>Zugriff</TableHeaderColumn>
              <TableHeaderColumn>Uses</TableHeaderColumn>
              <TableHeaderColumn>Aktionen</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>
                <b>!test</b>
              </TableRowColumn>
              <TableRowColumn
                style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
              >
                Das ist ein sehr langer Test, um zu schauen, wie sich die
                Tabelle bei längeren Einträgen verhält.
              </TableRowColumn>
              <TableRowColumn>Alle</TableRowColumn>
              <TableRowColumn>1.337</TableRowColumn>
              <TableRowColumn>
                <Tooltip title="Bearbeiten" placement="top">
                  <Button
                    variant="fab"
                    className="tealbg noshadow"
                    mini
                    aria-label="editCommand"
                  >
                    <Icon style={{ color: '#ffffff' }}>edit</Icon>
                  </Button>
                </Tooltip>{' '}
                <Tooltip title="Löschen" placement="top">
                  <Button
                    variant="fab"
                    className="redbg noshadow"
                    mini
                    aria-label="deleteCommand"
                  >
                    <Icon style={{ color: '#ffffff' }}>delete</Icon>
                  </Button>
                </Tooltip>
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>2</TableRowColumn>
              <TableRowColumn>
                <b>!test</b>
              </TableRowColumn>
              <TableRowColumn
                style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
              >
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn>Alle</TableRowColumn>
              <TableRowColumn>1.337</TableRowColumn>
              <TableRowColumn>
                <Tooltip title="Bearbeiten" placement="top">
                  <Button
                    variant="fab"
                    className="tealbg noshadow"
                    mini
                    aria-label="editCommand"
                  >
                    <Icon style={{ color: '#ffffff' }}>edit</Icon>
                  </Button>
                </Tooltip>{' '}
                <Tooltip title="Löschen" placement="top">
                  <Button
                    variant="fab"
                    className="redbg noshadow"
                    mini
                    aria-label="deleteCommand"
                  >
                    <Icon style={{ color: '#ffffff' }}>delete</Icon>
                  </Button>
                </Tooltip>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Commands;
