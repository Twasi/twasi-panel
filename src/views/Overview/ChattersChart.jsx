import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';

import crown from '../common/resources/crown.svg';

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

class ChattersChart extends Component {
  componentDidMount() {
    const { streamtracker } = this.props;
    const chart = am4core.create('chatterschartdiv', am4plugins_forceDirected.ForceDirectedTree);

    chart.paddingTop = 65;
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingBottom = -1;

    const chattersdata = streamtracker.topChatters;
    const data = [];
    chattersdata.forEach(entry => {
      if (['blechkelle', 'diesermerlin', 'larcce', 'tom_meka'].contains(entry.displayName.toLowerCase())) {
        data.push({
          displayName: entry.displayName,
          messages: entry.messages,
          lineColor: `#${generateStringColor(entry.displayName)}`,
          image: crown
        });
      } else {
        data.push({
          displayName: entry.displayName,
          messages: entry.messages,
          lineColor: `#${generateStringColor(entry.displayName)}`
        });
      }
    });
    chart.data = data;

    // Add and configure Series
    const series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
    series.dataFields.value = 'messages';
    series.dataFields.name = 'displayName';

    series.nodes.template.label.text = '{displayName}';
    series.nodes.template.tooltipText = '{displayName}: [bold]{messages}[/]';
    series.tooltip.getStrokeFromObject = true;
    series.dataFields.color = 'lineColor';
    series.fillOpacity = 0.4;
    series.strokeWidth = 2;
    series.fontSize = 10;
    series.minRadius = 20;

    const icon = series.nodes.template.createChild(am4core.Image);
    icon.propertyFields.href = 'image';
    icon.horizontalCenter = 'middle';
    icon.verticalCenter = 'bottom';
    icon.width = 40;
    icon.height = 40;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chatterschartdiv" style={{ width: '100%', height: '100%' }} />
    );
  }
}


ChattersChart.propTypes = {
  updateStreamtracker: PropTypes.func.isRequired,
  streamtracker: PropTypes.arrayOf(PropTypes.shape({
    topChatters: PropTypes.arrayOf(PropTypes.shape({
      twitchId: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      messages: PropTypes.string.isRequired,
      commands: PropTypes.string.isRequired
    }))
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
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChattersChart);
