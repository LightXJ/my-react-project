import React, { Component } from 'react';
import { Radio } from 'antd';

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
    return (
      <div>
        <EnhanceComponent aProps="a" wrapRef={node=>this.node=node} />
        <Radio.Group onChange={this.onChange} value={1}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
      </div>
    )
  }
}
