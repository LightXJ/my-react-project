import React from 'react';
import {Modal,Input,Button} from 'antd';
import { jsPlumb } from 'jsplumb';

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
    info: null,
    rjsp: jsPlumb.getInstance({
      ConnectionOverlays: [
      ['Arrow', { location: 1, id: 'arrow', width: 11, length: 11 }],
      ['Label', { location: 0.3, id: 'label', cssClass: 'jsp-label', events: {dblclick: this.editLabelText} }]
      ]
    })
  }
  componentDidMount() {
    this.init();
  }
  componentWillMount = () => {

  }
  hideModal = () => {
    this.setState({modalVisible:false});
  }

  init = () => {
    this.props.jsp.droppable(this.refs.right, { drop: this.jspDrop })
    this.state.rjsp.bind('beforeDrop', this.jspBeforeDrop)
    this._fetchData()
  }

  _fetchData () {
    console.log('sdsd');
  }

  jspBeforeDrop = (info) => {
    console.log(info)
    info.targetId = info.dropEndpoint.elementId
    let connections = this.rjsp.getConnections({ source: info.sourceId, target: info.targetId })
    if (info.targetId === info.sourceId) {
      return
    } else {
      if (connections.length === 0) {  // 检察是否已经建立过连接
        this.setState({info});
        this.openDialog('输入新建连接的文本')
      } else {
        this.editLabelText(connections[0].getOverlay('label'))
      }
    }
  }

  jspDrop = (info) =>{
    this.setState({info});
    console.log('输入新建节点的文本');
  }

  render() {
    return (
      <div className="right-area" ref="right">
        <div  className="demo">
          <Button type="primary" onClick={this.saveDatas}>保存</Button>
          <Button type="primary" onClick={this.clearAll}>清除</Button>
          <Button type="primary" onClick={this.reload}>重现</Button>
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
      </div>
    );
  }
}

