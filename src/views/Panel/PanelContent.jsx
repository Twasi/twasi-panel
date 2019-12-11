import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Sidebar from '../Sidebar/Sidebar';

import RequireAuth from '../../auth/RequireAuth';

import Overview from '../Overview';
import Plugins from '../Plugins';
import Profile from '../Profile';
import ThemeCreator from '../ThemeCreator';
import ThemeStore from '../ThemeStore';
import Moderators from '../Moderators';
import Urlshortener from '../Urlshortener';
import Commands from '../Commands';
import Variables from '../Variables';
import Timers from '../Timers';
import Songrequests from '../Songrequests';
import Giveaways from '../Giveaways';
import Quotes from '../Quotes';
import Chatfilter from '../Chatfilter';
import Support from '../Support';
import DevTools from '../DevTools';
import UserManager from '../UserManager';

const PanelContent = () => (
    <RequireAuth>
        <div style={{float: 'left'}}>
            <Sidebar/>
        </div>
        <div className="content">
            <Switch>
                <Route path="/" exact component={Overview}/>
                <Route path="/plugins" exact component={Plugins}/>
                <Route path="/profile" exact component={Profile}/>
                <Route path="/themecreator" exact component={ThemeCreator}/>
                <Route path="/themes" exact component={ThemeStore}/>
                <Route path="/mods" exact component={Moderators}/>
                <Route path="/commands" exact component={Commands}/>
                <Route path="/variables" exact component={Variables}/>
                <Route path="/timers" exact component={Timers}/>
                <Route path="/urlshortener" exact component={Urlshortener}/>
                <Route path="/dev" exact component={DevTools}/>
                <Route path="/songrequests" exact component={Songrequests}/>
                <Route path="/giveaways" exact component={Giveaways}/>
                <Route path="/quotes" exact component={Quotes}/>
                <Route path="/chatfilter" exact component={Chatfilter}/>
                <Route path="/support" exact component={Support}/>
                <Route path="/manager" exact component={UserManager}/>
            </Switch>
        </div>
        <div style={{clear: 'both'}}/>
    </RequireAuth>
);

export default PanelContent;
