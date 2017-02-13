import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class Float extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 12.5
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  render () {
    const { value } = this.state
    return (
      <div className='slider'>
        <Slider
          min={10}
          max={20}
          step={0.5}
          value={value}
          onChange={this.handleChange}
        />
        <div className='value'>{value}</div>
      </div>
    )
  }
}

export default Float
