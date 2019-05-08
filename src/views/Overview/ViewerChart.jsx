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

class ViewerChart extends Component {
  componentDidMount() {
    const { streamtracker } = this.props;
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingTop = 65;
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingBottom = 0;

    let data = [];
    var game = ""
    streamtracker.data.forEach((entry, index) => {
      game = entry.game
      if(game != entry.game) {
        data.push({
          viewerCount: entry.viewerCount,
          game: entry.game,
          chatMessages: entry.chatMessages,
          timestamp: entry.timestamp,
          lineColor: chart.colors.next()
        });
      } else {
        data.push({
          viewerCount: entry.viewerCount,
          game: entry.game,
          chatMessages: entry.chatMessages,
          timestamp: entry.timestamp
        });
      }
      if (index === 0 || data[index - 1].game !== entry.game) {
        data[data.length - 1].lineColor =
          "#" + generateStringColor(entry.game);
      }
    });
    chart.data = data;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.dataFields.category = "timestamp";
    categoryAxis.startLocation = 1;
    categoryAxis.endLocation = 0;
    categoryAxis.renderer.disabled = true;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.renderer.disabled = true;

    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.categoryX = "timestamp";
    lineSeries.dataFields.valueY = "viewerCount";
    lineSeries.tooltipText = "Zuschauer: [bold]{viewerCount}[/b]\nSpiel: [bold]{game}[/b]\nZeitpunkt: [bold]{timestamp}[/b]";
    lineSeries.fillOpacity = 0.3;
    lineSeries.strokeWidth = 2;
    lineSeries.propertyFields.stroke = "lineColor";
    lineSeries.propertyFields.fill = "lineColor";
    lineSeries.tensionX = 0.77;

    let valueAxisMessages = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisMessages.tooltip.disabled = true;
    valueAxisMessages.renderer.line.opacity = 0;
    valueAxisMessages.renderer.grid.template.disabled = true;
    valueAxisMessages.renderer.ticks.template.disabled = true;
    valueAxisMessages.min = 0;
    valueAxisMessages.renderer.disabled = true;

    var messageslineSeries = chart.series.push(new am4charts.LineSeries());
    messageslineSeries.name = "Chatnachrichten";
    messageslineSeries.dataFields.valueY = "chatMessages";
    messageslineSeries.dataFields.categoryX = "timestamp";
    messageslineSeries.tooltipText = "Nachrichten pro Minute: [bold]{chatMessages}[/b]";
    messageslineSeries.stroke = '#fdd400';
    messageslineSeries.fill = '#fdd400';
    messageslineSeries.yAxis = valueAxisMessages;
    messageslineSeries.strokeWidth = 1;
    messageslineSeries.tensionX = 0.77;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panX";
    chart.cursor.lineX.opacity = 0;
    chart.cursor.lineY.opacity = 0;
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "100%" }}></div>
    );
  }
}

ViewerChart.propTypes = {
  updateStreamtracker: PropTypes.func.isRequired,
  streamtracker: PropTypes.arrayOf(PropTypes.shape({
    streamId: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    startedAt: PropTypes.string.isRequired,
    streamType: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      gameId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      game: PropTypes.string.isRequired,
      viewerCount: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    })),
  })),
  disabled: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  streamtracker: streamtrackerSelectors.getStreamtracker(state),
  isLoaded: streamtrackerSelectors.isLoaded(state),
  disabled: streamtrackerSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(streamtrackerOperations.verifyData()),
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewerChart);
