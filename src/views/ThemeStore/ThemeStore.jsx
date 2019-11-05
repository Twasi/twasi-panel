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
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Logo from '../common/Logo/Logo';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FormattedMessage } from 'react-intl';

import { themesSelectors, themesOperations } from '../../state/themes';

class ThemeStore extends Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { updateThemes } = this.props;
    updateThemes(this.state.page);
  }

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  };

  renderPagination() {
    const { pagination, updateThemes } = this.props;
    return (
      <Paper style={{ textAlign: 'center' }} className="pageContainer">
      {_.times(pagination.pages, i =>
        <Fab
          key={i+1}
          onClick={() => {
            updateThemes(i+1)
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
    const { themes } = this.props;
    return themes.map(theme => (
      <Grid item xs={6}>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={theme.id}
          >
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Typography component={'div'}>
                  <h2 style={{ margin: "0px" }}>
                    {theme.name}
                    <span style={{ float: 'right' }}>
                      <Button variant="contained" color="primary">
                        Installieren
                      </Button>
                    </span>
                  </h2>
                  <h5 style={{ marginTop: "0px", marginBottom: "15px" }}>
                    <small>
                      <FormattedMessage id="plugins.by" />
                    </small> {theme.creator}
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
                      <Typography component={'span'} style={{ color: this.state.fontColor }}>
                        <h4 className="pageContainerTitle">
                          Content background
                        </h4>
                        <small>
                          This will be the overall background color of the site.
                        </small>
                      </Typography>
                      <div style={{ marginTop: '23px', marginLeft: 'auto', marginRight: 'auto', width: '150px' }}>
                        <Logo/>
                        <style type="text/css">
                          {
                          `.st0 { display:none; }
                          .st1{display:inline;fill:#1A2036;}
                          .st2{fill:#FFFFFF;}
                          .outline-textlogo{fill:${theme.theme.outlineTextlogo};}
                          .shadow-primary-textlogo{fill:${theme.theme.shadowPrimaryTextlogo};}
                          .shadow-secondary-textlogo{fill:${theme.theme.shadowSecondaryTextlogo};}
                          .main-textlogo{fill:${theme.theme.mainTextlogo};}
                          .st7{fill:#4C5BC2;}
                          .st8{fill:#C4CABC;}
                          .st9{fill:#FCFCFD;}
                          .st10{fill:#D27489;}
                          .st11{fill:#B96678;}
                          .st12{fill:#00AEAE;}`
                        }
                        </style>
                      </div>
                      <Paper className="pageContainer" style={{ marginTop: '25px', backgroundColor: theme.theme.panelBackgroundColor, borderRadius: theme.theme.panelRadius+"px" }}>
                        <Typography component={'span'} style={{ color: theme.theme.fontColor }}>
                          <h4 className="pageContainerTitle">
                            Example panel
                          </h4>
                          <small>
                            Panels look like this.
                          </small>
                        </Typography>
                        <Card style={{ marginTop: '25px', background: theme.theme.specialContentColor, borderRadius: theme.theme.specialContentRadius+"px" }} className="pluginCard">
                          <CardContent style={{ backgroundColor: theme.theme.specialContentColor }} className="pluginCardContent">
                            <Typography component={'span'} style={{ color: theme.theme.fontColor }}>
                              <h4 className="pageContainerTitle">
                                Special contents
                              </h4>
                              <small>
                                Special contents will be displayed with this background color.
                              </small>
                            </Typography>
                          </CardContent>
                        </Card>
                        <br />
                        <Table>
                          <TableHead>
                            <TableRow style={{ borderBottom: '3px solid '+theme.theme.primaryColor }}>
                              <TableCell>ID</TableCell>
                              <TableCell>Name</TableCell>
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
                              Primary color button
                            </Button>
                          </Grid>
                          <Grid item xs={6} style={{ textAlign: 'center' }}>
                            <Button variant="contained" color="secondary" style={{ background: theme.theme.secondaryColor, borderRadius: theme.theme.buttonRadius+"px", color: theme.theme.buttonFontColor }}>
                              Secondary color button
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
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.themes" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Typography component={'div'}>
            <h4 className="pageContainerTitle">
              Theme Store
              <span style={{ float: 'right' }}>
                <Button variant="contained" color="primary" onClick={() => {this.props.updateThemes(this.state.page)}}>
                  <Icon style={{ marginRight: '5px' }}>cached</Icon>
                  <FormattedMessage id="common.refresh" />
                </Button>
              </span>
            </h4>
            <small>
              Themes sind Skins für dein Twasi Panel, die das Aussehen deines Panel individuell anpassen. <br />
              Jeder kann Themes erstellen und veröffentlichen.
              Themes, die von uns als besonders gelungen gewertet wurden erhalten den "verified" Status.
            </small>
          </Typography>
        </Paper>
        <Paper className="pageContainer" style={{ margin: '0px', borderRadius: '0px 0px 4px 4px' }}>
          <Grid container spacing={4}>
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
});

const mapDispatchToProps = dispatch => ({
  updateThemes: page => dispatch(themesOperations.loadThemes(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeStore);
