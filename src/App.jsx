import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AuthLoader from './auth/AuthLoader';
import RequireAuth from './auth/RequireAuth';
import configureStore from './state/store';

import Header from './views/common/Header';
import Content from './views/common/Content';
import Public from './views/Public/Public';
import Footer from './views/Footer/Footer';

import PanelContent from './views/Panel/PanelContent';

import LanguageProvider from './translations/LanguageProvider';

import './styles/main.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00aeae',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e53935',
      contrastText: '#ffffff',
    },
  },
  overrides: {
    MuiPaper: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: 'rgba(255, 255, 255, 0.7)', // Some CSS
        background: '#2c2c2c',
      },
    },
    MuiCardContent: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: 'rgba(255, 255, 255, 0.7)', // Some CSS
      },
    },
    MuiMenuItem: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: 'rgba(255, 255, 255, 0.7)', // Some CSS
      },
    },
  },
});

const App = () => {
  const store = configureStore();

  return (
    <LanguageProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <AuthLoader>
              <RequireAuth optional />
              <Content>
                <Header />
                <Switch>
                  <Route path="/profile/:name" component={Public} />
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
