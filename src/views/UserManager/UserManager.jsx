import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
//import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';

class UserManager extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { updateUsers } = this.props;
    updateUsers();
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  };

  renderUsers() {
    const { users } = this.props;
    console.log(users)
    return users.map(user => (
      <TableRow key={user.channelData.Id}>
        <TableCell>
          <Chip
            size="normal"
            color="primary"
            avatar={<Avatar alt="ticket owner avatar" src={user.channelData.Logo} />}
            label={user.channelData.DisplayName}
          />
        </TableCell>
        <TableCell>
          {user.channelData.Game}
        </TableCell>
        <TableCell>
          {user.viewerCount}
        </TableCell>
        <TableCell>
          {user.channelData.Followers}
        </TableCell>
        <TableCell>
          <Link href={user.channelData.Url} target="_blank">
            Kanal von {user.channelData.DisplayName}
          </Link>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.user_manager" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="manager.title" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updateUsers}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
              </span>
            </h4>
            <small>
              <FormattedMessage id="manager.subtitle" />
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell><FormattedMessage id="manager.table.name" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.game" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.viewers" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.followers" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.url" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderUsers()}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: streamtrackerSelectors.getUsers(state),
  isLoaded: streamtrackerSelectors.isLoaded(state),
  disabled: streamtrackerSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  updateUsers: () => dispatch(streamtrackerOperations.loadUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);