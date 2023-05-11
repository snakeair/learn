// 类组件
import React, { Component } from 'react'
import { Button } from 'antd'

type Props = {
  title: string
}

type State = {
  count: number,
  headerDom: Object
}

export default class headerDom extends Component<Props, State> {

  State={
    count: 0,
    headerDom: {
      width:'100%', 
      minWidth: '760px',
      padding:'20px',
      borderBottom:'1px solid gray'
    }
  }
  clickCountFn = () => {
    this.setState({count: this.State.count++});
  }
  

  render() {
    return (
      <div style={this.State.headerDom}>
        <Button onClick={this.clickCountFn} >click</Button>
        <div   >{this.props.title}</div>
      </div>
    )
  }
}