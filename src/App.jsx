import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout, Icon, Menu } from 'antd';

import Auth from './auth';
import Main from './views/Main';
import Status from './views/Status/Status';

import twasiLogo from './views/common/resources/twasi.svg';

const {
  Header, Content, Footer, Sider
} = Layout;

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
          <img alt="Twasi Logo" src={twasiLogo} style={{ height: 40, marginRight: 15 }} />
          <h1>Twasi Board</h1>
        </Header>
        <Layout>
          <Sider trigger={null} collapsible collapsed={false}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Icon type="home" />
                <span>Overview</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 'calc( 100vh - 65px - 48px )'
            }}
          >
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/status" exact component={Status} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Auth>
  </BrowserRouter>
);

export default App;
