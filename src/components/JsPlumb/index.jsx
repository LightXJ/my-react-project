import React from 'react';
import {jsPlumb} from 'jsplumb';
import LeftArea from './leftArea';
import RightArea from './rightArea';

export default class JsPlumb extends React.Component {
  state = {
    jsp: '',
    pos: [0,0],
    initialized: false
  }
  componentDidMount = () => {
    jsPlumb.ready(() => {
      this.setState({jsp: jsPlumb.getInstance(), initialized:true});
    })
  }
  updatePositon = (pos) => {
    this.setState({pos});
  }
  render() {
    const { jsp, pos, initialized } = this.state;
    return (
      <div className="jsplumb-page">
       {initialized && (
         <div>
          <LeftArea jsp={jsp} updatepos={this.updatePositon} />
          <RightArea jsp={jsp} pos={pos}/>
         </div>
       )}
      </div>
    );
  }
}

