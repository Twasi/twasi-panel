import React from 'react';
import { FormattedMessage } from 'react-intl';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import ThemeSwitch from './ThemeSwitch';
import { connect } from 'react-redux';

import { themesOperations } from '../../state/themes';

class ThemeSwitchIcon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div>
        <Tooltip
          title={<FormattedMessage id="themeswitch.switch_theme" />}
          placement="bottom"
        >
          <Icon
            className="themeIcon"
            style={{ fontSize: 36, float: 'right', marginRight: '15px' }}
            onClick={() => {
              this.setState({ modalOpen: true });
              this.props.updateInstalledThemes();
            }}
          >
            color_lens
          </Icon>
        </Tooltip>
        <ThemeSwitch
          open={this.state.modalOpen}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  updateInstalledThemes: () => dispatch(themesOperations.loadInstalledThemes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitchIcon);
