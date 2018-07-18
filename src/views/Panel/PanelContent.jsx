import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';

import RequireAuth from '../../auth/RequireAuth';

import Welcome from '../Welcome/Welcome';

import Overview from '../Overview';
import Status from '../Status';
import Plugins from '../Plugins';
import Fakechat from '../Fakechat';
import Profile from '../Profile/Profile';
import Commands from '../Commands/Commands';
import Songrequests from '../Songrequests/Songrequests';
import DevTools from '../DevTools/DevTools';

const PanelContent = () => (
  <RequireAuth>
    <Welcome>
      <div style={{ float: 'left' }}>
        <Sidebar />
      </div>
      <div className="content">
        <Switch>
          <Route path="/" exact component={Overview} />
          <Route path="/status" exact component={Status} />
          <Route path="/plugins" exact component={Plugins} />
          <Route path="/fakechat" exact component={Fakechat} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/commands" exact component={Commands} />
          <Route path="/dev" exact component={DevTools} />
          <Route
            path="/songrequests"
            exact
            component={Songrequests}
          />
        </Switch>
      </div>
      <div style={{ clear: 'both' }} />
    </Welcome>
  </RequireAuth>
);

export default PanelContent;
