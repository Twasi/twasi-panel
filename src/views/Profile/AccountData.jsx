import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import { authSelectors, authOperations } from '../../state/auth';

import Rank from '../common/Rank';

import './_style.css';

class AccountData extends Component {

  render() {
    const { updateUser, user } = this.props;
    return (
      <div className="pageContent">
        <Paper className="pageContainer">
          <Typography component={"div"}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="profile.your_data" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" onClick={updateUser} disabled={user.isUserUpdating}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                  {user.isUserUpdating && (
                    <CircularProgress
                      color="primary"
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: -12,
                        marginLeft: -12
                      }}
                      size={24}
                    />
                  )}
                </Button>
              </span>
            </h4>
            <small>
              <FormattedMessage id="profile.your_data_subline" />
            </small>
          </Typography>
          <Card style={{ marginTop: '25px' }} className="pluginCard">
            <CardContent className="pluginCardContent">
              <Table>
                <TableBody className="anim">
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id="profile.your_data_twitchname" />
                    </TableCell>
                    <TableCell>
                      {user.displayName}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id="profile.your_data_twitchid" />
                    </TableCell>
                    <TableCell>
                      {user.twitchid}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <FormattedMessage id="profile.your_data_rank" />
                    </TableCell>
                    <TableCell>
                      <Rank />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ borderBottom: '0px' }}>
                      <FormattedMessage id="profile.your_data_delete" />
                    </TableCell>
                    <TableCell style={{ borderBottom: '0px' }}>
                      <Button variant="contained" size="small" color="secondary">
                        <FormattedMessage id="profile.your_data_deletelink" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

AccountData.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string,
    twitchid: PropTypes.string,
    rank: PropTypes.string
  })
};

const mapDispatchToProps = dispatch => ({
  updateUser: () => dispatch(authOperations.updateUser()),
});

const mapStateToProps = state => ({
  user: authSelectors.getUser(state),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountData));
