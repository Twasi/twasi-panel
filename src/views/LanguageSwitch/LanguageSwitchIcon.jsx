import React from 'react';
import { FormattedMessage } from 'react-intl';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import LanguageSwitch from './LanguageSwitch';

class LanguageSwitchIcon extends React.Component {
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
          title="Sprache ändern"
          placement="bottom"
        >
          <Icon
            className="languageIcon"
            style={{ fontSize: 36, float: 'right', marginRight: '15px' }}
            onClick={() => this.setState({ open: true })}
          >
            language
          </Icon>
        </Tooltip>
        <LanguageSwitch
          selectedValue={this.state.selectedValue}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default LanguageSwitchIcon;
