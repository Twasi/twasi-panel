import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';

am4core.options.queue = false;
am4core.options.onlyShowOnViewport = true;

function generateStringColor(string) {
  const num = hashCode(string);
  return intToRGB(num);
}
function intToRGB(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

class ViewerChart extends Component {
  componentDidMount() {
    const { streamdata } = this.props;
    const chart = am4core.create('chartdiv'+streamdata.streamId, am4charts.XYChart);
    chart.paddingTop = 65;
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingBottom = -1;

    const data = [];
    let game = '';
    streamdata.data.forEach((entry, index) => {
      game = entry.game;
      if (game !== entry.game) {
        data.push({
          viewerCount: entry.viewerCount,
          game: entry.game,
          chatMessages: entry.chatMessages,
          chatCommands: entry.chatCommands,
          timestamp: new Date(entry.timestamp).toLocaleString(),
          lineColor: chart.colors.next()
        });
      } else {
        data.push({
          viewerCount: entry.viewerCount,
          game: entry.game,
          chatMessages: entry.chatMessages,
          chatCommands: entry.chatCommands,
          timestamp: new Date(entry.timestamp).toLocaleString()
        });
      }
      if (index === 0 || data[index - 1].game !== entry.game) {
        data[data.length - 1].lineColor =
          `#${generateStringColor(entry.game)}`;
      }
    });
    chart.data = data;

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.dataFields.category = 'timestamp';
    categoryAxis.startLocation = 1;
    categoryAxis.endLocation = 0;
    categoryAxis.renderer.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.line.opacity = 0;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.ticks.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.renderer.disabled = true;

    const lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.showOnInit = false;
    lineSeries.dataFields.categoryX = 'timestamp';
    lineSeries.dataFields.valueY = 'viewerCount';
    lineSeries.tooltipText = '[bold]{viewerCount}[/b] Zuschauer\n[bold]{game}[/b]\n[bold]{timestamp}[/b]';
    lineSeries.tooltip.getStrokeFromObject = true;
    lineSeries.fillOpacity = 1;
    lineSeries.strokeWidth = 0;
    lineSeries.propertyFields.stroke = 'lineColor';
    lineSeries.propertyFields.fill = 'lineColor';
    lineSeries.tensionX = 0.77;

    let fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0.5];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;
    lineSeries.segments.template.fillModifier = fillModifier;

    const valueAxisMessages = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisMessages.tooltip.disabled = true;
    valueAxisMessages.renderer.line.opacity = 0;
    valueAxisMessages.renderer.grid.template.disabled = true;
    valueAxisMessages.renderer.ticks.template.disabled = true;
    valueAxisMessages.min = 0;
    valueAxisMessages.renderer.disabled = true;

    const messageslineSeries = chart.series.push(new am4charts.ColumnSeries());
    messageslineSeries.showOnInit = false;
    messageslineSeries.name = 'Chatnachrichten';
    messageslineSeries.dataFields.valueY = 'chatMessages';
    messageslineSeries.dataFields.categoryX = 'timestamp';
    messageslineSeries.tooltipText = '[bold]{chatMessages}[/b] Nachrichten';
    messageslineSeries.tooltip.getStrokeFromObject = true;
    messageslineSeries.stroke = '#fdd400';
    messageslineSeries.fill = '#fdd400';
    messageslineSeries.fillOpacity = 0.4;
    messageslineSeries.yAxis = valueAxisMessages;
    messageslineSeries.strokeWidth = 0;
    messageslineSeries.tensionX = 0.77;

    const valueAxisCommands = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxisCommands.tooltip.disabled = true;
    valueAxisCommands.renderer.line.opacity = 0;
    valueAxisCommands.renderer.grid.template.disabled = true;
    valueAxisCommands.renderer.ticks.template.disabled = true;
    valueAxisCommands.min = 0;
    valueAxisCommands.renderer.disabled = true;

    const commandslineSeries = chart.series.push(new am4charts.ColumnSeries());
    commandslineSeries.showOnInit = false;
    commandslineSeries.name = 'Befehle';
    commandslineSeries.dataFields.valueY = 'chatCommands';
    commandslineSeries.dataFields.categoryX = 'timestamp';
    commandslineSeries.tooltipText = '[bold]{chatCommands}[/b] Befehle';
    commandslineSeries.tooltip.getStrokeFromObject = true;
    commandslineSeries.stroke = '#00aeae';
    commandslineSeries.fill = '#00aeae';
    messageslineSeries.fillOpacity = 0.4;
    commandslineSeries.yAxis = valueAxisCommands;
    commandslineSeries.strokeWidth = 0;
    commandslineSeries.tensionX = 0.77;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.opacity = 1;
    chart.cursor.lineY.opacity = 0;
    chart.cursor.lineX.strokeWidth = 3;
    chart.cursor.lineX.strokeOpacity = 0.2;
    chart.cursor.lineX.strokeDasharray = "";
    chart.cursor.lineX.stroke = am4core.color("#ffffff");

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id={"chartdiv"+this.props.streamdata.streamId} style={{ width: '100%', height: '100%' }} />
    );
  }
}

const mapStateToProps = state => ({
  streamtracker: streamtrackerSelectors.getStreamtracker(state),
  isLoaded: streamtrackerSelectors.isLoaded(state),
  disabled: streamtrackerSelectors.isDisabled(state),
  isStreamByIDLoading: streamtrackerSelectors.isStreamByIDLoading(state),
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(streamtrackerOperations.verifyData()),
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker())
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewerChart);
