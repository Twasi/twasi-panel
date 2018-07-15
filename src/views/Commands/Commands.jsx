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
            className="songrequestsTableHead"
            adjustForCheckbox={false}
            displaySelectAll={false}
            selectable={false}
          >
            <TableRow className="songrequestsTableRow">
              <TableHeaderColumn className="songrequestsTableColumn">
                ID
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Befehl
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Ausgabe
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Zugriff
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Uses
              </TableHeaderColumn>
              <TableHeaderColumn className="songrequestsTableColumn">
                Aktionen
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            className="songrequestsTableBody"
            displayRowCheckbox={false}
          >
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                !test
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Alle
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Bearbeiten Löschen
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                !test
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Alle
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Bearbeiten Löschen
              </TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                !test
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Alle
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Bearbeiten Löschen
              </TableRowColumn>
            </TableRow>{' '}
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                !test
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Alle
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Bearbeiten Löschen
              </TableRowColumn>
            </TableRow>{' '}
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                !test
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Alle
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Bearbeiten Löschen
              </TableRowColumn>
            </TableRow>{' '}
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                !test
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Alle
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Bearbeiten Löschen
              </TableRowColumn>
            </TableRow>{' '}
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                !test
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Alle
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Bearbeiten Löschen
              </TableRowColumn>
            </TableRow>{' '}
            <TableRow>
              <TableRowColumn className="songrequestsTableColumnBody">
                1
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                !test
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Das ist ein Test.
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Alle
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                1'337
              </TableRowColumn>
              <TableRowColumn className="songrequestsTableColumnBody">
                Bearbeiten Löschen
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default Commands;
