import echarts from 'echarts';
import { chinaJson, regionChinaJson } from './chinaJson';

function myMergeProvinces(cjson, areas) {
  let regionChinaJson = JSON.parse(JSON.stringify(cjson));
  let { features } = regionChinaJson;
  areas.forEach((area) => {
    let { names, properties } = area;
    let polygons = [];
    // 将指定省的polygon保存下来，并将省的数据从地图中删除
    for (let i = 0, iLen = names.length; i < iLen; i++) {
      for (let j = 0, jLen = features.length; j < jLen; j++) {
        if (features[j].properties.name == names[i]) {
          polygons = polygons.concat(features[j].geometry.coordinates);
          features.splice(j, 1);
          break;
        }
      }
    }
    // 构建新的合并区域
    let feature = {
      type: 'Feature',
      id: `${features.length}`,
      properties: {
        name: properties.name || ''
      },
      geometry: {
        type: 'Polygon',
        coordinates: polygons
      }
    };
    if (properties.cp) {
      feature.properties.cp = properties.cp;
    }

    // 将新的合并区域添加到地图中
    features.push(feature);
  });
  return regionChinaJson;
}

let areaCode = [{
  names: ['辽宁', '黑龙江', '吉林'],
  properties: {
    name: '东北',
    cp: [
      122.553222,
      41.8
    ]
  }
}, {
  names: [
    '上海',
    '江苏',
    '浙江',
    '山东',
    '江西',
    '福建',
    '安徽'
  ],
  properties: {
    name: '华东',
    cp: [120.33, 36.07]
  }
}, {
  names: [
    '湖北',
    '湖南',
    '河南'
  ],
  properties: {
    name: '华中',
    cp: [113, 28.21]
  }
}, {
  names: [
    '北京',
    '天津',
    '河北',
    '山西',
    // '内蒙古'
  ],
  properties: {
    name: '华北',
    cp: [116.46, 39.92]
  }
}, {
  names: [
    // '广东',
    '海南',
    '台湾',
    '广西'
  ],
  properties: {
    name: '华南',
    cp: [113.23, 23.16]
  }
}, {
  names: [
    '青海',
    '宁夏',
    '陕西',
    '甘肃',
    '新疆'
  ],
  properties: {
    name: '西北',
    cp: [101.74, 36.56]
  }
}, {
  names: [
    '重庆',
    '四川',
    '云南',
    '贵州',
    '西藏'
  ],
  properties: {
    name: '西南',
    cp: [106.54, 29.59]
  }
}];

const mergeRegionChinaJson = myMergeProvinces(chinaJson, areaCode);

const TEXTGEAY = '#8B94A6';
const BLACK_TEXT = '#19233B';

const COLOR = [
  ['rgba(24,144,255,1)', 'rgba(24,144,255,0.8)', 'rgba(24,144,255,0.6)', 'rgba(24,144,255,0.5)', 'rgba(24,144,255,0.4)', 'rgba(24,144,255,0.2)'],
  ['rgba(47,194,91,1)', 'rgba(47,194,91,0.8)', 'rgba(47,194,91,0.6)', 'rgba(47,194,91,0.5)', 'rgba(47,194,91,0.4)', 'rgba(47,194,91,0.2)'],
  ['rgba(255,191,0,1)', 'rgba(255,191,0,0.8)', 'rgba(255,191,0,0.6)', 'rgba(255,191,0,0.5)', 'rgba(255,191,0,0.4)', 'rgba(255,191,0,0.2)'],
  ['rgba(133,67,224,1)', 'rgba(133,67,224,0.8)', 'rgba(133,67,224,0.6)', 'rgba(133,67,224,0.5)', 'rgba(2133,67,224,0.4)', 'rgba(133,67,224,0.2)']
];

const convertData = function (datas) {
  let res = [], index = 1;
  for (let i = 0; i < datas.length; i++) {
    res.push({
      name: datas[i].area.replace(/省|市|特别行政区|回族自治区|壮族自治区|维吾尔自治区|自治区$/g, ''),
      // value: datas[ i ].ratio,
      value: index,
      rank: index
    });
    index += 1;
  }
  res.push({
    name: '南海诸岛',
    value: '',
    itemStyle: {
      normal: { opacity: 1, label: { show: false } }
    }
  });
  return res;
};

const getProvinceMapOption = (regionData, index = 0) => {
  // echarts.registerMap('china', chinaJson);
  // echarts.registerMap('china', regionChinaJson);
  echarts.registerMap('china', mergeRegionChinaJson);
  return {
    tooltip: {
      show: true,
      backgroundColor: 'rgba(255,255,255,.95)',
      borderColor: '#8B94A6',
      borderWidth: 1,
      padding: 10,
      textStyle: {
        color: BLACK_TEXT,
        fontSize: 14
      },
      formatter(params) {
        let { data } = params;
        if (!data.value) {
          return '';
        }
        return `<div class="map-tootip-wrap"><div>${data.name}<div></br><span class="dot" style="background:${params.color};"></span><span class="rank-title">排名</span>${data.rank}</div>`;
      }
    },
    visualMap: {
      type: 'piecewise',
      left: 34,
      bottom: 30,
      itemWidth: 10,
      itemHeight: 20,
      orient: 'horizontal',
      itemGap: 4,
      min: 0,
      max: 10,
      splitNumber: 6,
      text: [' 低', '搜索指数： 高 '],
      show: true,
      inRange: {
        color: COLOR[index],
        symbol: {
          '': 'rect'
        }
      },
      textStyle: {
        color: TEXTGEAY
      }
    },
    geo: {
      left: 'center',
      top: 40,
      bottom: 100,
      map: 'china',
      roam: false,
      zoom: 1,
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: COLOR[index][5]
        },
        emphasis: {
          areaColor: COLOR[index][0]
        }
      },
      regions: [{
        name: '南海诸岛',
        value: 0,
        itemStyle: {
          normal: {
            opacity: 1,
            label: {
              show: false
            }
          }
        }
      }]
    },
    series: [{
      type: 'map',
      mapType: 'china',
      geoIndex: 0,
      data: convertData(regionData),
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        emphasis: {
          areaColor: 'rgba(24,144,255,1)'
        }
      }
    }]
  };
};

export default getProvinceMapOption;
console.log(JSON.stringify(regionChinaJson));
console.log(JSON.stringify(mergeRegionChinaJson));
export { regionChinaJson, getProvinceMapOption };