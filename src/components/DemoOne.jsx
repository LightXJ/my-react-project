import React from 'react';
import {jsPlumb} from 'jsplumb';

class AppComponent extends React.Component {
  componentDidMount() {

    jsPlumb.ready(function () {
      var common = {
        isSource: true,
        isTarget: true,
        connector: 'Straight',
        endpoint: 'Dot',
        paintStyle: {
          fill: 'white',
          outlineStroke: 'blue',
          strokeWidth: 3
        },
        hoverPaintStyle: {
          outlineStroke: 'lightblue'
        },
        maxConnections: 3,
        connectorStyle: {
          outlineStroke: 'green',
          strokeWidth: 1
        },
        connectorHoverStyle: {
          strokeWidth: 2
        }
      }

      jsPlumb.addEndpoint('item_left', {
        anchors: ['Right']
      }, common)

      jsPlumb.addEndpoint('item_right', {
        anchor: 'Left'
      }, common)

      jsPlumb.addEndpoint('item_right', {
        anchor: 'Right'
      }, common)



      jsPlumb.bind('connection',function(connInfo){
        if (connInfo.connection.sourceId == connInfo.connection.targetId) {
          jsPlumb.deleteConnection(connInfo.connection);
          alert('不能连接自己！');
          }else{
            console.log( jsPlumb.getAllConnections())
            alert('连接'+connInfo.connection.sourceId+'==='+connInfo.connection.targetId);
          }
      })

      jsPlumb.bind('click', function (conn) {
        if (confirm('Delete connection from ' + conn.sourceId + ' to ' + conn.targetId + '?'))
        jsPlumb.deleteConnection(conn);
        console.log( jsPlumb.getAllConnections() )
      });

      jsPlumb.draggable(['item_left','item_right'])
    })
  }
  render() {
    return (
      <div className="demo1-page">
       <div id="item_left" className="item"></div>
        <div id="item_right" className="item" style={{left:'150px'}}></div>
        <div id="item_third" className="item" style={{left:'300px'}}></div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
