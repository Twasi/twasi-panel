import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PublicCommands from './PublicCommands';
import PublicLeaderboard from './PublicLeaderboard';
import PublicQuotes from './PublicQuotes';

import './_style.css';
//import RequireAuth from '../../auth/RequireAuth';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

class Public extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <Paper className="pageContainer" style={{ borderRadius: '4px', padding: '0px' }}>
          <Grid style={{ alignItems: 'center' }} container spacing={0}>
            <Grid item xs={6}>
              <Tabs
                value={value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label={(
                  <span>
                    <Icon>code</Icon><br/>
                    Befehle
                  </span>
                )} />
                <Tab label={(
                  <span>
                    <Icon>format_quote</Icon><br/>
                    Zitate
                  </span>
                )} />
                <Tab label={(
                  <span>
                    <Icon>emoji_events</Icon><br/>
                    Bestenliste
                  </span>
                )} />
              </Tabs>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={{ float: 'right', marginRight: '15px' }}
                color="primary"
                variant="contained">
                Mit Twitch verbinden
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {value === 0 && <TabContainer>
          <PublicCommands/>
        </TabContainer>}
        {value === 1 && <TabContainer>
          <PublicQuotes/>
        </TabContainer>}
        {value === 2 && <TabContainer>
          <PublicLeaderboard/>
        </TabContainer>}
      </div>
    );
  }
}

export default Public;
