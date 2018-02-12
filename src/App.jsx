import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Auth from './auth';
import configureStore from './state/store';

import Sidebar from './views/Sidebar/Sidebar';
import Footer from './views/Footer/Footer';

import Overview from './views/Overview';
import Status from './views/Status';
import Plugins from './views/Plugins';
import Settings from './views/Settings';

import LanguageProvider from './translations/LanguageProvider';

const App = () => {
  const store = configureStore();

  return (
    <LanguageProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Auth>
            <div>
              <Sidebar />
              <div>
                <header className="header" style={{ backgroundColor: '#fff' }}>
                  <ul mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
                    <li key="1">Twasi Panel</li>
                    <li key="2">Dokumentation</li>
                  </ul>
                </header>
                <div style={{ padding: '50px 50px 0' }}>
                  <div style={{ padding: '24px 0' }}>
                    <div
                      style={{
                        padding: '0 24px',
                        minHeight: 'calc( 100vh - 64px - 50px - 66px - 48px )'
                      }}>
                      <Switch>
                        <Route path="/" exact component={Overview} />
                        <Route path="/status" exact component={Status} />
                        <Route path="/settings" exact component={Settings} />
                        <Route path="/plugins" exact component={Plugins} />
                      </Switch>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </Auth>
        </BrowserRouter>
      </ReduxProvider>
    </LanguageProvider>
  );
};

export default App;
