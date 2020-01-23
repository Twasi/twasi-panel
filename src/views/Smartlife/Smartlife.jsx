import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AddSequenceDialog from './AddSequenceDialog';

import './_style.css';

import smartlife_logo from '../common/resources/smartlife.png';

import { smartlifeSelectors, smartlifeOperations } from '../../state/integrations/smartlife';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      <Box p={0}>{children}</Box>
    </Typography>
  );
}

class Smartlife extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      tabContainer: "",
      openAddSequenceDialog: false,
      homes: 0
    };
  }
  componentDidMount() {
    const { updateSmartlifeAccount } = this.props;
    updateSmartlifeAccount();
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  handleCloseAddSequenceDialog = () => {
    this.setState({ openAddSequenceDialog: false });
  };

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

  render() {
    const { smartlife, disabled, isLoaded, isLoading, isActionSuccess } = this.props;
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
                <TableCell>ID</TableCell>
                <TableCell>Sequenz</TableCell>
                <TableCell>Verwendete Szenen</TableCell>
                <TableCell style={{ width: '120px' }}><FormattedMessage id="common.actions" /></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="anim">

            </TableBody>
          </Table>
        </Paper>}
        {this.state.openAddSequenceDialog &&
          <AddSequenceDialog
            open
            homes={smartlife.smartlife.homes}
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
});

const mapStateToProps = state => ({
  smartlife: smartlifeSelectors.getSmartlifeAccount(state),
  isLoaded: smartlifeSelectors.isLoaded(state),
  isLoading: smartlifeSelectors.isLoading(state),
  isActionSuccess: smartlifeSelectors.isActionSuccess(state),
  disabled: smartlifeSelectors.isDisabled(state)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Smartlife));
