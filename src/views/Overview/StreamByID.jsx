import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

import { streamtrackerSelectors } from '../../state/streamtracker';

class StreamByID extends Component {

  addZero= (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  formatTime = (timestamp) => {
    var date = new Date(timestamp);
    var day = this.addZero(date.getDate());
    var month = this.addZero(date.getMonth()+1);
    var year = date.getFullYear();
    var hours = this.addZero(date.getHours());
    var minutes = this.addZero(date.getMinutes());
    return day+"."+month+"."+year+" - "+hours+":"+minutes;
  }

  getLength = (data) => {
    data.map(key => (
      console.log(key)
    ));
  }

  render() {
    const { streamById } = this.props;
    if(streamById !== undefined || streamById !== null) {
      console.log(streamById)
      return (
        <div>
          <Paper className="pageContainer">
            <Typography component={'span'}>
              <h4 className="pageContainerTitle">
                Stream mit der ID {streamById.streamId}
              </h4>
              <small>
                gestartet am {this.formatTime(streamById.startedAt)}
              </small>
            </Typography>
          </Paper>
          <Paper className="pageContainer" style={{ paddingRight: '0px', paddingLeft: '0px', paddingBottom: '0px' }}>
            <Table>
              <TableHead>
                <TableRow className="TableRow">
                  <TableCell>Follower +</TableCell>
                  <TableCell>Views +</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableCell>{streamById.newFollowers}</TableCell>
                <TableCell>{streamById.newViews}</TableCell>
              </TableBody>
            </Table>
          </Paper>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  streamById: streamtrackerSelectors.getStreamById(state),
});


export default connect(mapStateToProps)(StreamByID);
