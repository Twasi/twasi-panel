import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { statusSelectors, statusOperations } from '../../state/status';

class EventLog extends Component {
  componentDidMount() {
    const { loadEvents } = this.props;
    loadEvents();
    this.intervalId = setInterval(loadEvents, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { events, intl } = this.props;

    const renderedEvents = events.map(message => (
      <TableRow>
        <TableCell>{message}</TableCell>
        <TableCell>{message.createdAt}</TableCell>
      </TableRow>
    ));

    return (
      <Table>
        <TableHead
          adjustForCheckbox={false}
          displaySelectAll={false}
          selectable={false}
        >
          <TableRow className="TableRow">
            <TableCell>Message</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody displayRowCheckbox={false}>
          {renderedEvents}
        </TableBody>
      </Table>
    );
  }
}

EventLog.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})),
};

const mapStateToProps = state => ({
  events: statusSelectors.getEvents(state)
});

const mapDispatchToProps = dispatch => ({
  loadEvents: () => dispatch(statusOperations.loadEvents())
});

export default connect(mapStateToProps, mapDispatchToProps)(EventLog);
