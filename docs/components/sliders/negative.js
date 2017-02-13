import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class Negative extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: -10
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
          min={-20}
          max={0}
          tooltip={false}
          value={value}
          onChange={this.handleChange}
        />
        <div className='value'>{value}</div>
      </div>
    )
  }
}

export default Negative
