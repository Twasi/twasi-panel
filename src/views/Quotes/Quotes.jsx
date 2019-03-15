import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const quotes = [{game: 'Minecraft', time: '15.03.2019 - 10:32', quote: 'Niemand hat die Absicht eine Mauer zu errichten!'}];

class Quotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }
  renderQuotes() {

    return quotes.map(quote => (
      <TableRow>
        <TableCell>
          <b>{quote.game}</b>
        </TableCell>
        <TableCell>
          {quote.time}
        </TableCell>
        <TableCell
          style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '200px' }}
        >
          {quote.quote}
        </TableCell>
        <TableCell>
          <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
            <Button
              variant="fab"
              color="secondary"
              className="noshadow"
              mini
              aria-label="deleteQuote"
            >
              <Icon style={{ color: '#ffffff' }}>delete</Icon>
            </Button>
          </Tooltip>{' '}
          <Tooltip title={<FormattedMessage id="quotes.post" />} placement="top">
            <Button
              variant="fab"
              color="primary"
              className="noshadow"
              mini
              aria-label="postQuote"
            >
              <Icon style={{ color: '#ffffff' }}>send</Icon>
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.quotes" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <h4 className="pageContainerTitle">
            <FormattedMessage id="quotes.title" />
            <span style={{ float: 'right' }}>
              <Button variant="contained" color="primary">
                <Icon style={{ marginRight: '5px' }}>cached</Icon>
                <FormattedMessage id="common.refresh" />
              </Button>
            </span>
          </h4>
          <small>
            <FormattedMessage id="quotes.subtitle" />
          </small>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell><FormattedMessage id="quotes.game" /></TableCell>
                <TableCell><FormattedMessage id="quotes.time" /></TableCell>
                <TableCell><FormattedMessage id="quotes.quote" /></TableCell>
                <TableCell style={{ minWidth: '100px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderQuotes()}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}


export default Quotes;
