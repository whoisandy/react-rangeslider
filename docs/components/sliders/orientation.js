import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class Vertical extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 25,
      reverseValue: 8
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  handleChangeReverse = (value) => {
    this.setState({
      reverseValue: value
    })
  }

  render () {
    const { value, reverseValue } = this.state
    return (
      <div className='slider orientation-reversed'>
        <div className='slider-group'>
          <div className='slider-vertical'>
            <Slider
              min={0}
              max={100}
              value={value}
              orientation='vertical'
              onChange={this.handleChange}
            />
            <div className='value'>{value}</div>
          </div>
          <div className='slider-horizontal'>
            <Slider
              min={0}
              max={10}
              value={reverseValue}
              orientation='horizontal'
              onChange={this.handleChangeReverse}
            />
            <div className='value'>{reverseValue}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Vertical
