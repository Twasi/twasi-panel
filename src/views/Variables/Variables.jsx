import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';

import NotInstalledAlert from '../NotInstalledAlert/NotInstalledAlert.jsx';

class Variables extends Component {

  render() {
    const { disabled } = this.props;
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.variables" /></Typography>
        </Breadcrumbs>
        {!disabled &&
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography>
            <h3 className="pageContainerTitle">
              <FormattedMessage id="variables.title" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ open: true })} variant="contained" color="primary" disabled={disabled}>
                  <FormattedMessage id="variables.new_variable" />
                </Button>
              </span>
            </h3>
            <small>
              <FormattedMessage id="variables.subtitle" />
            </small>
          </Typography>
        </Paper>
        }{!disabled &&
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell>Variable</TableCell>
                <TableCell>Uses</TableCell>
                <TableCell>Ausgabe</TableCell>
                <TableCell style={{ minWidth: '100px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableCell>$test</TableCell>
              <TableCell>1.337</TableCell>
              <TableCell>Dies ist eine Testvariable.</TableCell>
              <TableCell>
                <Tooltip title={<FormattedMessage id="common.edit" />} placement="top">
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
                <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
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
            </TableBody>
          </Table>
        </Paper>
        }{disabled && <NotInstalledAlert />}
      </div>
    );
  }
}

export default Variables;
