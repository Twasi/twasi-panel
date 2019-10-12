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

class PlayedGamesChart extends Component {
  componentDidMount() {
    const { streamdata } = this.props;
    const chart = am4core.create('chartdiv_playedgames'+streamdata.streamId, am4charts.XYChart);
    chart.paddingTop = 65;
    chart.paddingBottom = -1;

    function getLength(game) {
      let count = 0;
      streamdata.data.forEach((entry, index) => {
        if (game === entry.game) {
          count++;
        }
      });
      return count;
    }
    const result = Array.from(new Set(streamdata.data.map(s => s.game)))
      .map(game => ({
        game,
        count: getLength(game),
        color: `#${generateStringColor(game)}`
      }));

    chart.data = result;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'game';
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.labels.template.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeDasharray = '4,4';
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.min = 0;

    // Do not crop bullets
    chart.maskBullets = true;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'count';
    series.dataFields.categoryX = 'game';
    series.columns.template.propertyFields.fill = 'color';
    series.columns.template.propertyFields.stroke = 'color';
    series.columns.template.column.cornerRadiusTopLeft = 3;
    series.columns.template.column.cornerRadiusTopRight = 3;
    series.columns.template.tooltipText = '[bold]{game}[/b]\n[bold]{count}[/b] Minuten';
    series.tooltip.getStrokeFromObject = true;
    series.fillOpacity = 1;
    series.strokeWidth = 0;

    let fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0.5];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;
    series.columns.template.fillModifier = fillModifier;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id={"chartdiv_playedgames"+this.props.streamdata.streamId} style={{ width: '100%', height: '100%' }} />
    );
  }
}

const mapStateToProps = state => ({
  streamtracker: streamtrackerSelectors.getStreamtracker(state),
  isLoaded: streamtrackerSelectors.isLoaded(state),
  disabled: streamtrackerSelectors.isDisabled(state)
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(streamtrackerOperations.verifyData()),
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker())
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayedGamesChart);
