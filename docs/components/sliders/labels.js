import React, { Component } from 'react'
import Slider from 'react-rangeslider'

class HorizontalCustomLabels extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      horizontal: 10,
      vertical: 50
    }
  }

  handleChangeHorizontal = (value) => {
    this.setState({
      horizontal: value
    })
  }

  handleChangeVertical = (value) => {
    this.setState({
      vertical: value
    })
  }

  render () {
    const { horizontal, vertical } = this.state
    const horizontalLabels = {
      0: 'Low',
      50: 'Medium',
      100: 'High'
    }

    const verticalLabels = {
      10: 'Getting started',
      50: 'Half way',
      90: 'Almost done'
    }

    const formatkg = value => value + ' kg'
    const formatPc = p => p + '%'

    return (
      <div className='slider custom-labels'>
        <Slider
          min={0}
          max={100}
          value={horizontal}
          labels={horizontalLabels}
          format={formatkg}
          onChange={this.handleChangeHorizontal}
        />
        <div className='value'>{formatkg(horizontal)}</div>
        <hr />
        <Slider
          value={vertical}
          orientation='vertical'
          labels={verticalLabels}
          format={formatPc}
          onChange={this.handleChangeVertical}
        />
        <div className='value'>{formatPc(vertical)}</div>
      </div>
    )
  }
}

export default HorizontalCustomLabels
