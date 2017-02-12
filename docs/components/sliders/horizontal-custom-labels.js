import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class HorizontalCustomLabels extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 10
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  render () {
    const { value } = this.state
    const labels = {
      0: 'Low',
      50: 'Medium',
      100: 'High'
    }

    return (
      <div className='horizontal-slider'>
        <h4>Basic Slider with Custom Labels</h4>
        <Slider
          min={0}
          max={100}
          value={value}
          onChange={this.handleChange}
          labels={labels} />
        <div className='value'>Value: {value}</div>
        <hr />
      </div>
    )
  }
}

export default HorizontalCustomLabels
