import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Chip from '@material-ui/core/Chip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';

import './_style.css';

import { supportSelectors, supportOperations } from '../../state/support';
import SupportTicket from './SupportTicket';
import SupportTicketMessage from "./SupportTicketMessage";

class Support extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.handleClickBreadCrumb = this.handleClickBreadCrumb.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

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
    this.setState({ open: false });
  }

  renderSupportTickets() {
    const renderMyCard = (message, displayCloseMessage) => (
        <SupportTicketMessage isStaff={message.staff} sender={message.sender} message={message} displayCloseMessage={displayCloseMessage} />
    );

    return this.props.myTickets.map(ticket => (
      <ExpansionPanel style={{ marginTop: '25px' }}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <h4 className="pageContainerTitle"><Typography>Betreff</Typography></h4><Typography><small>{ticket.topic}</small></Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography><h4 className="pageContainerTitle">Erstellt am</h4><small>{ticket.createdAt}</small></Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography><h4 className="pageContainerTitle">Erledigt am</h4><small>{ticket.closedAt}</small></Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography><h4 className="pageContainerTitle">Status</h4><Chip className="statusBadgeSupport" color="primary" label={ticket.state} /></Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <Card style={{ borderRadius: '0px 0px 4px 4px' }} className="pluginCard">
          <CardContent style={{ padding: '24px' }}>
            {ticket.messages.map((message, index) => renderMyCard(message, index === ticket.messages.length - 1))}
            <TextField
              label="Eine Nachricht hinzufügen"
              fullWidth
              multiline
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="send-support-message"
                    >
                      <Icon>
                        send
                      </Icon>
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </CardContent>
        </Card>
      </ExpansionPanel>
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
              Deine Support Tickets
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: '16px' }} onClick={this.props.loadMyTickets}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  Aktualisieren
                </Button>
                <Button onClick={() => this.setState({ open: true })} variant="contained" color="primary">
                  Neues Ticket erstellen
                </Button>
                <SupportTicket
                  open={this.state.open}
                  onClose={this.handleClose}
                />
              </span>
            </h3>
            <small>
              Falls du Fragen hast oder Hilfe benötigst kannst du hier ganz einfach ein Support Ticket erstellen.
            </small>
          </Typography>
          {this.renderSupportTickets()}
        </Paper>
      </div>
    );
  }
}

Support.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string
};

Support.defaultProps = {
  userName: 'Unknown',
  avatar: 'Unknown'
};

const mapStateToProps = state => ({
  myTickets: supportSelectors.getMyTickets(state)
});

const mapDispatchToProps = dispatch => ({
  loadMyTickets: () => dispatch(supportOperations.loadMyTickets())
});

export default connect(mapStateToProps, mapDispatchToProps)(Support);
