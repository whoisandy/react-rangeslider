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
      <div className='negative-slider'>
        <h4>Orientation &amp; Custom Styles</h4>
        <Slider
          min={-20}
          max={0}
          value={value}
          onChange={this.handleChange}
        />
        <div className='value'>Value: {value}</div>
        <hr />
      </div>
    )
  }
}

export default Negative
