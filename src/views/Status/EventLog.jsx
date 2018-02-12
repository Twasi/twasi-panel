import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';

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

    return (
      <div title={intl.formatMessage({ id: 'status.eventlog' })}>
        {events && (
          <table
            columns={[
              {
                title: 'Name',
                dataIndex: 'message'
              },
              {
                title: 'Timestamp',
                dataIndex: 'createdAt'
              }
            ]}
            dataSource={events.map(message => ({
              ...message,
              key: message.createdAt
            }))}
          />
        )}
      </div>
    );
  }
}

EventLog.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({})),
  intl: intlShape
};

const mapStateToProps = state => ({
  events: statusSelectors.getEvents(state)
});

const mapDispatchToProps = dispatch => ({
  loadEvents: () => dispatch(statusOperations.loadEvents())
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EventLog));
