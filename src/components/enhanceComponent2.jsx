import React, { Component } from 'react';


// 反向继承
const HOC = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            const elementsTree = super.render();
            let newProps = {};
            if (elementsTree && elementsTree.type === 'input') {
                newProps = {value: 'may the force be with you'};
            }
            const props = Object.assign({}, elementsTree.props, newProps);
            const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children);
            return newElementsTree;
    }
}
class WrappedComponent extends Component{
    render(){
        return(
            <input value={'Hello World'} />
        )
    }
}
export default HOC(WrappedComponent)