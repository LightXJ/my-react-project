import React from 'react';
import echarts from 'echarts';
import getProvinceMapOption from '../echartsChinaMap/provinceMapOptions';
import html2canvas from 'html2canvas';

export default class IqiyiReport extends React.Component {

   // canvas-->image
   convertCanvasToImage(canvas){
    //新Image对象,可以理解为DOM;
      var image = new Image();
      //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
      //指定格式PNG
      image.src = canvas.toDataURL("image/png");
      return image;
  }

  download(imageDataUrl){
    const a = document.createElement('a');
    console.log(imageDataUrl);
    a.setAttribute('href', imageDataUrl);
    a.setAttribute('download', 'download-data-url.png');
    a.click();
  }

  componentDidMount() {
    this.mapChart = echarts.init(this.mapNode);
    let mapOptions = getProvinceMapOption([], 0);
    console.log(mapOptions);
    this.mapChart.setOption(mapOptions, {notMerge: true});
    html2canvas(document.body).then(canvas=> {
      //将转换后的img标签插入到html中
      var img = this.convertCanvasToImage(canvas);
      document.body.append(img);//imgDiv表示你要插入的容器id
      this.download(img.src);
    });
     

      
  }

  render() {
    return (
      <div className="iqiyi-report-page report-content">
        ssssss
        <div className="map-chart" ref={ node => this.mapNode = node } style={ {height:474} } />
      </div>
    );
  }
}