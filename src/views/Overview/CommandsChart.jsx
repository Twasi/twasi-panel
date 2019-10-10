import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

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

class CommandsChart extends Component {
  componentDidMount() {
    const chart = am4core.create('commandschartdiv', am4charts.PieChart);

    chart.paddingTop = 65;
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingBottom = -1;

    const commandsdata = [{
      command: '!hosts',
      uses: 10
    }, {
      command: '!commands',
      uses: 15
    }, {
      command: '!check',
      uses: 35
    }, {
      command: '!uptime',
      uses: 24
    }, {
      command: '!title',
      uses: 2
    }, {
      command: '!tw',
      uses: 5
    }, {
      command: '!insta',
      uses: 4
    }, {
      command: '!messages',
      uses: 30
    }];
    const data = [];
    commandsdata.forEach((entry, index) => {
      data.push({
        command: entry.command,
        uses: entry.uses,
        lineColor: `#${generateStringColor(entry.command)}`
      });
    });
    chart.data = data;

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.showOnInit = false;
    pieSeries.dataFields.value = 'uses';
    pieSeries.dataFields.category = 'command';
    pieSeries.slices.template.propertyFields.stroke = 'lineColor';
    pieSeries.slices.template.propertyFields.fill = 'lineColor';
    pieSeries.tooltip.getStrokeFromObject = true;
    pieSeries.slices.template.strokeWidth = 0;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.fillOpacity = 1;
    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    let fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0.5];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;
    pieSeries.slices.template.fillModifier = fillModifier;

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
      <div id="commandschartdiv" style={{ width: '100%', height: '100%' }} />
    );
  }
}

export default CommandsChart;
