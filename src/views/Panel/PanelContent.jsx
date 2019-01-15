import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';

import RequireAuth from '../../auth/RequireAuth';

import Welcome from '../Welcome/Welcome';

import Overview from '../Overview';
import Status from '../Status';
import Plugins from '../Plugins';
import Profile from '../Profile';
import Moderators from '../Moderators';
import Urlshortener from '../Urlshortener';
import Commands from '../Commands';
import Songrequests from '../Songrequests';
import Giveaways from '../Giveaways';
import Votings from '../Votings';
import Support from '../Support';
import DevTools from '../DevTools';

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
          <Route path="/mods" exact component={Moderators} />
          <Route path="/commands" exact component={Commands} />
          <Route path="/urlshortener" exact component={Urlshortener} />
          <Route path="/dev" exact component={DevTools} />
          <Route path="/songrequests" exact component={Songrequests} />
          <Route path="/giveaways" exact component={Giveaways} />
          <Route path="/votings" exact component={Votings} />
          <Route path="/support" exact component={Support} />
        </Switch>
      </div>
      <div style={{ clear: 'both' }} />
    </Welcome>
  </RequireAuth>
);

export default PanelContent;
