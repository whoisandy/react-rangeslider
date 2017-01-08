import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class Horizontal extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 10,
      valueEnd: 0
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  handleChangeEnd = (value) => {
    console.log(value)
    this.setState({
      valueEnd: value
    })
  }

  render () {
    const { value, valueEnd } = this.state
    return (
      <div className='horizontal-slider'>
        <h4>Basic Slider</h4>
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={this.handleChange}
          onChangeEnd={this.handleChangeEnd}
        />
        <div className='value'>Value: {value}</div>
        <div className='value'>ValueEnd: {valueEnd}</div>
        <hr />
      </div>
    )
  }
}

export default Horizontal
