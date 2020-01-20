import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import './_style.css';

import NotFunctionalAlert from '../NotFunctionalAlert/NotFunctionalAlert';

import AccountData from './AccountData';
import PublicProfile from './PublicProfile';
import OwnBotAccount from './OwnBotAccount';
import SocialMedia from './SocialMedia';
import Badges from './Badges';

class Profile extends Component {

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.profile" /></Typography>
        </Breadcrumbs>
        <NotFunctionalAlert/>
        <Row>
          <Col sm={6}>
            <AccountData/>
            <PublicProfile/>
          </Col>
          <Col sm={6}>
            <OwnBotAccount/>
            <SocialMedia/>
            <Badges/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
