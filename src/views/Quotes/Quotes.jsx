import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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
      displayRows: 'von'
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
  }

  componentDidMount() {
    const { updateQuotes } = this.props;
    updateQuotes();
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleClose = () => {
    this.setState({ modalOpen: false });
  }

  renderQuotes = () => {
    const { quotes } = this.props;
    return quotes.map(quote => (
      Object.values(quote)
    ));
  }

  render() {
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.quotes" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ padding: '0px', borderRadius: '4px' }}>
          <MUIDataTable
            title={
              <Typography>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="quotes.title" />
                </h4>
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
