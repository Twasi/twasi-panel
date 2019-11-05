import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
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
import TextField from '@material-ui/core/TextField';
import { Checkboard } from "react-color/lib/components/common";

import ColorPicker from './ColorPicker'

import { themesSelectors, themesOperations } from '../../state/themes';

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

      outlineTextlogo: '#1A2036', // Outline color of logo
      shadowPrimaryTextlogo: '#303F8B', // Primary (Bigger) shadow color of logo
      shadowSecondaryTextlogo: '#3C4EAD', // Secondary (smaller) shadow color of logo (should be darker than primary shadow)
      mainTextlogo: '#4352AF', // Main color of logo
      themeName: ''
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

  handleChangeOutlineTextlogo = (color) => {
    this.setState({ outlineTextlogo: color.hex });
  }
  handleChangeShadowPrimaryTextlogo = (color) => {
    this.setState({ shadowPrimaryTextlogo: color.hex });
  }
  handleChangeShadowSecondaryTextlogo = (color) => {
    this.setState({ shadowSecondaryTextlogo: color.hex });
  }
  handleChangeMainTextlogo = (color) => {
    this.setState({ mainTextlogo: color.hex });
  }

  handleThemeNameChange = (event) => {
    this.setState({
      themeName: event.target.value
    });
  };

  handleClickBreadCrumb = (event, value) => {
    const { history } = this.props;
    history.push(value);
    this.setState({});
  }

  render() {
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
              Theme Creator
            </h4>
            <small>
              Erstelle, verwalte und veröffentliche deine eigenen Themes für Twasi.
            </small>
          </Typography>
        </Paper>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Neues Theme
                </h4>
                <small>
                  Bevor es los geht musst du einen Namen für dein neues Theme finden.
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <TextField
                    label="Name deines Themes"
                    fullWidth
                    value={this.state.themeName}
                    onChange={this.handleThemeNameChange}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </CardContent>
              </Card>
            </Paper>
            {this.state.themeName.length > 4 &&
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Content
                </h4>
                <small>
                  Die Content Area bietet die größte Fläche, außerdem sorgt sie für einen Guten Kontrast zu den einzelnen Elementen.
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.backgroundColor} onChange={this.handleChangeBackgroundColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Font color" color={this.state.fontColor} onChange={this.handleChangeFontColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Primary color" color={this.state.primaryColor} onChange={this.handleChangePrimaryColor}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Secondary color" color={this.state.secondaryColor} onChange={this.handleChangeSecondaryColor}/>
                </CardContent>
              </Card>
            </Paper>}
            {this.state.themeName.length > 4 &&
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Logo
                </h4>
                <small>
                  Das Logo sollte dem Theme angepasst werden, es ändert die Farben, wenn du das Theme wechselst.
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Main Logo Color" color={this.state.mainTextlogo} onChange={this.handleChangeMainTextlogo}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Logo Border" color={this.state.outlineTextlogo} onChange={this.handleChangeOutlineTextlogo}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Primary Logo Shadow" color={this.state.shadowPrimaryTextlogo} onChange={this.handleChangeShadowPrimaryTextlogo}/>
                  <Divider className="marginDivider" />
                  <ColorPicker label="Secondary Logo Shadow" color={this.state.shadowSecondaryTextlogo} onChange={this.handleChangeShadowSecondaryTextlogo}/>
                </CardContent>
              </Card>
            </Paper>}
            {this.state.themeName.length > 4 &&
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Panels
                </h4>
                <small>
                  Die Panels sind das am häufigsten verwendete Element auf Twasi.
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.panelBackgroundColor} onChange={this.handleChangePanelBackgroundColor}/>
                  <Divider className="marginDivider" />
                  <Typography>
                    <small>Border Radius</small>
                  </Typography>
                  <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    value={this.state.panelRadius}
                    onChange={this.handlePanelRadius}
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
                  Special Contents
                </h4>
                <small>
                  Spezielle Inhalte sind besonders hervorgehoben.
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Background color" color={this.state.specialContentColor} onChange={this.handleChangeSpecialContentColor}/>
                  <Divider className="marginDivider" />
                  <Typography>
                    <small>Border Radius</small>
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
                  Buttons
                </h4>
                <small>
                  Buttons werden dzu genutzt Inhalte zu aktualisieren.
                </small>
              </Typography>
              <br />
              <Card style={{ marginTop: '15px' }} className="pluginCard">
                <CardContent style={{ padding: '24px' }}>
                  <ColorPicker label="Font color" color={this.state.buttonFontColor} onChange={this.handleChangeButtonFontColor}/>
                  <Divider className="marginDivider" />
                  <Typography>
                    <small>Border Radius</small>
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
                  Preview
                  <span style={{ float: 'right' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: '16px' }}
                      onClick={() => {this.props.addTheme(this.state.themeName, themedata)}}
                      disabled={this.state.themeName.length < 5}
                    >
                      <Icon style={{ marginRight: '5px' }}>save</Icon>
                      Theme Speichern
                    </Button>
                  </span>
                </h4>
                <small>
                  This is how the theme will look like.
                </small>
              </Typography>
              <div style={{ position: 'relative', height: 'auto', width: '100%', padding: '50px', marginTop: '25px' }}>
                <Checkboard size={ 8 } white="#fff" grey="#cccccc" />
                <div style={{ position: 'inherit' }}>
                  <div style={{ background: this.state.backgroundColor, padding: '25px' }}>
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
                        .outline-textlogo{fill:${this.state.outlineTextlogo};}
                        .shadow-primary-textlogo{fill:${this.state.shadowPrimaryTextlogo};}
                        .shadow-secondary-textlogo{fill:${this.state.shadowSecondaryTextlogo};}
                        .main-textlogo{fill:${this.state.mainTextlogo};}
                        .st7{fill:#4C5BC2;}
                        .st8{fill:#C4CABC;}
                        .st9{fill:#FCFCFD;}
                        .st10{fill:#D27489;}
                        .st11{fill:#B96678;}
                        .st12{fill:#00AEAE;}`
                      }
                      </style>
                    </div>
                    <Paper className="pageContainer" style={{ marginTop: '25px', backgroundColor: this.state.panelBackgroundColor, borderRadius: this.state.panelRadius+"px" }}>
                      <Typography component={'span'} style={{ color: this.state.fontColor }}>
                        <h4 className="pageContainerTitle">
                          Example panel
                        </h4>
                        <small>
                          Panels look like this.
                        </small>
                      </Typography>
                      <Card style={{ marginTop: '25px', background: this.state.specialContentColor, borderRadius: this.state.specialContentRadius+"px" }} className="pluginCard">
                        <CardContent style={{ backgroundColor: this.state.specialContentColor }} className="pluginCardContent">
                          <Typography component={'span'} style={{ color: this.state.fontColor }}>
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
                          <TableRow style={{ borderBottom: '3px solid '+this.state.primaryColor }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
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
                            Primary color button
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" style={{ background: this.state.secondaryColor, borderRadius: this.state.buttonRadius+"px", color: this.state.buttonFontColor }}>
                            Secondary color button
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
  isLoaded: themesSelectors.isLoaded(state),
  isLoading: themesSelectors.isLoading(state),
  isActionSuccess: themesSelectors.isActionSuccess(state),
});

const mapDispatchToProps = dispatch => ({
  addTheme: (name, themedata) => dispatch(themesOperations.addTheme(name, themedata)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeCreator);
