import React, { Component } from 'react';
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkboard } from "react-color/lib/components/common";

import ColorPicker from './ColorPicker'

class ThemeCreator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: '#1a2035',
      borderRadius: 0,
      contentColor: '#202940',
      customHeader: null,
      font: null,
      fontColor: '#afb6c5',
      pillButtons: true,
      primaryColor: 'linear-gradient(135deg, rgb(63, 81, 181), rgb(84, 128, 255))',
      secondaryColor: 'linear-gradient(135deg,#de6464,#ff7b7b)',
      shadows: false,
      specialContentColor: '#232f4a'
    };
  }

  handleChangeBackgroundColor = (color) => {
    this.setState({ backgroundColor: color.hex });
  }
  handleChangeContentColor = (color) => {
    this.setState({ contentColor: color.hex });
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

  render() {
    return (
      <div className="pageContent">
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
          <Grid item xs={5}>
            <ExpansionPanel style={{ marginTop: '23px' }}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">
                    Content Background
                  </h4>
                </Typography>
                <br />
              </ExpansionPanelSummary>
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px', borderRadius: '0px 0px 16px 16px' }}>
                  <ColorPicker color={this.state.backgroundColor} onChange={this.handleChangeBackgroundColor}/>
                </CardContent>
              </Card>
            </ExpansionPanel>
            <ExpansionPanel style={{ marginTop: '23px' }}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">
                    Panel Background
                  </h4>
                </Typography>
                <br />
              </ExpansionPanelSummary>
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px', borderRadius: '0px 0px 16px 16px' }}>
                  <ColorPicker color={this.state.contentColor} onChange={this.handleChangeContentColor}/>
                </CardContent>
              </Card>
            </ExpansionPanel>
            <ExpansionPanel style={{ marginTop: '23px' }}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">
                    Special Content Background
                  </h4>
                </Typography>
                <br />
              </ExpansionPanelSummary>
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px', borderRadius: '0px 0px 16px 16px' }}>
                  <ColorPicker color={this.state.specialContentColor} onChange={this.handleChangeSpecialContentColor}/>
                </CardContent>
              </Card>
            </ExpansionPanel>
            <ExpansionPanel style={{ marginTop: '23px' }}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component={'span'}>
                  <h4 className="pageContainerTitle">
                    Primary and Secondary colors
                  </h4>
                </Typography>
                <br />
              </ExpansionPanelSummary>
              <Card className="pluginCard">
                <CardContent style={{ padding: '24px', borderRadius: '0px 0px 16px 16px' }}>
                  <ColorPicker color={this.state.primaryColor} onChange={this.handleChangePrimaryColor}/>
                  <ColorPicker style={{ float: 'left' }} color={this.state.secondaryColor} onChange={this.handleChangeSecondaryColor}/>
                </CardContent>
              </Card>
            </ExpansionPanel>
          </Grid>
          <Grid item xs={7}>
            <Paper className="pageContainer">
              <Typography component={'span'}>
                <h4 className="pageContainerTitle">
                  Preview
                </h4>
                <small>
                  This is how the theme will look like.
                </small>
              </Typography>
              <div style={{ position: 'relative', height: 'auto', width: '100%', padding: '25px', marginTop: '25px' }}>
                <Checkboard size={ 8 } white="#fff" grey="#cccccc" />
                <div style={{ position: 'inherit' }}>
                  <div style={{ backgroundColor: this.state.backgroundColor, padding: '25px' }}>
                    <Typography component={'span'}>
                      <h4 className="pageContainerTitle">
                        Content background
                      </h4>
                      <small>
                        This will be the overall background color of the site.
                      </small>
                    </Typography>
                    <Paper className="pageContainer" style={{ marginTop: '25px', backgroundColor: this.state.contentColor }}>
                      <Typography component={'span'}>
                        <h4 className="pageContainerTitle">
                          Example panel
                        </h4>
                        <small>
                          Panels look like this.
                        </small>
                      </Typography>
                      <Card style={{ marginTop: '25px', backgroundColor: this.state.specialContentColor }} className="pluginCard">
                        <CardContent style={{ backgroundColor: this.state.specialContentColor }} className="pluginCardContent">
                          <Typography component={'span'}>
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
                          <TableRow className="TableRow">
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="anim">
                          <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Foobar</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>Lorem Ipsum</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <br />
                      <Grid container spacing={4}>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="primary" style={{ background: this.state.primaryColor }}>
                            Primary color button
                          </Button>
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: 'center' }}>
                          <Button variant="contained" color="secondary" style={{ background: this.state.secondaryColor }}>
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

export default ThemeCreator;
