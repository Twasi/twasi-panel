import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { statusSelectors, statusOperations } from '../../state/status';

class StatusInfo extends Component {
  componentDidMount() {
    const { verifyData } = this.props;
    verifyData();
  }

  render() {
    const { status, startBot, stopBot, isStarting, isStopping } = this.props;

    const running = (
      <Chip icon={<Icon>power</Icon>} label={<FormattedMessage id="status.started" defaultMessage="started" />} color="primary" />
    );
    const stopped = (
      <Chip icon={<Icon>power_off</Icon>} label={<FormattedMessage id="status.stopped" defaultMessage="stopped" />} color="secondary" />
    );

    return (
      <Card style={{ marginTop: '25px' }} className="pluginCard">
        <CardContent className="pluginCardContent">
          <Grid container spacing={16}>
            <Grid item md={6} sm={12} style={{ textAlign: 'center' }}>
              <Typography>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="status.start" /> / <FormattedMessage id="status.stop" />
                </h4>
              </Typography>
              <br />
              {status.isRunning && (
                <div>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={isStopping}
                    onClick={stopBot}
                  >
                    <FormattedMessage id="status.stop" />
                    {isStopping && (
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
                </div>
              )}
              {!status.isRunning && (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isStarting}
                    onClick={startBot}
                  >
                    <FormattedMessage id="status.start" />
                    {isStarting && (
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
                </div>
              )}
            </Grid>
            <Grid item md={6} sm={12} style={{ textAlign: 'center' }}>
              <Typography>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="status.current_status" />
                </h4>
              </Typography>
              <br />
              {status.isRunning ? running : stopped}
            </Grid>
          </Grid>
        </CardContent>
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
