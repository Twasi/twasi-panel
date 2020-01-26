import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AddSequenceDialog from './AddSequenceDialog';

import './_style.css';

import smartlife_logo from '../common/resources/smartlife.png';

import { smartlifeSelectors, smartlifeOperations } from '../../state/integrations/smartlife';

class Smartlife extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      tabContainer: "",
      openAddSequenceDialog: false,
      homes: 0,
      page: 1
    };
  }
  componentDidMount() {
    const { updateSmartlifeAccount, updateSequences } = this.props;
    updateSmartlifeAccount();
    updateSequences(this.state.page);
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleCloseAddSequenceDialog = () => {
    this.setState({ openAddSequenceDialog: false });
  };

  renderPagination() {
    const { pagination, updateSequences } = this.props;
    return (
      <Paper style={{ textAlign: 'center' }} className="pageContainer">
      {_.times(pagination.pages, i =>
        <Fab
          key={i+1}
          onClick={() => {
            updateSequences(i+1)
            this.setState({ page: i+1});
          }}
          style={{ marginLeft: '5px', marginRight: '5px' }}
          size="small"
          disabled={i+1 === this.state.page}
          color={i+1 === this.state.page ? "default" : "primary"}
        >
        {i+1}
        </Fab>
      )}
      </Paper>
    );
  }

  renderDevicesEmpty() {
    return (
      <Paper className="pageContainer" style={{ marginTop: '0px', paddingTop: '1px', borderRadius: '0px 0px 4px 4px' }}>
        <Typography component={'div'} style={{ textAlign: 'center', marginTop: '150px', marginBottom: '150px' }}>
          <img
            style={{ position: 'relative', height: '150px' }}
            src={smartlife_logo}
            alt="smartlife logo"
          />
          <h3 className="pageContainerTitle">
            Du hast noch keine Geräte in deiner Smartlife App.
          </h3>
          <small>
            Füge Geräte zu deiner Smartlife App hinzu um diese über Twasi zu steuern.
          </small>
        </Typography>
      </Paper>
    );
  }

  renderSequences() {
    const { sequences, delSequence, playSequence } = this.props;
    return sequences.map(sequence => (
      <TableRow key={sequence.id}>
        <TableCell>
          <b>{sequence.name}</b>
        </TableCell>
        <TableCell>
          {sequence.variable !== "" ?
          <Chip color="primary" label={sequence.variable}/>:
          <Chip color="secondary" label="Keine Variable gesetzt."/>}
        </TableCell>
        <TableCell>
          {sequence.steps.length}
        </TableCell>
        <TableCell>
          <Fab
            onClick={() => playSequence(sequence.id)}
            color="primary"
            className="noshadow"
            size="small"
            aria-label="editCommand">
            <Icon className="actionButtons">play_arrow</Icon>
          </Fab>
          {' '}
          <Fab
            onClick={() => delSequence(sequence.id)}
            color="secondary"
            className="noshadow"
            size="small"
            aria-label="deleteCommand">
            <Icon className="actionButtons">delete</Icon>
          </Fab>
        </TableCell>
      </TableRow>
    ));
  }

  render() {
    const { smartlife, updateSequences } = this.props;
    if(this.props.isActionSuccess){
      updateSequences(this.state.page);
    }
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.smartlife" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: smartlife.smartlife.devices ? '4px' : '4px 4px 0px 0px' }}>
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              Smartlife
              <span style={{ float: 'right' }}>
                <Button
                  style={{ marginRight: smartlife.smartlife.devices ? 16 : 0 }}
                  variant="contained"
                  color="primary"
                  onClick={() => updateSequences(this.state.page)}
                >
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
                {smartlife.smartlife.devices &&
                <Button onClick={() => this.setState({ openAddSequenceDialog: true, homeIdState: this.props.smartlife.smartlife.homes[0].homeId })} variant="contained" color="primary">
                  Sequenz hinzufügen
                </Button>}
              </span>
            </h4>
            <small>
              Verbinde deine Smartlife Geräte mit Twasi, um diese über den Chat oder über Events zu steuern.
            </small>
          </Typography>
        </Paper>
        {smartlife.smartlife.devices &&
        <Paper className="pageContainer" style={{ padding: '0px', marginTop: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Table>
            <TableHead>
              <TableRow className="TableRow">
                <TableCell>Sequenz</TableCell>
                <TableCell>Variable</TableCell>
                <TableCell>Anzahl der Szenen</TableCell>
                <TableCell style={{ width: '120px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="anim">
              {this.renderSequences()}
            </TableBody>
          </Table>
          {this.props.pagination.pages !== 1 && this.renderPagination()}
        </Paper>}
        {this.state.openAddSequenceDialog &&
          <AddSequenceDialog
            open
            homes={smartlife.smartlife.homes}
            page={this.state.page}
            onClose={this.handleCloseAddSequenceDialog}
          />
        }
        {!smartlife.smartlife.devices && this.renderDevicesEmpty()}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateSmartlifeAccount: () => dispatch(smartlifeOperations.loadSmartlifeAccount()),
  updateSequences: page => dispatch(smartlifeOperations.loadSequences(page)),
  delSequence: id => dispatch(smartlifeOperations.delSequence(id)),
  playSequence: id => dispatch(smartlifeOperations.playSequence(id)),
});

const mapStateToProps = state => ({
  sequences: smartlifeSelectors.getSequences(state),
  sequenceInput: smartlifeSelectors.getCreateSequence(state),
  pagination: smartlifeSelectors.getPagination(state),
  smartlife: smartlifeSelectors.getSmartlifeAccount(state),
  isLoaded: smartlifeSelectors.isLoaded(state),
  isLoading: smartlifeSelectors.isLoading(state),
  isActionSuccess: smartlifeSelectors.isActionSuccess(state),
  disabled: smartlifeSelectors.isDisabled(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Smartlife));
