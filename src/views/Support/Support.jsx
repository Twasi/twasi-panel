import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './_style.css';

import { supportSelectors, supportOperations } from '../../state/support';
import SupportTicketModal from './SupportTicketModal';
import SupportTicket from './SupportTicket';

function TabContainer(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

class Support extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
      tabValue: 0
    };
    this.handleClickBreadCrumb = this.handleClickBreadCrumb.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleTabChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  handleClickBreadCrumb(event, value) {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  componentDidMount() {
    const { loadMyTickets } = this.props;
    loadMyTickets();
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  renderSupportTickets() {
    return this.props.myTickets.map(ticket => (
      <SupportTicket ticket={ticket} />
    ));
  }

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.support" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Typography>
            <h3 className="pageContainerTitle">
              <FormattedMessage id="support.headline" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: '16px' }} onClick={this.props.loadMyTickets}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ modalOpen: true })} variant="contained" color="primary">
                  <FormattedMessage id="support.create_new_ticket" />
                </Button>
                <SupportTicketModal
                  open={this.state.modalOpen}
                  onClose={this.handleClose}
                  {...this.props}
                />
              </span>
            </h3>
            <small>
              <FormattedMessage id="support.subheadline" />
            </small>
          </Typography>
        </Paper>
        <Tabs
          style={{ marginTop: '23px', borderRadius: '3px 3px 0px 0px' }}
          value={this.state.tabValue}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Offene Tickets" />
          <Tab label="Geschlossene Tickets" />
        </Tabs>
        <Paper className="pageContainer" style={{ marginTop: '0px', paddingTop: '1px' }}>
          {this.state.tabValue === 0 && <TabContainer>
            {this.renderSupportTickets()}
          </TabContainer>}
          {this.state.tabValue === 1 && <TabContainer>

          </TabContainer>}
        </Paper>
      </div>
    );
  }
}

Support.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  myTicket: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

Support.defaultProps = {
  userName: 'Unknown',
  avatar: 'Unknown'
};

const mapStateToProps = state => ({
  myTickets: supportSelectors.getMyTickets(state)
});

const mapDispatchToProps = dispatch => ({
  loadMyTickets: () => dispatch(supportOperations.loadMyTickets()),
  createTicket: (category, topic, message) => dispatch(supportOperations.createTicket(category, topic, message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Support);
