import React from 'react';
import joint from 'jointjs';

class AppComponent extends React.Component {
  componentDidMount() {
    var graph = new joint.dia.Graph
    var paper = new joint.dia.Paper({
        el: this.myholder,
        width: 600,
        height: 400,
        gridSize: 1,
        model: graph
    });

    var rect = new joint.shapes.basic.Rect({
        position: { x: 50, y: 70 },
        size: { width: 100, height: 40 }
    });

    graph.addCell(rect);
    
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
