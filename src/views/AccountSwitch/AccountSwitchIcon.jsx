import React from 'react';
import { FormattedMessage } from 'react-intl';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import AccountSwitch from './AccountSwitch';

class AccountSwitchIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <div>
        <Tooltip
          title={<FormattedMessage id="accountswitch.switch_account" />}
          placement="bottom"
        >
          <Icon
            className="swapIcon"
            style={{ fontSize: 36, float: 'right' }}
            onClick={() => this.setState({ open: true })}
          >
            swap_horizontal_circle
          </Icon>
        </Tooltip>
        <AccountSwitch
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default AccountSwitchIcon;
