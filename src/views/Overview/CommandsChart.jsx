import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';

am4core.useTheme(am4themes_animated);

function generateStringColor(string) {
  var num = hashCode(string);
  return intToRGB(num);
}
function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "00000".substring(0, 6 - c.length) + c;
}
function hashCode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

class CommandsChart extends Component {
  componentDidMount() {
    const { streamtracker } = this.props;
    let chart = am4core.create("commandschartdiv", am4charts.PieChart);

    chart.paddingTop = 65;
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingBottom = -1;

    let commandsdata = [ {
      "command": "lol",
      "uses": 296
    }, {
      "command": "!twasi",
      "uses": 112
    }, {
      "command": "!ping",
      "uses": 112
    }, {
      "command": "!quasi",
      "uses": 296
    } ];
    let data = [];
    commandsdata.forEach((entry, index) => {
      data.push({
        command: entry.command,
        uses: entry.uses,
        lineColor: "#" + generateStringColor(entry.command)
      });
    });
    chart.data = data;

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "uses";
    pieSeries.dataFields.category = "command";
    pieSeries.slices.template.propertyFields.stroke = "lineColor";
    pieSeries.slices.template.propertyFields.fill = "lineColor";
    pieSeries.tooltip.getStrokeFromObject = true;
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.fillOpacity = 0.3;
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="commandschartdiv" style={{ width: "100%", height: "100%" }}></div>
    );
  }
}

export default CommandsChart;
