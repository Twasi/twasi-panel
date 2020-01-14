import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import twitchVerifiedBadge from '../common/resources/twitch_verified_badge.png';
import Jebaited from '../common/resources/jebaited.png';

import { authSelectors } from '../../state/auth';
import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';
import { impersonateOperations } from '../../state/impersonate';

class UserManager extends Component {
  componentDidMount() {
    const { updateUsers } = this.props;
    updateUsers();
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  };

  renderUsersEmpty() {
    return (
      <Paper className="pageContainer" style={{ marginTop: '0px', paddingTop: '1px', borderRadius: '0px 0px 4px 4px' }}>
        <Typography component={'div'} style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
          <img
            style={{ position: 'relative', height: '100px' }}
            src={Jebaited}
            alt="Jebaited"
          />
          <h3 className="pageContainerTitle">
            <FormattedMessage id="manager.no_users.title" />
          </h3>
          <small>
            <FormattedMessage id="manager.no_users.subtitle" />
          </small>
        </Typography>
      </Paper>
    );
  }

  renderUsers() {
    const { users } = this.props;
    //console.log(users)
    return users.map(user => (
      <TableRow key={user.channelData.Id}>
        <TableCell>
          <Avatar alt="ticket owner avatar" src={user.channelData.Logo} />
        </TableCell>
        <TableCell>
          {user.channelData.Partner && <img alt="twitch_verified_badge" style={{ verticalAlign: "middle", marginRight: '5px', marginTop: '-3px' }} height="22px" src={twitchVerifiedBadge} />}
          {user.channelData.DisplayName}
        </TableCell>
        <TableCell>
          {user.channelData.Game}
        </TableCell>
        <TableCell style={{ color: "#de6464" }}>
          <Icon style={{ verticalAlign: "middle", marginRight: '5px', marginTop: '-3px', color: "#de6464" }} fontSize="small">person</Icon>
          {user.viewerCount}
        </TableCell>
        <TableCell>
          {user.channelData.Followers}
        </TableCell>
        <TableCell>
          <Link href={user.channelData.Url} target="_blank">
            <FormattedMessage id="manager.table.tochannel" />
          </Link>
        </TableCell>
        <TableCell>
          <Fab
            color="primary"
            variant="contained"
            size="small"
            style={{ height: "40px", width: "40px", borderRadius: "50px" }}
            onClick={() => this.props.impersonate(user.channelData.Name)}
          >
            <Icon>
              exit_to_app
            </Icon>
          </Fab>
        </TableCell>
      </TableRow>
    ));
  }

  renderSummary() {
    const { users } = this.props;
    var viewercount = 0;
    var followercount = 0;
    users.forEach((entry, index) => {
      viewercount += entry.viewerCount
      followercount += entry.channelData.Followers
    });
    return (
      <TableRow key="summary">
        <TableCell colSpan={3}>
          <b>Zusammenfassung:</b>
        </TableCell>
        <TableCell style={{ color: "#de6464" }}>
          <Icon style={{ verticalAlign: "middle", marginRight: '5px', marginTop: '-3px' }} fontSize="small">person</Icon>
          {viewercount}
        </TableCell>
        <TableCell>
          {followercount}
        </TableCell>
        <TableCell colSpan={2}/>
      </TableRow>
    );
  }

  render() {
    const { rank } = this.props;
    return (
      <div className="pageContent">
        {rank === "TEAM" &&
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.user_manager" /></Typography>
        </Breadcrumbs>}
        {rank === "TEAM" &&
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
        </Paper>}
        {rank === "TEAM" && this.renderUsers().length !== 0 &&
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell></TableCell>
                <TableCell><FormattedMessage id="manager.table.name" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.game" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.viewers" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.followers" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.url" /></TableCell>
                <TableCell><FormattedMessage id="manager.table.impersonate" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="anim">
              {this.renderUsers()}
              {this.renderSummary()}
            </TableBody>
          </Table>
        </Paper>}
        {this.renderUsers().length === 0 && !this.props.isLoading && this.renderUsersEmpty()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: streamtrackerSelectors.getUsers(state),
  isLoaded: streamtrackerSelectors.isLoaded(state),
  disabled: streamtrackerSelectors.isDisabled(state),
  rank: authSelectors.getUser(state).rank
});

const mapDispatchToProps = dispatch => ({
  updateUsers: () => dispatch(streamtrackerOperations.loadUsers()),
  impersonate: userName => dispatch(impersonateOperations.impersonateUser(userName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManager);
