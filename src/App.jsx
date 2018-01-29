import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon } from 'antd';

import Auth from './auth';
import configureStore from './state/store';

import Sidebar from './views/Sidebar/Sidebar';
import Footer from './views/Footer/Footer';

import Overview from './views/Overview';
import Status from './views/Status';
import Plugins from './views/Plugins';
import Settings from './views/Settings';

import Songrequests from './views/Extensions/Songrequests/Songrequests';
import Commands from './views/Extensions/Commands/Commands';

import LanguageProvider from './translations/LanguageProvider';

const { Header, Content } = Layout;

const App = () => {
  const store = configureStore();

  const dropdown = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://panel-beta.twasi.net/"
        >
          Ausloggen
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <LanguageProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Auth>
            <Layout style={{ height: '100vh' }}>
              <Sidebar />
              <Layout>
                <Header className="header" style={{ backgroundColor: '#fff' }}>
                  <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px', float: 'left' }}
                  >
                    <Menu.Item key="1">Twasi Panel</Menu.Item>
                    <Menu.Item key="2">Dokumentation</Menu.Item>
                  </Menu>
                  <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px', float: 'right' }}
                  >
                    <Dropdown overlay={dropdown} trigger={['click']}>
                      <div style={{ cursor: 'pointer' }}>
                        Eingeloggt als <b>Name</b> <Icon type="down" />
                      </div>
                    </Dropdown>
                  </Menu>
                </Header>
                <Layout style={{ padding: '24px 0' }}>
                  <Content
                    style={{
                      padding: '0 24px'
                    }}
                  >
                    <Switch>
                      <Route path="/" exact component={Overview} />
                      <Route path="/status" exact component={Status} />
                      <Route path="/settings" exact component={Settings} />
                      <Route path="/commands" exact component={Commands} />
                      <Route
                        path="/songrequests"
                        exact
                        component={Songrequests}
                      />
                      <Route path="/plugins" exact component={Plugins} />
                    </Switch>
                  </Content>
                </Layout>
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
