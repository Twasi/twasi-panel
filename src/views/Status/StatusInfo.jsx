import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';

import { statusSelectors, statusOperations } from '../../state/status';

class StatusInfo extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { status, startBot, stopBot, isStarting, isStopping } = this.props;

    const running = (
      <Chip
        label={<FormattedMessage id="status.started" defaultMessage="Started" />}
        color="primary"
      />
    );
    const stopped = (
      <Chip
        label={<FormattedMessage id="status.stopped" defaultMessage="Stopped" />}
        color="secondary"
      />
    );

    return (
      <Card className="pluginCard">
        <CardText>
          <Grid container spacing={16}>
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <h4 className="pageContainerTitle">
                Starten / Stoppen
              </h4>
              <Button
                type="danger"
                disabled={status.isRunning}
                onClick={startBot}
                loading={isStarting}
                value="on"
                variant="contained" color="primary"
                style={{ marginRight: '16px' }}
              >
                starten
              </Button>
              <Button
                type="primary"
                disabled={!status.isRunning}
                onClick={stopBot}
                loading={isStopping}
                value="off"
                variant="contained" color="secondary"
              >
                stoppen
              </Button>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <h4 className="pageContainerTitle">
                Aktueller Bot Status
              </h4>
              {status.isRunning ? running : stopped}
            </Grid>
          </Grid>
        </CardText>
      </Card>
    );
  }
}

StatusInfo.propTypes = {
  verifyData: PropTypes.func.isRequired,
  status: PropTypes.shape({}),
  startBot: PropTypes.func.isRequired,
  stopBot: PropTypes.func.isRequired,
  isStarting: PropTypes.bool.isRequired,
  isStopping: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state),
  isStarting: statusSelectors.isStarting(state),
  isStopping: statusSelectors.isStopping(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData()),
  stopBot: () => dispatch(statusOperations.stopBot()),
  startBot: () => dispatch(statusOperations.startBot())
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusInfo);
