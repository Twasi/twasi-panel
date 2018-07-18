import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AuthLoader from './auth/AuthLoader';
import RequireAuth from './auth/RequireAuth';
import configureStore from './state/store';

import Header from './views/common/Header';
import Content from './views/common/Content';
import Sidebar from './views/Sidebar/Sidebar';
import Footer from './views/Footer/Footer';

import PanelContent from './views/Panel/PanelContent';

import LanguageProvider from './translations/LanguageProvider';

import './styles/main.css';

const App = () => {
  const store = configureStore();

  return (
    <LanguageProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <MuiThemeProvider>
            <AuthLoader>
              <RequireAuth optional />
              <Content>
                <Header />
                <Switch>
                  <Route path="/public/:name" component={() => <div>Public</div>} />
                  <Route path="/" component={PanelContent} />
                </Switch>
                <Footer />
              </Content>
            </AuthLoader>
          </MuiThemeProvider>
        </BrowserRouter>
      </ReduxProvider>
    </LanguageProvider>
  );
};

export default App;
