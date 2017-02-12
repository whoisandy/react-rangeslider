import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class VerticalCustomLabels extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      value: 50
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
      10: 'getting started',
      50: 'half way',
      90: 'almost done'
    }

    return (
      <div className='vertical-slider'>
        <h4>Custom Labels</h4>
        <Slider
          value={value}
          orientation='vertical'
          onChange={this.handleChange}
          labels={labels} />
        <div className='value'>Value: {value}</div>
        <hr />
      </div>
    )
  }
}

export default VerticalCustomLabels
