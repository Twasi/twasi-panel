import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Status from './Status';

import { statusSelectors, statusOperations } from '../../state/status';

class StatusIcon extends React.Component {
  constructor(props) {
    super(props);
    this.props.verifyData()
    this.state = {
      modalOpen: false
    };
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    const { status } = this.props;
    return (
      <div>
        <Tooltip
          title={<FormattedMessage id="status.manage" />}
          placement="bottom"
        >
          <Chip
            icon={status.isRunning ? <Icon>power</Icon> : <Icon>power_off</Icon>}
            color={status.isRunning ? "primary" : "secondary"}
            label={status.isRunning ? <FormattedMessage id="status.started" /> : <FormattedMessage id="status.stopped" />}
            style={{ float: 'right', marginRight: '15px', marginTop: '3px' }}
            onClick={() => this.setState({ modalOpen: true })}
          />
          {/*
          <Icon
            className="themeIcon"
            style={{ fontSize: 36, float: 'right', marginRight: '15px' }}
            onClick={() => this.setState({ modalOpen: true })}
          >
            {status.isRunning ? "power" : "power_off"}
          </Icon>*/}
        </Tooltip>
        <Status
          open={this.state.modalOpen}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  status: statusSelectors.getStatus(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(statusOperations.verifyData())
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusIcon);
