import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Auth from './auth';
import configureStore from './state/store';

import Header from './views/common/Header';
import Content from './views/common/Content';
import Sidebar from './views/Sidebar/Sidebar';
import Footer from './views/Footer/Footer';

import Overview from './views/Overview';
import Status from './views/Status';
import Plugins from './views/Plugins';
import Settings from './views/Settings';

import LanguageProvider from './translations/LanguageProvider';

import './styles/main.css';

const App = () => {
  const store = configureStore();

  return (
    <LanguageProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Auth>
            <MuiThemeProvider>
              <Content>
                <Header />
                <Sidebar />
                <div className="content">
                  <Switch>
                    <Route path="/" exact component={Overview} />
                    <Route path="/status" exact component={Status} />
                    <Route path="/settings" exact component={Settings} />
                    <Route path="/plugins" exact component={Plugins} />
                  </Switch>
                </div>
                <div style={{ clear: 'both' }} />
                <Footer />
              </Content>
            </MuiThemeProvider>
          </Auth>
        </BrowserRouter>
      </ReduxProvider>
    </LanguageProvider>
  );
};

export default App;
