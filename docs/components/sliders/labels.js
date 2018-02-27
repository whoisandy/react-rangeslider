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

  handleChangeHorizontal = value => {
    this.setState({
      horizontal: value
    })
  };

  handleChangeVertical = value => {
    this.setState({
      vertical: value
    })
  };

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
      90: 'Almost done',
      100: 'Complete!'
    }

    const horizontalLabelStyles = {
      0: {
        color: 'green'
      },
      50: {
        color: 'blue'
      },
      100: {
        color: 'red'
      }
    }

    const verticalLabelStyles = {
      10: {
        textTransform: 'uppercase'
      },
      50: {
        color: vertical > 50 ? 'cyan' : 'yellow'
      },
      100: {
        color: 'red'
      }
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
          labelStyles={horizontalLabelStyles}
          format={formatkg}
          handleLabel={horizontal}
          onChange={this.handleChangeHorizontal}
        />
        <div className='value'>{formatkg(horizontal)}</div>
        <hr />
        <Slider
          value={vertical}
          orientation='vertical'
          labels={verticalLabels}
          labelStyles={verticalLabelStyles}
          handleLabel={vertical}
          format={formatPc}

          onChange={this.handleChangeVertical}
        />
        <div className='value'>{formatPc(vertical)}</div>
      </div>
    )
  }
}

export default HorizontalCustomLabels
