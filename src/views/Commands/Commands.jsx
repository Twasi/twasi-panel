import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

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
              <TableRowColumn>1'337</TableRowColumn>
              <TableRowColumn>Bearbeiten Löschen</TableRowColumn>
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
              <TableRowColumn>1'337</TableRowColumn>
              <TableRowColumn>Bearbeiten Löschen</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Commands;
