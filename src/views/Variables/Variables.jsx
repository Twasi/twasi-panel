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
import Checkbox from '@material-ui/core/Checkbox';

import { variablesSelectors, variablesOperations } from '../../state/variables';

import NotInstalledAlert from '../NotInstalledAlert/NotInstalledAlert.jsx';

class Variables extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);

    this.renderVariables = this.renderVariables.bind(this);
  }

  componentDidMount() {
    const { updateVariables } = this.props;
    updateVariables();
  }

  handleClose() {
    this.setState({ open: false });
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
            <Button
              variant="fab"
              color="primary"
              className="noshadow"
              mini
              aria-label="editCommand"
            >
              <Icon style={{ color: '#ffffff' }}>edit</Icon>
            </Button>
          </Tooltip>{' '}
          <Tooltip title={<FormattedMessage id="common.delete" />} placement="top">
            <Button
              variant="fab"
              color="secondary"
              className="noshadow"
              mini
              aria-label="deleteCommand"
            >
              <Icon style={{ color: '#ffffff' }}>delete</Icon>
            </Button>
          </Tooltip>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { disabled } = this.props;
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" href="/">
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.variables" /></Typography>
        </Breadcrumbs>
        {!disabled &&
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography>
            <h3 className="pageContainerTitle">
              <FormattedMessage id="variables.title" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: 16 }} onClick={this.props.updateVariables}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                <Button onClick={() => this.setState({ open: true })} variant="contained" color="primary" disabled={disabled}>
                  <FormattedMessage id="variables.new_variable" />
                </Button>
              </span>
            </h3>
            <small>
              <FormattedMessage id="variables.subtitle" />
            </small>
          </Typography>
        </Paper>
        }{!disabled &&
        <Paper className="pageContainer" style={{ padding: '0px', margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell>Variable</TableCell>
                <TableCell>Uses</TableCell>
                <TableCell>Ausgabe</TableCell>
                <TableCell style={{ minWidth: '100px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderVariables()}
            </TableBody>
          </Table>
        </Paper>
        }{disabled && <NotInstalledAlert />}
      </div>
    );
  }
}

Variables.propTypes = {
  updateVariables: PropTypes.func.isRequired,
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
  disabled: variablesSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(variablesOperations.verifyData()),
  updateVariables: () => dispatch(variablesOperations.loadVariables())
});

export default connect(mapStateToProps, mapDispatchToProps)(Variables);
