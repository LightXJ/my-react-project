import React from 'react';
import {jsPlumb} from 'jsplumb';
import LeftArea from './leftArea';
import RightArea from './rightArea';
import BottomArea from './bottomArea';

export default class JsPlumb extends React.Component {
  state = {
    jsp: '',
    pos: [0,0],
    initialized: false,
    datas: {}
  }
  componentDidMount = () => {
    jsPlumb.ready(() => {
      this.setState({jsp: jsPlumb.getInstance(), initialized:true});
    })
  }
  updatePositon = (pos) => {
    this.setState({pos});
  }
  saveDatas = (datas) => {
    this.setState({datas});
  }
  render() {
    const { jsp, pos, datas, initialized } = this.state;
    return (
      <div className="jsplumb-page">
       {initialized && (
         <div>
          <LeftArea jsp={jsp} updatepos={this.updatePositon} />
          <RightArea jsp={jsp} pos={pos} saveDatas={this.saveDatas}/>
         </div>
       )}
       <BottomArea  datas={datas}/>
      </div>
    );
  }
}

