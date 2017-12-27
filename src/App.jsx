import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Auth from './auth';

import Sidebar from './views/Sidebar/Sidebar';

import Overview from './views/Overview';
import Status from './views/Status';
import Plugins from './views/Plugins';

import twasiLogo from './views/common/resources/twasi.svg';

const { Header, Content } = Layout;

const App = () => (
  <BrowserRouter>
    <Auth>
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
        <Layout>
          <Sidebar />
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
              <Route path="/plugins" exact component={Plugins} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Auth>
  </BrowserRouter>
);

export default App;
