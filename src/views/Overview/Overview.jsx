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
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

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

    let circleBullet = series.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.stroke = am4core.color("#fff");
    circleBullet.circle.strokeWidth = 2;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.text = "{value}";
    labelBullet.label.dy = -20;

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let watermark = new am4core.Label();
    watermark.text = "Twasi.net © 2018";
    chart.plotContainer.children.push(watermark);
    watermark.align = "center";
    watermark.valign = "bottom";
    watermark.fontSize = 20;
    watermark.opacity = 0.2;
    watermark.marginBottom = 5;

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
    pieSeries.ticks.template.disabled = true;
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
    pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "{litres}";
    pieSeries.labels.template.radius = -60;
    pieSeries.labels.template.fill = am4core.color("white");
    pieSeries.labels.template.relativeRotation = 90;

    this.chartpie = chartpie;

    let chartbars = am4core.create("chartdivbars", am4charts.XYChart);

    // Add data
    chartbars.data = [{
      "country": "Lithuania",
      "litres": 501.9,
      "units": 250
    }, {
      "country": "Czech Republic",
      "litres": 301.9,
      "units": 222
    }, {
      "country": "Ireland",
      "litres": 201.1,
      "units": 170
    }, {
      "country": "Germany",
      "litres": 165.8,
      "units": 122
    }, {
      "country": "Australia",
      "litres": 139.9,
      "units": 99
    }, {
      "country": "Austria",
      "litres": 128.3,
      "units": 85
    }, {
      "country": "UK",
      "litres": 99,
      "units": 93
    }, {
      "country": "Belgium",
      "litres": 60,
      "units": 50
    }, {
      "country": "The Netherlands",
      "litres": 50,
      "units": 42
    }];

    // Create axes
    let categoryAxisbars = chartbars.xAxes.push(new am4charts.CategoryAxis());
    categoryAxisbars.dataFields.category = "country";
    categoryAxisbars.title.text = "Countries";

    let valueAxisbars = chartbars.yAxes.push(new am4charts.ValueAxis());
    valueAxisbars.title.text = "Litres sold (M)";

    // Create series
    let seriesbars = chartbars.series.push(new am4charts.ColumnSeries());
    seriesbars.dataFields.valueY = "litres";
    seriesbars.dataFields.categoryX = "country";
    seriesbars.name = "Sales";
    seriesbars.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
    seriesbars.columns.template.fill = am4core.color("#104547"); // fill

    var series2bars = chartbars.series.push(new am4charts.LineSeries());
    series2bars.name = "Units";
    series2bars.stroke = am4core.color("#CDA2AB");
    series2bars.strokeWidth = 3;
    series2bars.dataFields.valueY = "units";
    series2bars.dataFields.categoryX = "country";

    this.chartbars = chartbars;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.chartpie.dispose();
      this.chartbars.dispose();
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
          <Col sm={12}>
            <Paper className="pageContainer" style={{ padding: '0px' }}>
              <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer" style={{ padding: '0px' }}>
              <div id="chartdivpie" style={{ width: "100%", height: "400px" }}></div>
            </Paper>
          </Col>
          <Col sm={6}>
            <Paper className="pageContainer" style={{ padding: '0px' }}>
              <div id="chartdivbars" style={{ width: "100%", height: "400px" }}></div>
            </Paper>
          </Col>
        </Row>
      </div>
    );
  }
}

Overview.propTypes = {};

export default withRouter(connect()(Overview));
