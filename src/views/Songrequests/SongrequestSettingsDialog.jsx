import React from 'react';
import { FormattedMessage } from 'react-intl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import SettingsPage from './Settings/SettingsPage';
import BalancePage from './Settings/BalancePage';

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={0}>{children}</Box>
        </Typography>
    );
}

class SongrequestSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
    };
  }

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleTabChange = (event, tabValue) => {
    this.setState({
      tabValue,
    });
  };

  render() {
    const { classes, onClose, settings, enableSpotifyAuth, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        scroll="body"
        {...other}
      >
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label={<FormattedMessage id="songrequest.settings.tab.settings" />} />
          <Tab label={<FormattedMessage id="songrequest.settings.tab.balance" />} />
        </Tabs>
        <DialogContent>
          <TabPanel value={this.state.tabValue} index={0}>
            <SettingsPage settings={settings} enableSpotifyAuth={enableSpotifyAuth}/>
          </TabPanel>
          <TabPanel value={this.state.tabValue} index={1}>
            <BalancePage/>
          </TabPanel>
        </DialogContent>
      </Dialog>
    );
  }
}

export default SongrequestSettings;
