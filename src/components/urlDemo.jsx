import React from 'react';

export default class Container  extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          num: Math.random() * 100
      };
      console.log('父组件 constructor')
  }

  setLifeCycleState() {
      this.refs.rLifeCycle.setTheState();
  }

  forceLifeCycleUpdate() {
      this.refs.rLifeCycle.forceItUpdate();
  }

  unmountLifeCycle() {
      // 这里卸载父组件也会导致卸载子组件
      
  }

  parentForceUpdate() {
      this.forceUpdate();
  }
  
  changeUrl = () => {
    this.props.history.replace('/urlDemo?a=22', { tabAction: 'replaceTab' });
  }

  render() {
      console.log('父组件render');
      return (
          <div onClick={this.changeUrl} style={{fontSize:14}}>
            切换链接参数
          </div>
      );
  }
}
