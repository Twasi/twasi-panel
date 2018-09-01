import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import Divider from 'material-ui/Divider';
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

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";

am4core.useTheme(am4themes_kelly);

class Overview extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 20; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : 5) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.strokeWidth = 3;
    series.tensionX = 0.8;
    series.tensionY = 1;
    series.fillOpacity = 0.3;

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;


    // Create chart instance
    let chartpie = am4core.create("chartdivpie", am4charts.PieChart);

    // Add data
    chartpie.data = [{
      "country": "Lithuania",
      "litres": 501.9
    }, {
      "country": "Czech Republic",
      "litres": 301.9
    }, {
      "country": "Ireland",
      "litres": 201.1
    }, {
      "country": "Germany",
      "litres": 165.8
    }, {
      "country": "Australia",
      "litres": 139.9
    }, {
      "country": "Austria",
      "litres": 128.3
    }, {
      "country": "UK",
      "litres": 99
    }, {
      "country": "Belgium",
      "litres": 60
    }, {
      "country": "The Netherlands",
      "litres": 50
    }];

    // Add and configure Series
    let pieSeries = chartpie.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

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
                  <small>
                    <FormattedMessage id="overview.follower" />
                  </small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>
                    <FormattedMessage id="overview.viewer" />
                  </small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>
                    <FormattedMessage id="overview.messages" />
                  </small>
                </div>
              </div>
            </Col>
            <Col sm={3}>
              <div className="translucentBox">
                <div className="media-body">
                  <h2 style={{ margin: '7px 0px 0px' }}>
                    <span>1337</span>
                  </h2>
                  <small>
                    <FormattedMessage id="overview.streams" />
                  </small>
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
              label={<FormattedMessage id="overview.laststream" />}
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
                      <FormattedMessage id="overview.table_id" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      <FormattedMessage id="overview.table_duration" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      <FormattedMessage id="overview.table_follower" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      <FormattedMessage id="overview.table_views" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      <FormattedMessage id="overview.table_viewermax" />
                    </TableHeaderColumn>
                    <TableHeaderColumn className="overviewTableColumn">
                      <FormattedMessage id="overview.table_average" />
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  className="overviewTableBody"
                  displayRowCheckbox={false}
                >
                  <TableRow>
                    <TableRowColumn className="overviewTableColumnBody">
                      1.337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1.337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1.337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1.337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1.337
                    </TableRowColumn>
                    <TableRowColumn className="overviewTableColumnBody">
                      1.337
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </Tab>
          </Tabs>
        </Paper>
        <Row>
          <Col sm={8}>
            <Paper className="pageContainer">
              <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
            </Paper>
          </Col>
          <Col sm={4}>
            <Paper className="pageContainer">
              <div id="chartdivpie" style={{ width: "100%", height: "300px" }}></div>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

Overview.propTypes = {};

export default withRouter(connect()(Overview));
