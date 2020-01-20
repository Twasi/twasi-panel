import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';

import './_style.css';

class Smartlife extends Component {

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
          <Typography color="textPrimary"><FormattedMessage id="sidebar.smartlife" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              Smartlife
              <span style={{ float: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                >
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
              </span>
            </h4>
            <small>
              Verbinde deine Smartlife Geräte mit Twasi, um diese über den Chat oder über Events zu steuern.
            </small>
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default Smartlife;
