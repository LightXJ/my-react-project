import React from 'react';
import echarts from 'echarts';
import getProvinceMapOption from './provinceMapOptions';

export default class IqiyiReport extends React.Component {

  componentDidMount() {
    this.mapChart = echarts.init(this.mapNode);
    let mapOptions = getProvinceMapOption([], 0);
    console.log(mapOptions);
    this.mapChart.setOption(mapOptions, {notMerge: true});
  }

  render() {
    return (
      <div className="iqiyi-report-page report-content">
        <div className="map-chart" ref={ node => this.mapNode = node } style={ {height:474} } />
      </div>
    );
  }
}