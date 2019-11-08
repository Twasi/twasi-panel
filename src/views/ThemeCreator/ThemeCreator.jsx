import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Divider from '@material-ui/core/Divider';
import Slider from '@material-ui/core/Slider';
import Icon from '@material-ui/core/Icon';
import Logo from '../common/Logo/Logo';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { Checkboard } from "react-color/lib/components/common";

import ColorPicker from './ColorPicker'

import { themesSelectors, themesOperations } from '../../state/themes';

function shadeColor(color, percent) {
  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;
  var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));
  return "#"+RR+GG+BB;
}

class ThemeCreator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#1a2035', // Background color of the whole page
      buttonRadius: 100, // Radius of buttons
      panelRadius: 4, // Radius of panel elements
      specialContentRadius: 15, // Radius of cards (special content)
      panelBackgroundColor: '#202940', // Backgroundcolor of panel elements
      fontColor: '#afb6c5', // Fontcolor
      buttonFontColor: '#ffffff', // Button font color
      primaryColor: '#3f51b5', // Primary color
      secondaryColor: '#de6464', // Secondary color
      specialContentColor: '#232f4a', // Background color of cards and special contents
      darkmode: true,

      outlineTextlogo: '#1A2036', // Outline color of logo
      shadowPrimaryTextlogo: '#303F8B', // Primary (Bigger) shadow color of logo
      shadowSecondaryTextlogo: '#3C4EAD', // Secondary (smaller) shadow color of logo (should be darker than primary shadow)
      mainTextlogo: '#4352AF', // Main color of logo
      themeName: '',
    };
  }

  handleButtonRadius = (event, buttonRadius) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ buttonRadius });
  };
  handlePanelRadius = (event, panelRadius) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ panelRadius });
  };
  handleSpecialContentRadius = (event, specialContentRadius) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ specialContentRadius });
  };

  handleChangeBackgroundColor = (color) => {
    this.setState({ backgroundColor: color.hex });
  }
  handleChangePanelBackgroundColor = (color) => {
    this.setState({ panelBackgroundColor: color.hex });
  }
  handleChangeSpecialContentColor = (color) => {
    this.setState({ specialContentColor: color.hex });
  }
  handleChangePrimaryColor = (color) => {
    this.setState({ primaryColor: color.hex });
  }
  handleChangeSecondaryColor = (color) => {
    this.setState({ secondaryColor: color.hex });
  }
  handleChangeFontColor = (color) => {
    this.setState({ fontColor: color.hex });
  }
  handleChangeButtonFontColor = (color) => {
    this.setState({ buttonFontColor: color.hex });
  }

  handleChangeMainTextlogo = (color) => {
    this.setState({
      mainTextlogo: color.hex,
      shadowPrimaryTextlogo: shadeColor(color.hex, -30),
      shadowSecondaryTextlogo: shadeColor(color.hex, -60),
      outlineTextlogo: shadeColor(color.hex, -90)
    });
  }

  handleThemeNameChange = (event) => {
    if(event.target.value.length < 20) {
      this.setState({
        themeName: event.target.value
      });
    }
  };

  handleDarkMode = value => {
    this.setState({ darkmode: value.target.checked });
  };

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  render() {
    const action = key => (
      <div>
        <Button variant='contained' onClick={() => { this.props.closeSnackbar(key) }}>
          X
        </Button>
      </div>
    );
    if(this.props.isActionSuccess) {
      this.props.enqueueSnackbar(this.props.getThemeResponse.status === 'OK' ? <FormattedMessage id="notification.success" /> : <FormattedMessage id={this.props.getThemeResponse.translationKey} />, {
        variant: this.props.getThemeResponse.status === 'OK' ? 'success' : 'error',
        autoHideDuration: 3000,
        action
      });
    }
    var themedata = {
      backgroundColor: this.state.backgroundColor,
      buttonRadius: this.state.buttonRadius,
      panelRadius: this.state.panelRadius,
      specialContentRadius: this.state.specialContentRadius,
      panelBackgroundColor: this.state.panelBackgroundColor,
      fontColor: this.state.fontColor,
      buttonFontColor: this.state.buttonFontColor,
      primaryColor: this.state.primaryColor,
      secondaryColor: this.state.secondaryColor,
      specialContentColor: this.state.specialContentColor,
      //darkmode: this.state.darkmode,

      outlineTextLogo: this.state.outlineTextlogo,
      shadowPrimaryTextLogo: this.state.shadowPrimaryTextlogo,
      shadowSecondaryTextLogo: this.state.shadowSecondaryTextlogo,
      mainTextLogo: this.state.mainTextlogo
    }
    return (
      <div className="pageContent">
        <Breadcrumbs arial-label="Breadcrumb">
          <Link color="inherit" onClick={event => this.handleClickBreadCrumb(event, '/')}>
            <FormattedMessage id="sidebar.overview" />
          </Link>
          <Typography color="textPrimary"><FormattedMessage id="sidebar.themecreator" /></Typography>
        </Breadcrumbs>
        <Paper className="pageContainer">
          <Typography component={'span'}>
            <h4 className="pageContainerTitle">
              <FormattedMessage id="themecreator.title" />
              <span style={{ float: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={event => this.handleClickBreadCrumb(event, '/themes')}
                >
                  <FormattedMessage id="themecreator.themestore_button" />
                </Button>
              </span>
            </h4>
            <small>
              <FormattedMessage id="themecreator.subtitle" />
            </small>
          </Typography>
        </Paper>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="themecreator.new.title" />
                </h4>
                <small>
                  <FormattedMessage id="themecreator.new.subtitle" />
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <TextField
                    label={<FormattedMessage id="themecreator.new.name" />}
                    fullWidth
                    value={this.state.themeName}
                    onChange={this.handleThemeNameChange}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleDarkMode}
                        color="primary"
                        checked={this.state.darkmode}
                      />
                    }
                    label={<small><FormattedMessage id="themecreator.darkmode_toggle" /></small>}
                  />
                </CardContent>
              </Card>
            </Paper>
            {this.state.themeName.length > 4 &&
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="themecreator.new.content.title" />
                </h4>
                <small>
                  <FormattedMessage id="themecreator.new.content.subtitle" />
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label={<FormattedMessage id="themecreator.common.backgroundcolor" />} color={this.state.backgroundColor} onChange={this.handleChangeBackgroundColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label={<FormattedMessage id="themecreator.common.fontcolor" />} color={this.state.fontColor} onChange={this.handleChangeFontColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label={<FormattedMessage id="themecreator.common.primarycolor" />} color={this.state.primaryColor} onChange={this.handleChangePrimaryColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label={<FormattedMessage id="themecreator.common.secondarycolor" />} color={this.state.secondaryColor} onChange={this.handleChangeSecondaryColor}/>
                </CardContent>
              </Card>
            </Paper>}
            {this.state.themeName.length > 4 &&
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="themecreator.new.logo.title" />
                </h4>
                <small>
                  <FormattedMessage id="themecreator.new.logo.subtitle" />
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label={<FormattedMessage id="themecreator.new.logo.maincolor" />} color={this.state.mainTextlogo} onChange={this.handleChangeMainTextlogo}/>
                </CardContent>
              </Card>
            </Paper>}
            {this.state.themeName.length > 4 &&
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="themecreator.new.panels.title" />
                </h4>
                <small>
                  <FormattedMessage id="themecreator.new.panels.subtitle" />
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label={<FormattedMessage id="themecreator.common.backgroundcolor" />} color={this.state.panelBackgroundColor} onChange={this.handleChangePanelBackgroundColor}/>
                </CardContent>
              </Card>
            </Paper>}
            {this.state.themeName.length > 4 &&
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="themecreator.new.cards.title" />
                </h4>
                <small>
                  <FormattedMessage id="themecreator.new.cards.subtitle" />
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label={<FormattedMessage id="themecreator.common.backgroundcolor" />} color={this.state.specialContentColor} onChange={this.handleChangeSpecialContentColor}/>
                  <Divider className="marginDivider" />
                  <Typography>
                    <small><FormattedMessage id="themecreator.common.borderradius" /></small>
                  </Typography>
                  <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    value={this.state.specialContentRadius}
                    onChange={this.handleSpecialContentRadius}
                    step={1}
                    min={0}
                    max={50}
                  />
                </CardContent>
              </Card>
            </Paper>}
            {this.state.themeName.length > 4 &&
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="themecreator.new.buttons.title" />
                </h4>
                <small>
                  <FormattedMessage id="themecreator.new.buttons.subtitle" />
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label={<FormattedMessage id="themecreator.common.fontcolor" />} color={this.state.buttonFontColor} onChange={this.handleChangeButtonFontColor}/>
                  <Divider className="marginDivider" />
                  <Typography>
                    <small><FormattedMessage id="themecreator.common.borderradius" /></small>
                  </Typography>
                  <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    value={this.state.buttonRadius}
                    onChange={this.handleButtonRadius}
                    step={1}
                    min={0}
                    max={50}
                  />
                </CardContent>
              </Card>
            </Paper>}
          </Grid>
          <Grid item xs={8}>
            <Paper className="pageContainer" style={{ position: 'sticky', top: '23px' }}>
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  <FormattedMessage id="themecreator.preview.title" />
                  <span style={{ float: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: '16px' }}
                      onClick={() => {
                          this.props.addTheme(this.state.themeName, themedata);
                          this.setState({
                            backgroundColor: '#1a2035', // Background color of the whole page
                            buttonRadius: 100, // Radius of buttons
                            panelRadius: 4, // Radius of panel elements
                            specialContentRadius: 15, // Radius of cards (special content)
                            panelBackgroundColor: '#202940', // Backgroundcolor of panel elements
                            fontColor: '#afb6c5', // Fontcolor
                            buttonFontColor: '#ffffff', // Button font color
                            primaryColor: '#3f51b5', // Primary color
                            secondaryColor: '#de6464', // Secondary color
                            specialContentColor: '#232f4a', // Background color of cards and special contents
                            darkmode: true,

                            outlineTextlogo: '#1A2036', // Outline color of logo
                            shadowPrimaryTextlogo: '#303F8B', // Primary (Bigger) shadow color of logo
                            shadowSecondaryTextlogo: '#3C4EAD', // Secondary (smaller) shadow color of logo (should be darker than primary shadow)
                            mainTextlogo: '#4352AF', // Main color of logo
                            themeName: '',
                          });
                      }}
                      disabled={this.state.themeName.length < 5}
                    >
                      <Icon style={{ marginRight: '5px' }}>save</Icon>
                      <FormattedMessage id="themecreator.preview.savetheme" />
                    </Button>
                  </span>
                </h4>
                <small>
                  <FormattedMessage id="themecreator.preview.subtitle" />
                </small>
              </Typography>
              <div style={{ position: 'relative', height: 'auto', width: '100%', padding: '50px', marginTop: '25px' }}>
                <Checkboard size={ 8 } white="#fff" grey="#cccccc" />
                <div style={{ position: 'inherit' }}>
                  <div style={{ background: this.state.backgroundColor, padding: '25px' }}>
                    <Typography component={'span'} style={{ color: this.state.fontColor }}>
                      <h4 className="pageContainerTitle">
                        <FormattedMessage id="themecreator.preview.content.title" />
                      </h4>
                      <small>
                        <FormattedMessage id="themecreator.preview.content.subtitle" />
                      </small>
                    </Typography>
                    <div style={{ marginTop: '23px', marginLeft: 'auto', marginRight: 'auto', width: '150px' }}>
                      <Logo color={this.state.mainTextlogo}/>
                    </div>
                    <Paper className="pageContainer" style={{ marginTop: '25px', backgroundColor: this.state.panelBackgroundColor, borderRadius: this.state.panelRadius+"px" }}>
                      <Typography component={'span'} style={{ color: this.state.fontColor }}>
                        <h4 className="pageContainerTitle">
                          <FormattedMessage id="themecreator.preview.panels.title" />
                        </h4>
                        <small>
                          <FormattedMessage id="themecreator.preview.panels.subtitle" />
                        </small>
                      </Typography>
                      <Card style={{ marginTop: '25px', background: this.state.specialContentColor, borderRadius: this.state.specialContentRadius+"px" }} className="pluginCard">
                        <CardContent style={{ backgroundColor: this.state.specialContentColor }} className="pluginCardContent">
                          <Typography component={'span'} style={{ color: this.state.fontColor }}>
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
                          <TableRow style={{ borderBottom: '3px solid '+this.state.primaryColor }}>
                            <TableCell style={{ color: this.state.fontColor }}>ID</TableCell>
                            <TableCell style={{ color: this.state.fontColor }}>Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="anim">
                          <TableRow>
                            <TableCell style={{ color: this.state.fontColor }}>1</TableCell>
                            <TableCell style={{ color: this.state.fontColor }}>Foobar</TableCell>
                          </TableRow>
                          <TableRow style={{ backgroundColor: this.state.specialContentColor }}>
                            <TableCell style={{ color: this.state.fontColor }}>2</TableCell>
                            <TableCell style={{ color: this.state.fontColor }}>Lorem Ipsum</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <br />
                      <Grid container spacing={4}>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="primary" style={{ background: this.state.primaryColor, borderRadius: this.state.buttonRadius+"px", color: this.state.buttonFontColor }}>
                            <FormattedMessage id="themecreator.preview.buttons.primary" />
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" style={{ background: this.state.secondaryColor, borderRadius: this.state.buttonRadius+"px", color: this.state.buttonFontColor }}>
                            <FormattedMessage id="themecreator.preview.buttons.secondary" />
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getThemeResponse: themesSelectors.getThemeResponse(state),
  isLoaded: themesSelectors.isLoaded(state),
  isLoading: themesSelectors.isLoading(state),
  isActionSuccess: themesSelectors.isActionSuccess(state),
});

const mapDispatchToProps = dispatch => ({
  addTheme: (name, themedata) => dispatch(themesOperations.addTheme(name, themedata)),
});

export default withSnackbar(connect(mapStateToProps, mapDispatchToProps)(ThemeCreator));
