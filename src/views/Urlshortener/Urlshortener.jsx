import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'react-grid-system';
import Divider from 'material-ui/Divider';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { Card, CardText } from 'material-ui/Card';
import './_style.css';

class Urlshortener extends Component {
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
                  <RaisedButton
                    backgroundColor="#00aeae"
                    labelColor="#ffffff"
                    label="Speichern"
                  />
                </span>
              </h4>
              <small>Kürze deine URL's um sie mit jedem zu teilen.</small>
              <Divider className="marginDivider" />
              <Card className="pluginCard">
                <CardText>
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
                            zIndex: '99'
                          }}
                          position="start"
                        >
                          https://twa.si/c/
                        </InputAdornment>
                      )
                    }}
                  />
                </CardText>
              </Card>
              <br />
              <Card className="pluginCard">
                <CardText>
                  <h4 className="pageContainerTitle">Vorschau</h4>
                  <samp style={{ color: '#00aeae' }}>
                    <b>https://twa.si/c/{this.state.inputValue}</b>
                  </samp>
                </CardText>
              </Card>
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
                    backgroundColor: '#e0e0e0',
                    borderRadius: '50px'
                  }}
                >
                  arrow_downward
                </Icon>
              </span>
              <Card className="pluginCard">
                <CardText>
                  <TextField
                    helperText="Auf welche Domain soll dein Shortlink weiterleiten?"
                    fullWidth
                    id="shortlink-redirection"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment
                          style={{
                            backgroundColor: '#e0e0e0',
                            padding: '0px 15px 0px 15px',
                            zIndex: '99'
                          }}
                          position="start"
                        >
                          https://
                        </InputAdornment>
                      )
                    }}
                  />
                </CardText>
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
            <Table>
              <TableHeader
                adjustForCheckbox={false}
                displaySelectAll={false}
                selectable={false}
              >
                <TableRow className="TableRow">
                  <TableHeaderColumn>Shortlink</TableHeaderColumn>
                  <TableHeaderColumn>Weiterleitung</TableHeaderColumn>
                  <TableHeaderColumn />
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                <TableRow>
                  <TableRowColumn>
                    <a style={{ color: '#00aeae' }} href="#">
                      https://twa.si/c/test
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    <a style={{ color: '#00aeae' }} href="#">
                      https://blechkelle.com
                    </a>
                  </TableRowColumn>
                  <TableRowColumn>
                    <a style={{ color: '#e53935' }} href="#">
                      Löschen
                    </a>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }
}

Urlshortener.propTypes = {};

export default withRouter(connect()(Urlshortener));
