import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { addLocaleData, IntlProvider } from 'react-intl';
import { SnackbarProvider } from 'notistack';

import AuthLoader from './auth/AuthLoader';
import configureStore from './state/store';
import { appInfoSelectors, appInfoOperations } from './state/appInfo';
import { i18nSelectors, i18nOperations } from './state/i18n';
import { themesSelectors } from './state/themes';

import Header from './views/common/Header';
import Content from './views/common/Content';
import Public from './views/Public/Public';
import Footer from './views/common/Footer/Footer';
import Welcome from './views/Welcome/Welcome';
import Branding from './views/Branding';
import TOS from './views/common/TOS';
import Imprint from './views/common/Imprint';
import Privacy from './views/common/Privacy';

import SnowStorm from 'react-snowstorm';

import PanelContent from './views/Panel/PanelContent';

import './styles/main.css';
import {loadCustomCss, loadCustomOverrides} from './customTheme.js';

// Themes
import twasiDark from './themes/twasi-dark/twasi-dark';
import twasiDarkBlue from './themes/twasi-darkblue/twasi-darkblue';
import bttvDark from './themes/bttv-dark/bttv-dark';
import tipeeeDark from './themes/tipeee-dark/tipeee-dark';
import windows95 from './themes/windows95/windows95';
import halloween from './themes/halloween/halloween';

import germanData from 'react-intl/locale-data/de';
import german from './translations/de_de';
import englishData from 'react-intl/locale-data/en';
import english from './translations/en_en';

addLocaleData(germanData);
addLocaleData(englishData);

const App = () => {
  const store = configureStore();

  const mapStateToProps = state => ({
    theme: appInfoSelectors.getTheme(state),
    bannerAsHeader: appInfoSelectors.getBannerAsHeader(state),
    comicsans: appInfoSelectors.getComicSans(state),
    language: i18nSelectors.getLocale(state),
    installedthemes: themesSelectors.getInstalledThemes(state),
  });

  const mapDispatchToProps = dispatch => ({
    loadTheme: () => dispatch(appInfoOperations.loadTheme()),
    loadBannerAsHeader: () => dispatch(appInfoOperations.loadBannerAsHeader()),
    loadComicSans: () => dispatch(appInfoOperations.loadComicSans()),
    loadLanguage: () => dispatch(i18nOperations.loadLanguage()),
  });

  const Themed = withRouter(connect(mapStateToProps, mapDispatchToProps)(props => {
    props.loadTheme();
    props.loadLanguage();
    props.loadBannerAsHeader();
    props.loadComicSans();

    let selectedTheme = twasiDarkBlue;
    if (props.theme.toLowerCase() === 'twasi-dark') {
      selectedTheme = twasiDark;
    } else if (props.theme.toLowerCase() === 'bttv-dark') {
      selectedTheme = bttvDark;
    } else if (props.theme.toLowerCase() === 'tipeee-dark') {
      selectedTheme = tipeeeDark;
    } else if (props.theme.toLowerCase() === 'windows95') {
      selectedTheme = windows95;
    } else if (props.theme.toLowerCase() === 'halloween') {
      selectedTheme = halloween;
    }

    let customtheme = '';
    let customInstalledTheme = '';
    props.installedthemes.map(installedtheme => {
      if(installedtheme.id === props.theme.toLowerCase()) {
        customInstalledTheme = installedtheme;
        customtheme = loadCustomOverrides(installedtheme)
        selectedTheme = customtheme;
      }
      return selectedTheme;
    })

    let selectedLanguage = german;

    if (props.language.toLowerCase() === 'de_de') {
      selectedLanguage = german;
    } else if (props.language.toLowerCase() === 'en_gb') {
      selectedLanguage = english;
    }

    return (
      <IntlProvider locale="de" messages={selectedLanguage}>
        <MuiThemeProvider theme={selectedTheme}>
          {loadCustomCss(customInstalledTheme)}
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <AuthLoader>
              <Content className={props.comicsans ? props.theme.toLowerCase() + " comicsans" : props.theme.toLowerCase()}>
                {customInstalledTheme !== '' && customInstalledTheme.theme.specialProperties !== null && customInstalledTheme.theme.specialProperties.snow && <SnowStorm followMouse={false} freezeOnBlur={false} />}
                <Header logocolor={customInstalledTheme && customInstalledTheme.theme.mainTextLogo} />
                <Switch>
                  <Route path="/profile/:name" component={Public} />
                  <Route path="/setup" component={Welcome} />
                  <Route path="/branding" component={Branding} />
                  <Route path="/tos" component={TOS} />
                  <Route path="/imprint" component={Imprint} />
                  <Route path="/privacy" component={Privacy} />
                  <Route path="/" component={PanelContent} />
                </Switch>
                <Footer />
              </Content>
            </AuthLoader>
          </SnackbarProvider>
        </MuiThemeProvider>
      </IntlProvider>
    );
  }));

  Themed.propTypes = {
    theme: PropTypes.string,
    loadTheme: PropTypes.func,
    language: PropTypes.string,
    loadLanguage: PropTypes.func
  };

  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Themed />
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;
