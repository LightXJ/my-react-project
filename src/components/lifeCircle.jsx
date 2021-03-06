import React from 'react';
import './lifeCircle.less'
class LifeCycle extends React.Component {
    state = {
        proid:''
    }
  constructor(props) {
      super(props);
      console.log('子组件 constructor');
      this.state = {str: 'hello'};
  }

  componentWillMount() {
      console.log('子组件 componentWillMount');
  }

  componentDidMount() {
      console.log('子组件 componentDidMount');
    //   setTimeout(()=>{
    //       console.log('设置')
    //       this.setState({proid:'22'});
    //   },5000)
  }

  componentWillReceiveProps(nextProps) {
      if(JSON.stringify(this.props)==JSON.stringify(nextProps)){
         console.log('子组件props不变');
         return;
      }
      console.log('子组件 componentWillReceiveProps', nextProps);
  }

//   shouldComponentUpdate() {
//       console.log('子组件 shouldComponentUpdate');
//       return true;        // 记得要返回true
//   }

//   componentWillUpdate() {
//       console.log('子组件 componentWillUpdate');
//   }

  componentDidUpdate() {
      console.log('子组件 componentDidUpdate');
  }

  componentDidUpdate(){
      console.log('子组件 componentDidUpdate');
  }
//   componentWillUnmount() {
//       console.log('子组件 componentWillUnmount');
//   }

//   setTheState() {
//       let s = 'hello';
//       if (this.state.str === s) {
//           s = 'HELLO';
//       }
//       this.setState({
//           str: s
//       });
//   }

//   forceItUpdate() {
//       this.forceUpdate();
//   }

  render() {
      console.log('子组件 render');
      return(
          <div>
              <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={()=>{this.setState({b:Math.random()})}}>子组件组件stateChange b</a>
              <span>{'Props:'}<h2>{parseInt(this.props.num)}</h2></span>
              <br />
              <span>{'State:'}<h2>{this.state.str}</h2></span>
          </div>
      );
  }
}

export default class Container  extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          num: Math.random() * 100
      };
      console.log('父组件 constructor')
  }


//   componentWillMount() {
//       console.log('父组件 componentWillMount');
//   }

  componentDidMount() {
      console.log('父组件 componentDidMount');
  }

//   componentWillReceiveProps(nextProps) {
//       console.log('父组件 componentWillReceiveProps');
//   }

//   shouldComponentUpdate() {
//       console.log('父组件 shouldComponentUpdate');
//       return true;        // 记得要返回true
//   }

//   componentWillUpdate() {
//       console.log('父组件 componentWillUpdate');
//   }

//   componentDidUpdate() {
//       console.log('父组件 componentDidUpdate');
//   }

//   componentWillUnmount() {
//       console.log('父组件 componentWillUnmount');
//   }


  propsChange() {
      this.setState({
          num: Math.random() * 100
      });
  }

//   setLifeCycleState() {
//       this.refs.rLifeCycle.setTheState();
//   }

//   forceLifeCycleUpdate() {
//       this.refs.rLifeCycle.forceItUpdate();
//   }

//   unmountLifeCycle() {
//       // 这里卸载父组件也会导致卸载子组件
      
//   }

//   parentForceUpdate() {
//       this.forceUpdate();
//   }

  render() {
      console.log('父组件render');
      let { a } = this.state;
      return (
          <div className="lifecircle-wrap">
              <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.propsChange.bind(this)}>父组件stateChange num</a>
              <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={()=>this.setState({a:a++})}>父组件stateChange a</a>
              {/* <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.setLifeCycleState.bind(this)}>setState</a> */}
              {/* <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.forceLifeCycleUpdate.bind(this)}>forceUpdate</a> */}
              {/* <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.unmountLifeCycle.bind(this)}>unmount</a> */}
              {/* <a href="javascript:;" className="weui_btn weui_btn_primary" onClick={this.parentForceUpdate.bind(this)}>parentForceUpdateWithoutChange</a> */}
              <LifeCycle ref="rLifeCycle"></LifeCycle>
          </div>
      );
  }
}
