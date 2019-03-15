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
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import './_style.css';

class Moderators extends Component {

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.mods" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <h4 className="pageContainerTitle">
            Moderatoren Verwaltung
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary" style={{ marginRight: '16px' }}>
                <Icon style={{ marginRight: '5px' }}>cached</Icon>
                <FormattedMessage id="common.refresh" />
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
              <TableRow>
                <TableCell className="TableRow" rowSpan={2} style={{ verticalAlign: 'bottom' }}>Name</TableCell>
                <TableCell align="center" className="TableRow" colSpan={6} style={{ verticalAlign: 'bottom', paddingBottom: '15px' }}>Berechtigungen</TableCell>
                <TableCell className="TableRow" rowSpan={2} style={{ minWidth: '100px', verticalAlign: 'bottom' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
              <TableRow className="TableRow">
                <TableCell align="center"><small>Panel Zugriff</small></TableCell>
                <TableCell align="center"><small>Moderatoren</small></TableCell>
                <TableCell align="center"><small>Spiel/Titel</small></TableCell>
                <TableCell align="center"><small>Befehle</small></TableCell>
                <TableCell align="center"><small>Timer</small></TableCell>
                <TableCell align="center"><small>Songrequests</small></TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableCell>
                  <Chip
                    color="primary"
                    label="Blechkelle"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="secondary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>close</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
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
                    color="primary"
                    label="FromRadioWaveToGammaRay"
                  />
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="fab"
                    color="primary"
                    className="noshadow"
                    mini
                  >
                    <Icon style={{ color: '#ffffff' }}>check</Icon>
                  </Button>
                </TableCell>
                <TableCell align="center">
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
