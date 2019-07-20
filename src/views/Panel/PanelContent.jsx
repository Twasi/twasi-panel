import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';

import RequireAuth from '../../auth/RequireAuth';

import Overview from '../Overview';
import Status from '../Status';
import Plugins from '../Plugins';
import Profile from '../Profile';
import Moderators from '../Moderators';
import Urlshortener from '../Urlshortener';
import Commands from '../Commands';
import Variables from '../Variables';
import Timers from '../Timers';
import Songrequests from '../Songrequests';
import Giveaways from '../Giveaways';
import Quotes from '../Quotes';
import Votings from '../Votings';
import Support from '../Support';
import DevTools from '../DevTools';

const PanelContent = () => (
  <RequireAuth>
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
        <Route path="/variables" exact component={Variables} />
        <Route path="/timers" exact component={Timers} />
        <Route path="/urlshortener" exact component={Urlshortener} />
        <Route path="/dev" exact component={DevTools} />
        <Route path="/songrequests" exact component={Songrequests} />
        <Route path="/giveaways" exact component={Giveaways} />
        <Route path="/quotes" exact component={Quotes} />
        <Route path="/votings" exact component={Votings} />
        <Route path="/support" exact component={Support} />
      </Switch>
    </div>
    <div style={{ clear: 'both' }} />
  </RequireAuth>
);

export default PanelContent;
