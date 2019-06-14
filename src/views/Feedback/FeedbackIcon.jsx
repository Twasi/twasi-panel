import React from 'react';
import { FormattedMessage } from 'react-intl';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Feedback from './Feedback';

class FeedbackIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div>
        <Tooltip
          title={<FormattedMessage id="feedbackswitch.headline" />}
          placement="bottom"
        >
          <Icon
            className="feedbackIcon"
            style={{ fontSize: 36, float: 'right', marginRight: '15px' }}
            onClick={() => this.setState({ modalOpen: true })}
          >
            favorite_border
          </Icon>
        </Tooltip>
        <Feedback
          selectedValue={this.state.selectedValue}
          open={this.state.modalOpen}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default FeedbackIcon;
