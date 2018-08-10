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
import Urlshortener from '../Urlshortener/Urlshortener';
import Commands from '../Commands/Commands';
import Songrequests from '../Songrequests/Songrequests';
import Giveaways from '../Giveaways';
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
          <Route path="/profile" exact component={Profile} />
          <Route path="/commands" exact component={Commands} />
          <Route path="/urlshortener" exact component={Urlshortener} />
          <Route path="/fakechat" exact component={Fakechat} />
          <Route path="/dev" exact component={DevTools} />
          <Route path="/songrequests" exact component={Songrequests} />
          <Route path="/giveaways" exact component={Giveaways} />
        </Switch>
      </div>
      <div style={{ clear: 'both' }} />
    </Welcome>
  </RequireAuth>
);

export default PanelContent;
