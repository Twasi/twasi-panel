import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import './_style.css';

class Urlshortener extends Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  */

  render() {
    return (
      <div className="pageContent">
        <h2 className="pageTitle">
          <FormattedMessage id="sidebar.urlshortener" />
        </h2>
        <Row>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">
                URL Kürzen
                <span style={{ float: 'right' }}>
                  <Button
                    variant="contained"
                    color="primary"
                  >
                    Speichern
                  </Button>
                </span>
              </h4>
              <small>Kürze deine URL's um sie mit jedem zu teilen.</small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardContent className="pluginCardContent">
                  <TextField
                    helperText="Freilassen für eine zufällige URL."
                    fullWidth
                    id="shortlink"
                    onChange={evt => this.updateInputValue(evt)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          style={{
                            backgroundColor: '#e0e0e0',
                            padding: '0px 15px 0px 15px',
                            zIndex: '1'
                          }}
                          position="start"
                        >
                          https://twa.si/c/
                        </InputAdornment>
                      )
                    }}
                  />
                </CardContent>
              </Card>
              {/*
              <br />
              <Card className="pluginCard">
                <CardText>
                  <h4 className="pageContainerTitle">Vorschau</h4>
                  <samp style={{ color: '#00aeae' }}>
                    <b>https://twa.si/c/{this.state.inputValue}</b>
                  </samp>
                </CardText>
              </Card>
              */}
              <span
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  width: '100%',
                  padding: '15px 0px 15px 0px'
                }}
              >
                <Icon
                  style={{
                    fontSize: 36,
                    color: '#5e5e5e'
                  }}
                >
                  arrow_downward
                </Icon>
              </span>
              <Card className="pluginCard">
                <CardContent className="pluginCardContent">
                  <TextField
                    helperText="Auf welche Domain soll dein Shortlink leiten?"
                    fullWidth
                    id="shortlink-redirection"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          style={{
                            backgroundColor: '#e0e0e0',
                            padding: '0px 15px 0px 15px',
                            zIndex: '1'
                          }}
                          position="start"
                        >
                          https://
                        </InputAdornment>
                      )
                    }}
                  />
                </CardContent>
              </Card>
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer">
              <h4 className="pageContainerTitle">Deine URL's</h4>
              <small>
                Hier findest du eine Liste deiner bereits gekürzten URL's
              </small>
            </Paper>
            <Paper className="pageContainer" style={{ padding: '0px', margin: '0px' }}>
              <Table>
                <TableHead
                  adjustForCheckbox={false}
                  displaySelectAll={false}
                  selectable={false}
                >
                  <TableRow className="TableRow">
                    <TableCell>Shortlink</TableCell>
                    <TableCell>Weiterleitung</TableCell>
                    <TableCell/>
                  </TableRow>
                </TableHead>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableCell>
                      <a style={{ color: '#00aeae' }} href="#">
                        https://twa.si/c/test
                      </a>
                    </TableCell>
                    <TableCell>
                      <a style={{ color: '#00aeae' }} href="#">
                        https://blechkelle.com
                      </a>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Bearbeiten" placement="top">
                        <Button
                          variant="fab"
                          className="tealbg noshadow"
                          mini
                          aria-label="editCommand"
                        >
                          <Icon style={{ color: '#ffffff' }}>edit</Icon>
                        </Button>
                      </Tooltip>{' '}
                      <Tooltip title="Löschen" placement="top">
                        <Button
                          variant="fab"
                          className="redbg noshadow"
                          mini
                          aria-label="deleteCommand"
                        >
                          <Icon style={{ color: '#ffffff' }}>delete</Icon>
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

Urlshortener.propTypes = {};

export default withRouter(connect()(Urlshortener));
