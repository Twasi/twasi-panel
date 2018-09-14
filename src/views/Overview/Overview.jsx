import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { Tabs, Tab } from '@material-ui/core/Tabs';
import Divider from '@material-ui/core/Divider';
import { Container, Row, Col } from 'react-grid-system';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import './_style.css';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class Overview extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    let data = [];
    let visits = 10;
    for (let i = 1; i < 30; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : 2) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.labels.template.disabled = true;
    dateAxis.cursorTooltipEnabled = false;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 0;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.baseGrid.disabled = true;
    valueAxis.cursorTooltipEnabled = false;

    let title = chart.titles.create();
    title.text = "Zuschauerverlauf deines letzten Streams";
    title.fontSize = 16;
    title.marginBottom = 25;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.strokeWidth = 3;
    series.fillOpacity = 0.2;
    series.tooltip.getFillFromObject = false;
    series.tooltip.background.fill = am4core.color("#fff");
    series.tooltip.label.fill = am4core.color("#000");

    chart.padding(0, 0, 0, 0);

    let circleBullet = series.bullets.push(new am4charts.CircleBullet());
    circleBullet.circle.stroke = am4core.color("#fff");
    circleBullet.circle.strokeWidth = 1;

    series.tooltipText = "{dateX} {valueY.value} Zuschauer";
    chart.cursor = new am4charts.XYCursor();

    chart.cursor.lineY.disabled = true;

    chart.cursor.lineX.stroke = am4core.color("#828282");
    chart.cursor.lineX.strokeWidth = 3;
    chart.cursor.lineX.strokeOpacity = 0.2;
    chart.cursor.lineX.strokeDasharray = 4;

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
      "command": "lol",
      "uses": 101
    }, {
      "command": "!twitter",
      "uses": 24
    },{
      "command": "!game",
      "uses": 13
    },{
      "command": "!check",
      "uses": 59
    },{
      "command": "!uptime",
      "uses": 33
    }];

    // Add and configure Series
    let pieSeries = chartpie.series.push(new am4charts.PieSeries());
    pieSeries.ticks.template.disabled = true;
    pieSeries.dataFields.value = "uses";
    pieSeries.dataFields.category = "command";
    pieSeries.alignLabels = false;
    pieSeries.labels.template.text = "{command}";
    pieSeries.labels.template.radius = -65;
    pieSeries.labels.template.fill = am4core.color("white");
    pieSeries.labels.template.relativeRotation = 90;
    pieSeries.tooltip.getFillFromObject = false;
    pieSeries.tooltip.background.fill = am4core.color("#fff");
    pieSeries.tooltip.label.fill = am4core.color("#000");

    let titlepie = chartpie.titles.create();
    titlepie.text = "Genutzte Befehle";
    titlepie.fontSize = 16;

    this.chartpie = chartpie;

    let chartbars = am4core.create("chartdivbars", am4charts.XYChart);

    // Add data
    chartbars.data = [{
      "game": "Grand Theft Auto V",
      "averageviewers": 20,
      "minutes": 60
    }, {
      "game": "Minecraft",
      "averageviewers": 35,
      "minutes": 20
    }, {
      "game": "Overwatch",
      "averageviewers": 4,
      "minutes": 36
    }, {
      "game": "League of Legends",
      "averageviewers": 2,
      "minutes": 123
    }, {
      "game": "Dota 2",
      "averageviewers": 21,
      "minutes": 74
    }, {
      "game": "IRL",
      "averageviewers": 45,
      "minutes": 66
    }];

    let titlebars = chartbars.titles.create();
    titlebars.text = "Gespielte Spiele";
    titlebars.marginBottom = 25;
    titlebars.fontSize = 16;

    // Create axes
    let categoryAxisbars = chartbars.xAxes.push(new am4charts.CategoryAxis());
    categoryAxisbars.renderer.grid.template.disabled = true;
    categoryAxisbars.dataFields.category = "game";

    let valueAxisbars = chartbars.yAxes.push(new am4charts.ValueAxis());
    valueAxisbars.renderer.grid.template.disabled = true;
    valueAxisbars.renderer.labels.template.disabled = true;
    valueAxisbars.renderer.baseGrid.disabled = true;

    let label = categoryAxisbars.renderer.labels.template;
    label.truncate = true;
    label.maxWidth = 120;

    // Create series
    let seriesbars = chartbars.series.push(new am4charts.ColumnSeries());
    seriesbars.dataFields.valueY = "minutes";
    seriesbars.dataFields.categoryX = "game";
    seriesbars.columns.template.tooltipText = "Spiel: {game}\nZeit: {minutes}\nZuschauer: {averageviewers}";
    seriesbars.tooltip.getFillFromObject = false;
    seriesbars.tooltip.background.fill = am4core.color("#fff");
    seriesbars.tooltip.label.fill = am4core.color("#000");

    var seriesbars2 = chartbars.series.push(new am4charts.LineSeries());
    seriesbars2.name = "Average Viewers";
    seriesbars2.strokeWidth = 3;
    seriesbars2.dataFields.valueY = "averageviewers";
    seriesbars2.dataFields.categoryX = "game";

    chartbars.padding(0, 0, 0, 0);

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
        <Row>
          <Col sm={12}>
            <Paper className="pageContainer" style={{ marginTop: '0px' }}>
              <h4 className="pageContainerTitle">Statistiken deines letzten Streams
                <span style={{ float: 'right' }}>
                  <Button variant="contained" color="primary">Aktualisieren</Button>
                </span>
              </h4>
              <small>Hier findest du die Statisten deines letzten von Twasi erfassten Streams.</small>
            </Paper>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
              <div>
                <List dense style={{ padding: '0px' }}>
                  <Paper className="pageContainer" style={{ padding: '0px', margin: '23px 0px 0px 0px' }}>
                    <ListItem>
                      <ListItemText secondary="1.337" >
                        Stream ID
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem>
                      <ListItemText secondary="13:37">
                        Dauer
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem>
                      <ListItemText secondary="1.337" >
                        Chatnachrichten
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem>
                      <ListItemText secondary="1.337" >
                        Befehle ausgeführt
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem>
                      <ListItemText secondary="1.337" >
                        Follower
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem>
                      <ListItemText secondary="1.337" >
                        Aufrufe
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem>
                      <ListItemText secondary="1.337" >
                        Zuschauer Maximum
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem>
                      <ListItemText secondary="1.337" >
                        Zuschauer Durchschnitt
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem>
                      <ListItemText secondary="1.337" >
                        Individuelle Zuschauer
                      </ListItemText>
                    </ListItem>
                  </Paper>
                  <Paper className="pageContainer" style={{ padding: '0px', marginTop: '10px' }}>
                    <ListItem style={{ padding: '0px' }}>
                      <Button fullWidth variant="contained" color="secondary" style={{ borderRadius: '0px' }}>
                        Streamdaten Löschen
                      </Button>
                    </ListItem>
                  </Paper>
                </List>
              </div>
          </Col>
          <Col sm={9}>
            <Paper className="pageContainer" style={{ padding: '25px 0px 0px 0px' }}>
              <div id="chartdiv" style={{ width: "100%", height: "250px", margin: '0px' }}></div>
            </Paper>
            <Row>
            <Col sm={6}>
              <Paper className="pageContainer" style={{ padding: '25px 0px 0px 0px' }}>
                <div id="chartdivpie" style={{ width: "100%", height: "350px", margin: '0px' }}></div>
              </Paper>
            </Col>
            <Col sm={6}>
              <Paper className="pageContainer" style={{ padding: '25px 0px 0px 0px' }}>
                <div id="chartdivbars" style={{ width: "100%", height: "350px", margin: '0px' }}></div>
              </Paper>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Overview.propTypes = {};

export default withRouter(connect()(Overview));
