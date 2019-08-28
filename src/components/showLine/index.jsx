import React from 'react';
import ShowItem from './showItem';
import './index.less';

const episodeNum = 20;
let dataList = ['敖丙','哪吒','敖丙','哪吒','敖丙','哪吒','敖丙'];

dataList = dataList.map(dataName=>{
  let showList = [];
  for(let i=0; i< episodeNum; i++){
    let show = Math.floor(Math.random()*10+1)> 5 ? true : false;
    showList.push(show);
  }
  return {
    name: dataName,
    list: showList
  }
});

console.log(dataList);

const STATUS_READY = 1 // 图片渲染完成,可以开始滑动

export default class Container  extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        status: STATUS_READY,
        isMovable: false,
        startX: 0,
        contentLeft: 0,
        hoverIndex: -1
      }
  }

  onMoveStart = e => {
    console.log(e.clientX);
    if (this.state.status !== STATUS_READY) {
        return
    }

    // 记录滑动开始时的绝对坐标x
    this.setState({ isMovable: true })
  }

  onMoving = e => {
    if (this.state.status !== STATUS_READY || !this.state.isMovable) {
        return
    }
    console.log(e.clientX);
    const distance = e.clientX -100 - this.state.startX;
    let currX = distance;
    let contentWidth = dataList[0].list.length * 50 + 20 -30;
    let contentLeft = ( currX / 400) * contentWidth;
    this.contentRef.scrollLeft = contentLeft;
    this.setState({ currX, contentLeft })
  }

  onMoveEnd = e => {
    this.setState({ isMovable: false });
  }

  handleHover = (index) => {
    this.setState({ hoverIndex: index});
  }

  handleHoverLeave = () => {
    this.setState({ hoverIndex: -1});
  }

  render() {
      const { currX, hoverIndex } = this.state;
      const epsodeList = dataList[0].list.map((item,index)=>{return '第'+(index+1)+'集'});
      return (
        <div className="showline-page">
          <div className="line-name-wrap">
            { dataList.map((dataItem)=>{
              return (
                  <div className="name-title">{dataItem.name}</div>
              )
            })}
          </div>
          <div className="line-content-wrap" ref={node=>this.contentRef=node}>
            { dataList.map((dataItem, lineIndex)=>{
              let sList = dataItem.list;
              return (
                <div className={`line-item-wrap ${hoverIndex==lineIndex ? 'active': ''}` }>
                <span className="cell" />
                { sList.map((curShow,index)=>{
                  let showClass = '';
                  if(!curShow){
                    showClass = 'show-nothing';
                  }else{
                    showClass = sList[index+1] ? 'show-line' : 'show-dot';
                  }
                  return <ShowItem showClass={showClass} dataIndex={lineIndex} onHover={ this.handleHover } onHoverLeave={ this.handleHoverLeave } />
                }) }
                </div>
              )
          })}
           <div className="epsode-wrap">
            <span className="epsode-item" />
              {epsodeList.map(epItem=>{
                return <span className="epsode-item">{epItem}</span>
              })}
            </div>
          </div>

          <div className="tool-bar-wrap" onMouseMove={this.onMoving} onMouseLeave={this.onMoveEnd} >
            <div className="bar"
             ref={node=>this.barRef=node}
             onMouseDown={this.onMoveStart}
             onMouseUp={this.onMoveEnd}
             style={{ left: currX + 'px' }}
             />
          </div>
        </div>
      );
  }
}
