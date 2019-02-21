import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';

import './_style.css';

class Moderators extends Component {

  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.mods" />
        </h2>
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <h4 className="pageContainerTitle">
            Moderatoren Verwaltung
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary" style={{ marginRight: '16px' }}>
                Liste aktualisieren
              </Button>
              <Button variant="contained" color="primary">
                Mod Hinzufügen
              </Button>
            </span>
          </h4>
          <small>
            Verwalte den Zugriff deiner Moderatoren.
          </small>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead
              adjustForCheckbox={false}
              displaySelectAll={false}
              selectable={false}
            >
              <TableRow className="TableRow">
                <TableCell>Name</TableCell>
                <TableCell>Modden</TableCell>
                <TableCell>Entmodden</TableCell>
                <TableCell>Spiel/Titel bearbeiten</TableCell>
                <TableCell>Befehle verwalten</TableCell>
                <TableCell>Songrequests verwalten</TableCell>
                <TableCell style={{ minWidth: '100px' }}>Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableCell>
                  <Chip
                    label="Blechkelle"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary">
                    Entmodden
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Chip
                    label="Spendendose"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary">
                    Entmodden
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

Moderators.propTypes = {};

export default withRouter(connect()(Moderators));
