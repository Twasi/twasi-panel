import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

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
        <TableRowColumn>{message}</TableRowColumn>
        <TableRowColumn>{message.createdAt}</TableRowColumn>
      </TableRow>
    ));

    return (
      <Table>
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
          selectable={false}
        >
          <TableRow className="TableRow">
            <TableHeaderColumn>Message</TableHeaderColumn>
            <TableHeaderColumn>Created</TableHeaderColumn>
          </TableRow>
        </TableHeader>
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
