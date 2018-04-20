import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { Container, Row, Col } from 'react-grid-system';

import './_style.css';

class Overview extends Component {
  /* componentWillMount() {
    const { verifyData } = this.props;
    verifyData();
  } */

  render() {
    return (
      <div className="pageContent">
        <Container className="overviewHead">
          <Row>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>Follower</small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>Zuschauer getrackt</small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>Chatnachrichten getrackt</small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>Streams getrackt</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Paper style={{ paddingTop: '5px' }} className="pageContainer">
          <Tabs
            tabItemContainerStyle={{
              backgroundColor: '#fff'
            }}
            inkBarStyle={{ backgroundColor: '#00aeae' }}
            contentContainerStyle={{ paddingTop: '23px' }}
          >
            <Tab
              label="Letzter Stream"
              buttonStyle={{
                color: '#000',
                float: 'left',
                paddingLeft: '23px',
                fontSize: '13px'
              }}
            >
              <Table>
                <TableHeader
                  className="overviewTableHead"
                  adjustForCheckbox={false}
                  displaySelectAll={false}
                  selectable={false}
                >
                  <TableRow className="overviewTableRow">
                    <TableHeaderColumn className="overviewTableColumn">
                      Stream ID
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      Dauer
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      Follower +
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      Aufrufe +
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      Zuschauer Maximum
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      Zuschauer Durchschnitt
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  className="overviewTableBody"
                  displayRowCheckbox={false}
                >
                  <TableRow>
                    <TableRowColumn className="overviewTableColumnBody">
                      1'337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1'337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1'337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1'337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1'337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1'337
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
              {/*
              <div
                title="Bot status"
                extra={
                  <button onClick={() => history.push('/status')}>
                    <FormattedMessage
                      id="status.manage"
                      defaultMessage="Manage"
                    />
                  </button>
                }
                style={{ width: 300 }}
              >
                <div type="flex" justify="center">
                  <div span={12}>Twitchbot</div>
                  <div span={12}>
                    {status.isRunning && running}
                    {!status.isRunning && stopped}
                  </div>
                </div>
              </div>
              */}
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}

Overview.propTypes = {};

export default withRouter(connect()(Overview));
