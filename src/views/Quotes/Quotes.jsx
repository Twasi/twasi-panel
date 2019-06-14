import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MUIDataTable from 'mui-datatables';

import { authSelectors } from '../../state/auth';
import { quotesSelectors, quotesOperations } from '../../state/quotes';

const columns = [
  {
    name: 'id',
    label: 'id',
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'quote',
    label: <FormattedMessage id="quotes.quote" />,
    options: {
      filter: false,
      sort: false
    }
  },
  {
    name: 'game',
    label: <FormattedMessage id="quotes.game" />,
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'reporter',
    label: <FormattedMessage id="quotes.reporter" />,
    options: {
      filter: true,
      sort: false
    }
  },
  {
    name: 'time',
    label: <FormattedMessage id="quotes.time" />,
    options: {
      filter: false,
      sort: false
    }
  }
];

const options = {
  filterType: 'textfield',
  selectableRows: false,
  elevation: 0,
  rowHover: false,
  textLabels: {
    body: {
      noMatch: <FormattedMessage id="datatables.body.nomatch" />,
      toolTip: <FormattedMessage id="datatables.body.tooltip" />
    },
    pagination: {
      next: <FormattedMessage id="datatables.pagination.next" />,
      previous: <FormattedMessage id="datatables.pagination.previous" />,
      rowsPerPage: <FormattedMessage id="datatables.pagination.rowsperpage" />,
      displayRows: 'of'
    },
    toolbar: {
      search: <FormattedMessage id="datatables.toolbar.search" />,
      downloadCsv: <FormattedMessage id="datatables.toolbar.downloadcsv" />,
      print: <FormattedMessage id="datatables.toolbar.print" />,
      viewColumns: <FormattedMessage id="datatables.toolbar.viewcolumns" />,
      filterTable: <FormattedMessage id="datatables.toolbar.filtertable" />
    },
    filter: {
      all: <FormattedMessage id="datatables.filter.all" />,
      title: <FormattedMessage id="datatables.filter.title" />,
      reset: <FormattedMessage id="datatables.filter.reset" />
    },
    viewColumns: {
      title: <FormattedMessage id="datatables.viewcolumns.title" />,
      titleAria: <FormattedMessage id="datatables.viewcolumns.titlearia" />
    },
    selectedRows: {
      text: <FormattedMessage id="datatables.selectedrows.text" />,
      delete: <FormattedMessage id="datatables.selectedrows.delete" />,
      deleteAria: <FormattedMessage id="datatables.selectedrows.deletearia" />
    }
  }
};

class Quotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleClickBreadCrumb = this.handleClickBreadCrumb.bind(this);
    this.renderQuotes = this.renderQuotes.bind(this);
  }

  handleClickBreadCrumb(event, value) {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  componentDidMount() {
    const { updateQuotes } = this.props;
    updateQuotes();
  }

  handleClose() {
    this.setState({ open: false });
  }

  renderQuotes() {
    const { quotes } = this.props;
    return quotes.map(quote => (
      Object.values(quote)
    ));
  }

  render() {
    const { userName, avatar } = this.props;
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.quotes" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: '4px' }}>
          <Grid container spacing={16}>
            <Grid item xs={9}>
              <List style={{ margin: '0px', padding: '0px' }}>
                <ListItem style={{ margin: '0px', padding: '0px' }} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Typography style={{ float: 'left' }} color="textPrimary">
                          {userName}
                        </Typography>
                        <Typography style={{ float: 'left', marginLeft: '5px' }} color="textSecondary">
                          (Grand Theft Auto V)
                        </Typography>
                        <Typography style={{ float: 'left', marginLeft: '5px' }} color="textPrimary">
                          #420
                        </Typography>
                        <br />
                        {'- "Ich bin einfach mal so frei und schleich mich in dein Panel :D"'}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={3}>
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" onClick={this.props.updateQuotes}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
              </span>
            </Grid>
          </Grid>
        </Paper>
        <Paper className="pageContainer" style={{ padding: '0px', borderRadius: '4px' }}>
          <MUIDataTable
            title={
              <Typography>
                <h3 className="pageContainerTitle">
                  <FormattedMessage id="quotes.title" />
                </h3>
                <small>
                  <FormattedMessage id="quotes.subtitle" />
                </small>
              </Typography>
            }
            data={this.renderQuotes()}
            columns={columns}
            options={options}
          />
        </Paper>
      </div>
    );
  }
}


Quotes.propTypes = {
  userName: PropTypes.string,
  avatar: PropTypes.string,
  updateQuotes: PropTypes.func.isRequired,
  quotes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    numid: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    game: PropTypes.string.isRequired,
    reporter: PropTypes.string.isRequired
  })),
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  quotes: quotesSelectors.getQuotes(state),
  isLoaded: quotesSelectors.isLoaded(state),
  disabled: quotesSelectors.isDisabled(state),
  userName: authSelectors.getUser(state).displayName,
  avatar: authSelectors.getUserAvatar(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(quotesOperations.verifyData()),
  updateQuotes: () => dispatch(quotesOperations.loadQuotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
