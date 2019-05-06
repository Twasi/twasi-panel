import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class ViewerChart extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingTop = 65;
    chart.paddingRight = 0;
    chart.paddingLeft = 0;
    chart.paddingBottom = 0;

    let data = [];
    chart.data = [{
      "year": "2014",
      "income": 23.5,
      "expenses": 21.1,
      "lineColor": chart.colors.next()
    }, {
      "year": "2015",
      "income": 26.2,
      "expenses": 30.5
    }, {
      "year": "2016",
      "income": 30.1,
      "expenses": 34.9
    }, {
      "year": "2017",
      "income": 20.5,
      "expenses": 23.1
    }, {
      "year": "2018",
      "income": 30.6,
      "expenses": 28.2,
      "lineColor": chart.colors.next()
    }, {
      "year": "2019",
      "income": 34.1,
      "expenses": 31.9
    }, {
      "year": "2020",
      "income": 34.1,
      "expenses": 31.9
    }, {
      "year": "2021",
      "income": 34.1,
      "expenses": 31.9,
      "lineColor": chart.colors.next()
    }, {
      "year": "2022",
      "income": 34.1,
      "expenses": 31.9
    }, {
      "year": "2023",
      "income": 34.1,
      "expenses": 31.9
    }, {
      "year": "2024",
      "income": 34.1,
      "expenses": 31.9
    }];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.ticks.template.disabled = true;
    categoryAxis.renderer.line.opacity = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 10;
    categoryAxis.dataFields.category = "year";
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
    lineSeries.dataFields.categoryX = "year";
    lineSeries.dataFields.valueY = "income";
    lineSeries.tooltipText = "income: {valueY.value}";
    lineSeries.fillOpacity = 0.3;
    lineSeries.strokeWidth = 2;
    lineSeries.propertyFields.stroke = "lineColor";
    lineSeries.propertyFields.fill = "lineColor";

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

export default ViewerChart;
