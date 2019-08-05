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
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import NotFunctionalAlert from '../NotFunctionalAlert/NotFunctionalAlert';

import './_style.css';

class Moderators extends Component {
  state = {
    access_panel: true,
    access_moderators: true,
    access_game_title: true,
    access_commands: true,
    access_timers: true,
    access_songrequests: true
  };

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.mods" /></Typography>
        </Breadcrumbs>
        <NotFunctionalAlert/>
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="moderators.title" />
              <span style={{ float: 'right' }}>
                <Button disabled variant="contained" color="primary" style={{ marginRight: '16px' }}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button disabled variant="contained" color="primary">
                  <FormattedMessage id="moderators.add_moderator" />
                </Button>
              </span>
            </h4>
            <small>
              <FormattedMessage id="moderators.subtitle" />
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead
              adjustForCheckbox={false}
              displaySelectAll={false}
              selectable={false}
            >
              <TableRow>
                <TableCell className="TableRow" rowSpan={2} style={{ verticalAlign: 'bottom' }}><FormattedMessage id="moderators.table.name" /></TableCell>
                <TableCell align="center" className="TableRow" colSpan={6} style={{ verticalAlign: 'bottom', paddingBottom: '15px' }}><FormattedMessage id="moderators.table.permissions" /></TableCell>
                <TableCell className="TableRow" rowSpan={2} style={{ minWidth: '100px', verticalAlign: 'bottom' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
              <TableRow className="TableRow">
                <TableCell align="center"><small><FormattedMessage id="moderators.table.permissions.panel" /></small></TableCell>
                <TableCell align="center"><small><FormattedMessage id="moderators.table.permissions.mods" /></small></TableCell>
                <TableCell align="center"><small><FormattedMessage id="moderators.table.permissions.game_title" /></small></TableCell>
                <TableCell align="center"><small><FormattedMessage id="moderators.table.permissions.commands" /></small></TableCell>
                <TableCell align="center"><small><FormattedMessage id="moderators.table.permissions.timer" /></small></TableCell>
                <TableCell align="center"><small><FormattedMessage id="moderators.table.permissions.songrequests" /></small></TableCell>
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
                  <Checkbox
                    checked={this.state.access_panel}
                    onChange={this.handleChange('access_panel')}
                    value="access_panel"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_moderators}
                    onChange={this.handleChange('access_moderators')}
                    value="access_moderators"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_game_title}
                    onChange={this.handleChange('access_game_title')}
                    value="access_game_title"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_commands}
                    onChange={this.handleChange('access_commands')}
                    value="access_commands"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_timers}
                    onChange={this.handleChange('access_timers')}
                    value="access_timers"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_songrequests}
                    onChange={this.handleChange('access_songrequests')}
                    value="access_songrequests"
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Button disabled variant="contained" color="secondary">
                    <FormattedMessage id="moderators.table.unmod" />
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
                  <Checkbox
                    checked={this.state.access_panel}
                    onChange={this.handleChange('access_panel')}
                    value="access_panel"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_moderators}
                    onChange={this.handleChange('access_moderators')}
                    value="access_moderators"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_game_title}
                    onChange={this.handleChange('access_game_title')}
                    value="access_game_title"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_commands}
                    onChange={this.handleChange('access_commands')}
                    value="access_commands"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_timers}
                    onChange={this.handleChange('access_timers')}
                    value="access_timers"
                    color="primary"
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={this.state.access_songrequests}
                    onChange={this.handleChange('access_songrequests')}
                    value="access_songrequests"
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Button disabled variant="contained" color="secondary">
                    <FormattedMessage id="moderators.table.unmod" />
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
