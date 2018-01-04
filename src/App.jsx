import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import Auth from './auth';
import configureStore from './state/store';

import Sidebar from './views/Sidebar/Sidebar';
import Footer from './views/Footer/Footer';

import Overview from './views/Overview';
import Status from './views/Status';
import Plugins from './views/Plugins';
import Settings from './views/Settings';

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
                <Header className="header" style={{ backgroundColor: '#fff' }}>
                  <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                  >
                    <Menu.Item key="1">Twasi Panel</Menu.Item>
                    <Menu.Item key="2">Dokumentation</Menu.Item>
                  </Menu>
                </Header>
                <Content style={{ padding: '50px 50px 0' }}>
                  <Layout style={{ padding: '24px 0' }}>
                    <Content
                      style={{
                        padding: '0 24px',
                        minHeight: 'calc( 100vh - 64px - 50px - 66px - 48px )'
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
                </Content>
                <Footer />
              </Layout>
            </Layout>
          </Auth>
        </BrowserRouter>
      </ReduxProvider>
    </LanguageProvider>
  );
};

export default App;
