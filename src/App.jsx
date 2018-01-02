import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Auth from './auth';
import configureStore from './state/store';

import Sidebar from './views/Sidebar/Sidebar';

import Overview from './views/Overview';
import Status from './views/Status';
import Plugins from './views/Plugins';
import Settings from './views/Settings';

import twasiLogo from './views/common/resources/twasi.svg';

import LanguageProvider from './translations/LanguageProvider';

const { Header, Content } = Layout;

const App = () => {
  const store = configureStore();

  return (
    <LanguageProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Auth>
            <Layout>
              <Sidebar />
              <Layout>
                <Header
                  style={{
                    background: '#fff',
                    padding: 0,
                    height: 65,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img
                    alt="Twasi Logo"
                    src={twasiLogo}
                    style={{ height: 40, marginRight: 15 }}
                  />
                  <h1>Twasi Board</h1>
                </Header>
                <Content
                  style={{
                    margin: '24px 16px',
                    padding: 24,
                    background: '#fff',
                    minHeight: 'calc( 100vh - 65px - 48px )'
                  }}
                >
                  <Switch>
                    <Route path="/" exact component={Overview} />
                    <Route path="/status" exact component={Status} />
                    <Route path="/settings" exact component={Settings} />
                    <Route path="/plugins" exact component={Plugins} />
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Auth>
        </BrowserRouter>
      </ReduxProvider>
    </LanguageProvider>
  );
};

export default App;
