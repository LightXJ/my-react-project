import React from 'react';
import joint from 'jointjs';

class AppComponent extends React.Component {
  componentDidMount() {
    let graph = new joint.dia.Graph;

    let paper = new joint.dia.Paper({
        el: this.myholder,
        width: 600,
        height: 200,
        model: graph
    });

    joint.shapes.basic.Rect = joint.shapes.basic.Generic.extend({   //创建自定义矩形
      markup: '<image/>',

      defaults: joint.util.deepSupplement({
          type: 'basic.Image',
          attrs: {
              'image': { src: '/images/yeoman.png', 'xlink:href': '/images/yeoman.png', width: 96, height: 96 },
          }
      }, joint.shapes.basic.Generic.prototype.defaults)
  });

    var myReact=new joint.shapes.basic.Rect({  //绘制元素
      position:{x: 100 , y: 70},
      size: {width: 100 ,height: 30},
      attrs: {text: {text: 'QLY' } }
    });

    let rect = new joint.shapes.basic.Rect({
        position: { x: 100, y: 30 },
        size: { width: 100, height: 30 },
        attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    let rect2 = rect.clone();
    rect2.translate(300);

    let link = new joint.dia.Link({
        source: { id: rect.id },
        target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, link, myReact]);
    
  }
  render() {
    return (
      <div className="jointjs-page">
        <div id="myholder" ref={myholder=>this.myholder=myholder}> </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
