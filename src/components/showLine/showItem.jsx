import React from 'react';
import Tooltip from '../../common/Tooltip';

export default class Container  extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount(){
    Tooltip.setOptions({
      tooltipId: 'show-item-tooltip'
    });
    Tooltip.init(this.showRef);
  }

 
  render() {
     const { showClass, dataIndex } = this.props;
     const popContent = 'ssdssd';
      return (
        <span
          ref={node=>this.showRef=node} 
          className={`${showClass} cell`}
          data-tooltip data-title={ popContent }
          onMouseOver={this.props.onHover.bind(this, dataIndex)}
          onMouseLeave={this.props.onHoverLeave}
        />
      );
  }
}
