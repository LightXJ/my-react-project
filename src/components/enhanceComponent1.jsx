import React, { Component } from 'react';

// 属性代理
class WrappedComponent extends Component {
  componentDidMount(){
    console.log(this.node)
    console.log('被包裹组件 didMount');
  }
  render(){
    return (
      <div ref={this.props.wrapRef}>我是普通组件</div>
    )
  }
}

function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}

function ehance( WrappedComponent ){
  return class HOC extends Component {
    componentDidMount(){
      console.log('包裹组件 didMount');
    }
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`
    render(){
      return (
        <div>
          <div>我是高阶组件新增的</div>
          <WrappedComponent {...this.props}/>
        </div>
      )
    }
  }
}


const EnhanceComponent = ehance( WrappedComponent );

export default class MyEnhanceComponent extends Component {
  render(){
    return <EnhanceComponent aProps="a" wrapRef={node=>this.node=node} />
  }
}
