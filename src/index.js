import cx from 'classnames'
import React, { PropTypes, Component } from 'react'

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

function maxmin (pos, min, max) {
  if (pos < min) { return min }
  if (pos > max) { return max }
  return pos
}

const constants = {
  orientation: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      coordinate: 'x'
    },
    vertical: {
      dimension: 'height',
      direction: 'top',
      coordinate: 'y'
    }
  }
}

class Slider extends Component {
  static propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    value: PropTypes.number,
    orientation: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    orientation: 'horizontal'
  }

  state = {
    limit: 0,
    grab: 0
  }

  // Add window resize event listener here
  componentDidMount () {
    window.addEventListener('resize', this.handleUpdate)
    this.handleUpdate()
  }

  // remove window resize event listener here
  componentWillUnmount () {
    window.removeEventListener('resize', this.handleUpdate)
  }

  handleUpdate = () => {
    const { orientation } = this.props
    const dimension = capitalize(constants.orientation[orientation].dimension)
    const sliderPos = this.slider[`offset${dimension}`]
    const handlePos = this.handle[`offset${dimension}`]
    this.setState({
      limit: sliderPos - handlePos,
      grab: handlePos / 2
    })
  }

  handleStart = () => {
    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('mouseup', this.handleEnd)
  }

  handleDrag = (e) => {
    this.handleNoop(e)
    const { onChange } = this.props
    if (!onChange) return

    const value = this.position(e)
    onChange && onChange(value)
  }

  handleEnd = () => {
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleEnd)
  }

  handleNoop = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  getPositionFromValue = (value) => {
    const { limit } = this.state
    const { min, max } = this.props
    const diffMaxMin = max - min
    const diffValMin = value - min
    const percentage = diffValMin / diffMaxMin
    const pos = Math.round(percentage * limit)

    return pos
  }

  getValueFromPosition = (pos) => {
    let value = null
    const { limit } = this.state
    const { orientation, min, max, step } = this.props
    const percentage = (maxmin(pos, 0, limit) / (limit || 1))
    const diffMaxMin = max - min
    const diffMaxMinStepQuo = diffMaxMin / step
    const profDiffMaxMinStepQuo = step * Math.round(percentage * diffMaxMinStepQuo)
    const sumProfDiffMaxMinStepQuo = profDiffMaxMinStepQuo + min

    if (orientation === 'horizontal') {
      value = sumProfDiffMaxMinStepQuo
    } else {
      value = max - sumProfDiffMaxMinStepQuo
    }
    if (value >= max) value = max
    if (value <= min) value = min

    return value
  }

  position = (e) => {
    const { grab } = this.state
    const { orientation } = this.props
    const node = this.slider
    const coordinateStyle = constants.orientation[orientation].coordinate
    const directionStyle = constants.orientation[orientation].direction
    const clientCoordinateStyle = `client${capitalize(coordinateStyle)}`
    const coordinate = !e.touches
      ? e[clientCoordinateStyle]
      : e.touches[0][clientCoordinateStyle]
    const direction = node.getBoundingClientRect()[directionStyle]

    const pos = coordinate - direction - grab
    const value = this.getValueFromPosition(pos)

    return value
  }

  coordinates = (pos) => {
    let fillPos = null
    const { limit, grab } = this.state
    const { orientation } = this.props
    const value = this.getValueFromPosition(pos)
    const handlePos = this.getPositionFromValue(value)
    const sumHandleposGrab = orientation === 'horizontal'
      ? handlePos + grab
      : handlePos

    if (orientation === 'horizontal') {
      fillPos = sumHandleposGrab
    } else {
      fillPos = limit - sumHandleposGrab
    }

    return {
      fill: fillPos,
      handle: handlePos
    }
  }

  render () {
    const { value, orientation, className } = this.props
    const dimension = constants.orientation[orientation].dimension
    const direction = constants.orientation[orientation].direction
    const position = this.getPositionFromValue(value)
    const coords = this.coordinates(position)
    const fillStyle = { [dimension]: `${coords.fill}px` }
    const handleStyle = { [direction]: `${coords.handle}px` }

    return (
      <div
        ref={(s) => { this.slider = s }}
        className={cx('rangeslider ', `rangeslider-${orientation}`, className)}
        onMouseDown={this.handleDrag}
        onTouchEnd={this.handleNoop}
      >
        <div
          className='rangeslider__fill'
          style={fillStyle}
        />
        <div
          ref={(sh) => { this.handle = sh }}
          className='rangeslider__handle'
          onMouseDown={this.handleStart}
          onTouchEnd={this.handleNoop}
          onTouchMove={this.handleDrag}
          style={handleStyle}
        />
      </div>
    )
  }
}

export default Slider
