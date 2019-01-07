import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import AuthLoader from './auth/AuthLoader';
import RequireAuth from './auth/RequireAuth';
import configureStore from './state/store';
import { appInfoSelectors, appInfoOperations } from './state/appInfo';

import Header from './views/common/Header';
import Content from './views/common/Content';
import Public from './views/Public/Public';
import Footer from './views/Footer/Footer';

import PanelContent from './views/Panel/PanelContent';
import LanguageProvider from './translations/LanguageProvider';

import './styles/main.css';

// Themes
import twasiDark from './themes/twasi-dark';
import twasiLight from './themes/twasi-light';

const App = () => {
  const store = configureStore();

  const mapStateToProps = state => ({
    theme: appInfoSelectors.getTheme(state)
  });

  const mapDispatchToProps = dispatch => ({
    loadTheme: () => dispatch(appInfoOperations.loadTheme())
  });

  const Themed = withRouter(connect(mapStateToProps, mapDispatchToProps)(props => {
    props.loadTheme();

    let selectedTheme = twasiDark;

    if (props.theme.toLowerCase() === 'twasi-light') {
      selectedTheme = twasiLight;
    }

    return (
      <MuiThemeProvider theme={selectedTheme}>
        <AuthLoader>
          <RequireAuth optional />
          <Content className={props.theme.toLowerCase()}>
            <Header />
            <Switch>
              <Route path="/profile/:name" component={Public} />
              <Route path="/" component={PanelContent} />
            </Switch>
            <Footer />
          </Content>
        </AuthLoader>
      </MuiThemeProvider>
    );
  }));

  Themed.propTypes = {
    theme: PropTypes.string,
    loadTheme: PropTypes.func
  };

  return (
    <LanguageProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Themed />
        </BrowserRouter>
      </ReduxProvider>
    </LanguageProvider>
  );
};

export default App;
