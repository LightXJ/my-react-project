import React from 'react';
import {Modal,Input,Button} from 'antd';
import { jsPlumb } from 'jsplumb';
import uuidv1 from 'uuid/v1';

const DynamicAnchors = ['Left', 'Right', 'Top', 'Bottom']
const connectorStyle = { stroke: '#7AB02C', strokeWidth: 2, joinstyle: 'round' }
const connectorHoverStyle = { stroke: '#5c96bc', strokeWidth: 3 }
const endpointStyle = { fill: 'transparent', stroke: '#7AB02C', radius: 7, strokeWidth: 1 }
const endpointHoverStyle = { fill: '#5c96bc', stroke: '#5c96bc', radius: 7, strokeWidth: 1 }
const anEndpoint = {
  connector: 'Flowchart',
  endpoint: 'Dot',
  isSource: true,
  isTarget: true,
  paintStyle: endpointStyle,
  hoverPaintStyle: endpointHoverStyle,
  connectorStyle: connectorStyle,
  connectorHoverStyle: connectorHoverStyle
}
const Common = {
  anchor: 'AutoDefault',
  connector: 'Flowchart',
  endpoint: 'Dot',
  paintStyle: connectorStyle,
  hoverPaintStyle: connectorHoverStyle,
  endpointStyle,
  endpointHoverStyle
}
export default class RightArea extends React.Component {
  state = {
    initialized: false,
    dialogVisible: false,
    datas: null,
    dialogVisible: false,
    dialogTitle: '',
    dialogText: '',
    nodes: [],
    edges: [],
    info: null,
    rjsp: jsPlumb.getInstance({
      ConnectionOverlays: [
      ['Arrow', { location: 1, id: 'arrow', width: 11, length: 11 }],
      ['Label', { location: 0.3, id: 'label', cssClass: 'jsp-label', events: {
        dblclick: () => {
          this.editLabelText();
        }
      } }]
      ]
    })
  }

  componentDidMount() {
    this.init();
    this.refs.nodes = [];
  }
  componentWillMount = () => {

  }
  hideModal = () => {
    this.setState({modalVisible:false});
  }

  init = () => {
    this.props.jsp.droppable(this.refs.right, { drop: this.jspDrop })
    this.state.rjsp.bind('beforeDrop', this.jspBeforeDrop)
    this.fetchData()
  }

  fetchData () {
    var jsonString = '{"nodes":[{"className":"circle","id":"node-0","text":"过程","style":{"left":"145px","top":"89px"}},{"className":"rect","id":"node-1","text":"结束","style":{"left":"265px","top":"429px"}}],"edges":[{"source":"node-0","target":"node-1","anchor":"AutoDefault","labelText":"yes"}]}';
    var nodeData = JSON.parse( jsonString );
    this.setState({datas:nodeData, nodes: nodeData.nodes, edges: nodeData.edges},() => {
      this.initNodes(this.refs.nodes);
      this.initEdges(nodeData.edges);
    });
  }


  jspBeforeDrop = (info) => {
    info.targetId = info.dropEndpoint.elementId
    let connections = this.state.rjsp.getConnections({ source: info.sourceId, target: info.targetId })
    if (info.targetId === info.sourceId) {
      Modal.warning({
        title: '不可以自己连接自己'
      });
    } else {
      if (connections.length === 0) {  // 检察是否已经建立过连接
        this.setState({info});
        this.addEdge(info);
      } else {
        Modal.warning({
          title: '两个节点之间只能有一条连接'
        })
      }
    }
  }

  jspDrop = (info) =>{
    this.setState({info});
    let nodes = JSON.parse(JSON.stringify(this.state.nodes));
    nodes.push(this.createNode(info.drag.el, info.drop.el));
    this.setState({nodes},()=>{
      this.initNodes(this.refs.nodes[this.state.nodes.length-1]);
    });
  }

  createNode = (dragEl, dropEl) => {
    let rect = dropEl.getBoundingClientRect()
    return {
      className: dragEl.classList[0],
      id: uuidv1(),
      text: dragEl.innerText,
      style: {
        left: this.props.pos[0] - rect.left - dragEl.clientLeft + 'px',
        top: this.props.pos[1] - rect.top - dragEl.clientTop + 'px'
        // lineHeight: dragEl.clientHeight + 'px'
      }
    }
  }

  initNodes = (node) => {
    this.state.rjsp.draggable(node, {constrain:true});
    DynamicAnchors.map(anchor => this.state.rjsp.addEndpoint(node, anEndpoint, { anchor }));
  }

  initEdges = (edges) => {
    edges.map(edge => this.state.rjsp.connect(edge, Common).getOverlay('label').setLabel(edge.labelText))
  }

  editLabelText = (info) => {
    console.log('label:' + info);
  }

  activeElem = () => {
    console.log('activeElem');
  }

  deleteNode = (event,node) => {
    event.stopPropagation();
    this.state.rjsp.deleteConnectionsForElement(node.id);
    let edges = this.state.rjsp.getAllConnections().map(connection => {
      return {
        source: connection.sourceId,
        target: connection.targetId,
        labelText: connection.getOverlay('label').labelText
      }
    });
    let nodes = Object.assign([],this.state.nodes);
    nodes.splice(nodes.findIndex(n=>n.id===node.id),1);
    this.setState({datas:{nodes,edges},nodes,edges}, ()=>{
      this.reload();
    });
  }
  
  addEdge = (info) => {
    this.state.rjsp.connect({ source: info.sourceId, target: info.targetId }, Common);
  }

  reload = () => {
    this.clearAll();
    this.setState({
      nodes: this.state.datas.nodes,
      edges: this.state.datas.edges
    })
    this.state.rjsp.bind('beforeDrop', this.jspBeforeDrop);
    this.initNodes(this.refs.nodes.filter(refNode=>refNode));  // 删除一个节点后，它对应的ref为null，要去掉
    this.initEdges(this.state.edges);
  }

  clearAll = () => {
    this.state.rjsp.reset();
    this.setState({nodes:[]});
  }

  render(){
    return (
      <div className="right-area" ref="right">
        <div  className="demo">
          <Button type="primary" onClick={this.saveDatas}>保存</Button>
          <Button type="primary" onClick={this.clearAll}>清除</Button>
        </div>
        <Modal
          visible={this.state.dialogVisible}
          onCancel={this.hideModal}
          footer={[
            <Button key="back" onClick={this.hideModal}>取消</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确定
            </Button>
          ]}>
          <Input placeholder="Basic usage" />
        </Modal>
        {this.state.nodes.map((node,index)=>{
         return(
          <div
            key={index}
            className={'node '+node.className}
            id={node.id}
            ref={nodes=>this.refs.nodes[index]=nodes}
            style={node.style}
            onClick={this.activeElem}
          >
            {node.text}
            <div className="delete-btn" onClick={event=>this.deleteNode(event,node)}>X</div>
          </div>
          )
        })}
      </div>
    );
  }
}

