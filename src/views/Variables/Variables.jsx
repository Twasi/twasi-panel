import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';

import VariableAddDialog from './VariableAddDialog';
import VariableEditDialog from './VariableEditDialog';

import JohnTravolta from '../common/resources/johntravolta.gif';

import { variablesSelectors, variablesOperations } from '../../state/variables';

import NotInstalledAlert from '../NotInstalledAlert/NotInstalledAlert.jsx';

class Variables extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      openAddVariableDialog: false,
      openEditVariableDialog: false,
      openNotification: false,
      notification: '',
      editDialogContent: ''
    };

    this.handleClickBreadCrumb = this.handleClickBreadCrumb.bind(this);
    this.renderVariables = this.renderVariables.bind(this);
  }

  handleClickBreadCrumb(event, value) {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  componentDidMount() {
    const { updateVariables } = this.props;
    updateVariables();
  }

  handleCloseAddVariableDialog = () => {
    this.setState({ openAddVariableDialog: false });
  };

  handleCloseEditVariableDialog = () => {
    this.setState({ openEditVariableDialog: false });
  };

  handleOpenNotification = variableName => {
    this.setState({
      openNotification: true,
      notification: 'Die Variable "' + variableName + '" wurde erfolgreich gelöscht.'
    });
  };

  handleCloseNotification = () => {
    this.setState({ openNotification: false });
  };

  renderVariablesEmpty() {
    return (
      <Paper className="pageContainer" style={{ marginTop: '0px', paddingTop: '1px', borderRadius: '0px 0px 4px 4px' }}>
        <Typography component={'div'} style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
          <img
            style={{ position: 'relative', height: '150px' }}
            src={JohnTravolta}
            alt="JohnTravolta"
          />
          <h3 className="pageContainerTitle">
            <FormattedMessage id="variables.no_variable.title" />
          </h3>
          <small>
            <FormattedMessage id="variables.no_variable.subtitle" />
          </small>
          <br /><br />
          <Button onClick={() => this.setState({ openAddVariableDialog: true })} variant="contained" color="primary" disabled={this.props.disabled}>
            <FormattedMessage id="variables.new_variable" />
          </Button>
        </Typography>
      </Paper>
    );
  }

  renderVariables() {
    const { variables } = this.props;

    return variables.map(variable => (
      <TableRow>
        <TableCell>
          <b>{variable.name}</b>
        </TableCell>
        <TableCell
          style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '200px' }}
        >
          {variable.output}
        </TableCell>
        <TableCell>
          <Tooltip title={<FormattedMessage id="common.edit" />} placement="top">
            <Fab
              color="primary"
              className="noshadow"
              size="small"
              aria-label="editCommand"
              onClick={() => {
                  this.setState({ openEditVariableDialog: true, editDialogContent: variable })
              }}
            >
              <Icon className="actionButtons">edit</Icon>
            </Fab>
          </Tooltip>{' '}
          <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
            <Fab
              color="secondary"
              className="noshadow"
              size="small"
              aria-label="deleteVariable"
              onClick={() => {
                  this.props.removeVariable(variable.id);
                  this.handleOpenNotification(variable.name)
              }}
            >
              <Icon className="actionButtons">delete</Icon>
            </Fab>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { disabled } = this.props;
    if (this.props.isActionSuccess) {
      this.props.updateVariables()
    }
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.variables" /></Typography>
        </Breadcrumbs>
        {!disabled &&
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="variables.title" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updateVariables}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ openAddVariableDialog: true })} variant="contained" color="primary" disabled={disabled}>
                  <FormattedMessage id="variables.new_variable" />
                </Button>
              </span>
            </h4>
            <small>
              <FormattedMessage id="variables.subtitle" />
            </small>
          </Typography>
        </Paper>
        }{!disabled && this.renderVariables().length !== 0 &&
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell>Variable</TableCell>
                <TableCell>Ausgabe</TableCell>
                <TableCell style={{ width: '120px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="anim">
              {this.renderVariables()}
            </TableBody>
          </Table>
        </Paper>
        }
        {this.state.openAddVariableDialog &&
          <VariableAddDialog
            open
            onClose={this.handleCloseAddVariableDialog}
          />
        }
        {this.state.openEditVariableDialog &&
          <VariableEditDialog
            open
            onClose={this.handleCloseEditVariableDialog}
            variableObject={this.state.editDialogContent}
          />
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.openNotification}
          autoHideDuration={5000}
          onClose={this.handleCloseNotification}
          message={this.state.notification}
        />
        {disabled && <NotInstalledAlert />}
        {this.renderVariables().length === 0 && !this.props.isLoading && this.renderVariablesEmpty()}
      </div>
    );
  }
}

Variables.propTypes = {
  updateVariables: PropTypes.func.isRequired,
  removeVariable: PropTypes.func.isRequired,
  variables: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    output: PropTypes.string.isRequired
  })),
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  variables: variablesSelectors.getVariables(state),
  isLoaded: variablesSelectors.isLoaded(state),
  isLoading: variablesSelectors.isLoading(state),
  isActionSuccess: variablesSelectors.isActionSuccess(state),
  disabled: variablesSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(variablesOperations.verifyData()),
  removeVariable: (id) => dispatch(variablesOperations.removeVariable(id)),
  updateVariables: () => dispatch(variablesOperations.loadVariables())
});

export default connect(mapStateToProps, mapDispatchToProps)(Variables);
