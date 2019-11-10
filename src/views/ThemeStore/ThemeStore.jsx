import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Checkboard } from "react-color/lib/components/common";
import Table from '@material-ui/core/Table';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormattedMessage } from 'react-intl';
import './_style.css';
import theme_verified from '../common/resources/theme_verified.svg';

import { themesSelectors, themesOperations } from '../../state/themes';
import { authSelectors } from '../../state/auth';

class ThemeStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      approvedOnly: true,
      panel: ''
    };
  }

  componentDidMount() {
    const { updateThemes } = this.props;
    updateThemes(this.state.page, this.state.approvedOnly);
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  };

  handleApprovedOnly = value => {
    this.setState({ approvedOnly: value.target.checked });
    this.props.updateThemes(this.state.page, !this.state.approvedOnly)
  };

  renderPagination() {
    const { pagination, updateThemes } = this.props;
    return (
      <Paper style={{ textAlign: 'center' }} className="pageContainer">
      {_.times(pagination.pages, i =>
        <Fab
          key={i+1}
          onClick={() => {
            updateThemes(i+1, this.state.approvedOnly);
            console.log(i+1)
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

  renderThemes() {
    const handleStateChange = panel => () => this.setState({ panel });
    const { themes, installTheme, uninstallTheme, rank } = this.props;
    return themes.map(theme => (
      <Grid item xs={6}>
        <ExpansionPanel expanded={this.state.panel === theme.id}>
          <ExpansionPanelSummary
            id={theme.id}
            expandIcon={<ExpandMoreIcon onClick={this.state.panel !== theme.id ? handleStateChange(theme.id) : handleStateChange('')} />}
          >
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography component={'div'}>
                  <h2 style={{ margin: "0px" }}>
                    {theme.name}
                    {theme.approved &&
                    <img
                      className="verifiedBadge"
                      src={theme_verified}
                      alt="theme_verified"
                    />}
                    <span style={{ float: 'right' }}>
                      {rank === "TEAM" && !theme.approved &&
                        <Fab
                          size="small"
                          style={{ marginRight: '5px', height: '36px', width: '36px' }}
                          color="primary"
                          onClick={() => this.props.approve(theme.id)}
                        >
                          <Icon>
                            check
                          </Icon>
                        </Fab>
                      }
                      {theme.installed && (
                        <Button
                          variant="contained"
                          color="secondary"
                          disabled={theme.actionInProgress}
                          onClick={() => {
                            uninstallTheme(theme.id);
                          }}
                        >
                          <FormattedMessage id="plugins.uninstall" />
                          {theme.actionInProgress && (
                            <CircularProgress
                              color="primary"
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: -12,
                                marginLeft: -12
                              }}
                              size={24}
                            />
                          )}
                        </Button>
                      )}
                      {!theme.installed && (
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={theme.actionInProgress}
                          onClick={() => {
                            installTheme(theme.id);
                          }}
                        >
                          <FormattedMessage id="plugins.install" />
                          {theme.actionInProgress && (
                            <CircularProgress
                              color="primary"
                              style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: -12,
                                marginLeft: -12
                              }}
                              size={24}
                            />
                          )}
                        </Button>
                      )}
                    </span>
                  </h2>
                  <h5 style={{ marginTop: "0px", marginBottom: "15px" }}>
                    <small>
                      <FormattedMessage id="plugins.by" />
                    </small> {theme.creator} | {theme.installations} <small><FormattedMessage id="themestore.installed" /></small>
                  </h5>
                </Typography>
                <Badge children={''} style={{ backgroundColor: theme.theme.backgroundColor, width: '20%', height: '30px' }} />
                <Badge children={''} style={{ backgroundColor: theme.theme.panelBackgroundColor, width: '20%', height: '30px' }} />
                <Badge children={''} style={{ backgroundColor: theme.theme.specialContentColor, width: '20%', height: '30px' }} />
                <Badge children={''} style={{ backgroundColor: theme.theme.primaryColor, width: '20%', height: '30px' }} />
                <Badge children={''} style={{ backgroundColor: theme.theme.secondaryColor, width: '20%', height: '30px' }} />
              </Grid>
            </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ padding: '0px' }}>
            <Card className="pluginCard" style={{ borderRadius: '0px' }}>
              <CardContent className="pluginCardContent" style={{ borderRadius: '0px' }}>
                <div style={{ position: 'relative', height: 'auto', width: '100%', padding: '50px' }}>
                  <Checkboard size={ 8 } white="#fff" grey="#cccccc" />
                  <div style={{ position: 'inherit' }}>
                    <div style={{ background: theme.theme.backgroundColor, padding: '25px' }}>
                      <Typography component={'span'} style={{ color: theme.theme.fontColor }}>
                        <h4 className="pageContainerTitle">
                          <FormattedMessage id="themecreator.preview.content.title" />
                        </h4>
                        <small>
                          <FormattedMessage id="themecreator.preview.content.subtitle" />
                        </small>
                      </Typography>
                      <Paper className="pageContainer" style={{ marginTop: '25px', backgroundColor: theme.theme.panelBackgroundColor, borderRadius: theme.theme.panelRadius+"px" }}>
                        <Typography component={'span'} style={{ color: theme.theme.fontColor }}>
                          <h4 className="pageContainerTitle">
                            <FormattedMessage id="themecreator.preview.panels.title" />
                          </h4>
                          <small>
                            <FormattedMessage id="themecreator.preview.panels.subtitle" />
                          </small>
                        </Typography>
                        <Card style={{ marginTop: '25px', background: theme.theme.specialContentColor, borderRadius: theme.theme.specialContentRadius+"px" }} className="pluginCard">
                          <CardContent style={{ backgroundColor: theme.theme.specialContentColor }} className="pluginCardContent">
                            <Typography component={'span'} style={{ color: theme.theme.fontColor }}>
                              <h4 className="pageContainerTitle">
                                <FormattedMessage id="themecreator.preview.cards.title" />
                              </h4>
                              <small>
                                <FormattedMessage id="themecreator.preview.cards.subtitle" />
                              </small>
                            </Typography>
                          </CardContent>
                        </Card>
                        <br />
                        <Table>
                          <TableHead>
                            <TableRow style={{ borderBottom: '3px solid '+theme.theme.primaryColor }}>
                              <TableCell style={{ color: theme.theme.fontColor }}>ID</TableCell>
                              <TableCell style={{ color: theme.theme.fontColor }}>Name</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody className="anim">
                            <TableRow>
                              <TableCell style={{ color: theme.theme.fontColor }}>1</TableCell>
                              <TableCell style={{ color: theme.theme.fontColor }}>Foobar</TableCell>
                            </TableRow>
                            <TableRow style={{ backgroundColor: theme.theme.specialContentColor }}>
                              <TableCell style={{ color: theme.theme.fontColor }}>2</TableCell>
                              <TableCell style={{ color: theme.theme.fontColor }}>Lorem Ipsum</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <br />
                        <Grid container spacing={4}>
                          <Grid item xs={6} style={{ textAlign: 'center' }}>
                            <Button variant="contained" color="primary" style={{ background: theme.theme.primaryColor, borderRadius: theme.theme.buttonRadius+"px", color: theme.theme.buttonFontColor }}>
                              <FormattedMessage id="themecreator.preview.buttons.primary" />
                            </Button>
                          </Grid>
                          <Grid item xs={6} style={{ textAlign: 'center' }}>
                            <Button variant="contained" color="secondary" style={{ background: theme.theme.secondaryColor, borderRadius: theme.theme.buttonRadius+"px", color: theme.theme.buttonFontColor }}>
                              <FormattedMessage id="themecreator.preview.buttons.secondary" />
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    ));
  }

  render() {
    const { isActionSuccess } = this.props;
    if (isActionSuccess) {
      this.props.updateThemes(this.state.page, this.state.approvedOnly);
    }
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.themes" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer" style={{ borderRadius: '4px 4px 0px 0px' }}>
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="themestore.title" />
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" style={{ marginRight: '16px' }} onClick={event => this.handleClickBreadCrumb(event, '/themecreator')}>
                  <FormattedMessage id="themestore.new_theme" />
                </Button>
                <Button variant="contained" color="primary" onClick={() => {this.props.updateThemes(this.state.page, this.state.approvedOnly)}}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
              </span>
            </h4>
            <small>
              <FormattedMessage id="themestore.subtitle" />
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer" style={{ margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={this.handleApprovedOnly}
                    color="secondary"
                    checked={this.state.approvedOnly}
                  />
                }
                label={<small><FormattedMessage id="themestore.showonlyverified" /></small>}
              />
            </Grid>
            {this.renderThemes(this.state.page)}
          </Grid>
        </Paper>
        {this.props.pagination.pages !== 1 && this.renderPagination()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  themes: themesSelectors.getThemes(state),
  pagination: themesSelectors.getPagination(state),
  isLoaded: themesSelectors.isLoaded(state),
  isLoading: themesSelectors.isLoading(state),
  isActionSuccess: themesSelectors.isActionSuccess(state),
  rank: authSelectors.getUser(state).rank
});

const mapDispatchToProps = dispatch => ({
  updateThemes: (page, approved) => dispatch(themesOperations.loadThemes(page, approved)),
  installTheme: id => dispatch(themesOperations.installTheme(id)),
  uninstallTheme: id => dispatch(themesOperations.uninstallTheme(id)),
  approve: id => dispatch(themesOperations.approve(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeStore);
