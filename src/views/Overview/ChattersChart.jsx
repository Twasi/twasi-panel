import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

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

class ChattersChart extends Component {
  componentDidMount() {
    const { streamtracker } = this.props;
    let chart = am4core.create("chatterschartdiv", am4plugins_forceDirected.ForceDirectedTree);

    chart.paddingTop = 65;
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingBottom = -1;

    let chattersdata = [ {
      "chatter": "Blechkelle",
      "messages": 1024
    }, {
      "chatter": "DieserMerlin",
      "messages": 431
    }, {
      "chatter": "TossyTV",
      "messages": 241
    }, {
      "chatter": "Pandorsaurus",
      "messages": 296
    }, {
      "chatter": "Schnabelino",
      "messages": 138
    }, {
      "chatter": "Larcce",
      "messages": 5
    }, {
      "chatter": "Bumphunk",
      "messages": 55
    }, {
      "chatter": "tom_meka",
      "messages": 823
    }, {
      "chatter": "AkuhTV",
      "messages": 138
    }, {
      "chatter": "JustVarietyTV",
      "messages": 723
    }, {
      "chatter": "ItsDailyTY",
      "messages": 37
    }, {
      "chatter": "PlayNowHD",
      "messages": 223
    }, {
      "chatter": "FromRadioWaveToGammaRay",
      "messages": 20
    }, {
      "chatter": "drflo",
      "messages": 592
    }, {
      "chatter": "DonCarnivore",
      "messages": 312
    }, {
      "chatter": "der_Bobbel",
      "messages": 156
    }, {
      "chatter": "GreenJens",
      "messages": 206
    }, {
      "chatter": "jana_nh",
      "messages": 498
    }, {
      "chatter": "KatrinKeks",
      "messages": 201
    }, {
      "chatter": "karololfggt",
      "messages": 712
    } ];
    let data = [];
    chattersdata.forEach((entry, index) => {
      data.push({
        chatter: entry.chatter,
        messages: entry.messages,
        lineColor: "#" + generateStringColor(entry.chatter)
      });
    });
    chart.data = data;

    // Add and configure Series
    var series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
    series.dataFields.value = "messages";
    series.dataFields.name = "chatter";

    series.nodes.template.label.text = "{chatter}";
    series.nodes.template.tooltipText = "{chatter}: [bold]{messages}[/]";
    series.tooltip.getStrokeFromObject = true;
    series.dataFields.color = "lineColor";
    series.fillOpacity = 0.4;
    series.strokeWidth = 2;
    series.fontSize = 10;
    series.minRadius = 20;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chatterschartdiv" style={{ width: "100%", height: "100%" }}></div>
    );
  }
}

export default ChattersChart;
