import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

import { streamtrackerSelectors, streamtrackerOperations } from '../../state/streamtracker';
import { appInfoSelectors } from '../../state/appInfo';

import crown from '../common/resources/crown.svg';
import pumpkin from '../common/resources/pumpkin_chatter.png';
import ghost from '../common/resources/ghost.png';
import skull from '../common/resources/skull.png';

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
function getImage(string) {
  const num = hashCode(string);
  if(num%2 === 0) {
    return pumpkin;
  } else {
    return ghost;
  }
}

class ChattersChart extends Component {
  componentDidMount() {
    const { streamdata } = this.props;
    const chart = am4core.create('chatterschartdiv'+streamdata.streamId, am4plugins_forceDirected.ForceDirectedTree);

    chart.paddingTop = 65;
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingBottom = -1;

    const chattersdata = streamdata.topChatters;
    const data = [];
    var count = 0
    chattersdata.forEach(entry => {
      count++;
      if(count<30) {
        if (entry.displayName.toLowerCase() === "blechkelle" || entry.displayName.toLowerCase() === "tom_meka" || entry.displayName.toLowerCase() === "larcce" || entry.displayName.toLowerCase() === "deezermerlin" ) {
          data.push({
            displayName: entry.displayName,
            messages: entry.messages,
            lineColor: `#${generateStringColor(entry.displayName)}`,
            image: crown,
            specialImage: skull
          });
        } else {
          data.push({
            displayName: entry.displayName,
            messages: entry.messages,
            lineColor: `#${generateStringColor(entry.displayName)}`,
            specialImage: `${getImage(entry.displayName)}`
          });
        }
      }
    });
    chart.data = data;

    // Add and configure Series
    const series = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());

    series.dataFields.value = 'messages';
    series.dataFields.name = 'displayName';
    series.showOnInit = false;
    series.nodes.template.tooltipText = '[bold]{messages}[/] Nachrichten';
    series.tooltip.getStrokeFromObject = true;
    series.dataFields.color = 'lineColor';
    series.fillOpacity = 1;
    series.strokeWidth = 0;
    series.fontSize = 10;
    series.minRadius = 20;

    if(this.props.theme === "halloween") {
      let icon = series.nodes.template.createChild(am4core.Image);
      icon.propertyFields.href = 'specialImage';
      icon.horizontalCenter = "middle";
      icon.verticalCenter = "middle";
      series.nodes.template.circle.disabled = true;
      series.nodes.template.outerCircle.disabled = true;
      series.nodes.template.label.valign = "bottom";
    }

    if(this.props.theme === "twasi-light") {
      series.nodes.template.label.text = '[#636363]{displayName}[/]';
    } else {
      series.nodes.template.label.text = '{displayName}';
    }

    let fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0.5];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;
    series.nodes.template.fillModifier = fillModifier;

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
      <div id={"chatterschartdiv"+this.props.streamdata.streamId} style={{ width: '100%', height: '100%' }} />
    );
  }
}

const mapStateToProps = state => ({
  streamtracker: streamtrackerSelectors.getStreamtracker(state),
  isLoaded: streamtrackerSelectors.isLoaded(state),
  disabled: streamtrackerSelectors.isDisabled(state),
  theme: appInfoSelectors.getTheme(state),
});

const mapDispatchToProps = dispatch => ({
  verifyData: () => dispatch(streamtrackerOperations.verifyData()),
  updateStreamtracker: () => dispatch(streamtrackerOperations.loadStreamtracker())
});

export default connect(mapStateToProps, mapDispatchToProps)(ChattersChart);
