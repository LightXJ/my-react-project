import React from 'react';
import Raphael from 'raphael';
import placeMap from './placeMap';

export default class ChinaMap  extends React.Component {

  state = {
    rankList: {
      
    }
  }
  componentDidMount(){
    if(!this.mapWrap)return;
    var R = Raphael(this.mapWrap, 800, 600);
    R.setViewBox(0,0,600,500);
    var textAttr = {
      'fill': '#000',
      'font-size': '12px',
      'cursor': 'pointer'
    };
    var attr = {
      'fill': '#97d6f5',
      'stroke': '#eee',
      'stroke-width': 1,
      'stroke-linejoin': 'round'
    };
    for (var place in placeMap) {
      placeMap[place]['path'] = R.path(placeMap[place]['path']).attr(attr);
      placeMap[place]['path'].color = Raphael.getColor(0.9);

      ((st, place) => {
        //获取当前图形的中心坐标
        var xx = st.getBBox().x + (st.getBBox().width / 2);
        var yy = st.getBBox().y + (st.getBBox().height / 2);

        //***修改部分地图文字偏移坐标
        switch (placeMap[place]['name']) {
          case '江苏':
            xx += 5;
            yy -= 10;
            break;
          case '河北':
            xx -= 10;
            yy += 20;
            break;
          case '天津':
            xx += 10;
            yy += 10;
            break;
          case '上海':
            xx += 10;
            break;
          case '广东':
            yy -= 10;
            break;
          case '澳门':
            yy += 10;
            break;
          case '香港':
            xx += 20;
            yy += 5;
            break;
          case '甘肃':
            xx -= 40;
            yy -= 30;
            break;
          case '陕西':
            xx += 5;
            yy += 10;
            break;
          case '内蒙古':
            xx -= 15;
            yy += 65;
            break;
          default:
        }

        //写入文字
        placeMap[place]['text'] = R.text(xx, yy, placeMap[place]['name']).attr(textAttr);

        st[0].onmouseover = function () {
          st.animate({fill: st.color, stroke: '#eee'}, 500);
          placeMap[place]['text'].toFront();
        };
        st[0].onmouseout = function () {
          st.animate({fill: '#97d6f5', stroke: '#eee'}, 500);
          placeMap[place]['text'].toFront();
        };
        st[0].onclick = function () {
          console.log(placeMap[place]['name']);
        };

      })(placeMap[place]['path'], place);
    }
  }

  render() {
      return (
          <div className="map-page">
            <div ref={node=>this.mapWrap=node}></div>
            <div className="rank-list">

            </div>
          </div>
      );
  }
}

