/* eslint no-debugger: "warn" */
import cx from 'classnames'
import React, { PropTypes, Component } from 'react'
import { capitalize, clamp } from './utils'

/**
 * Predefined constants
 * @type {Object}
 */
const constants = {
  orientation: {
    horizontal: {
      dimension: 'width',
      direction: 'left',
      reverseDirection: 'right',
      coordinate: 'x'
    },
    vertical: {
      dimension: 'height',
      direction: 'top',
      reverseDirection: 'bottom',
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
    tooltip: PropTypes.bool,
    reverse: PropTypes.bool,
    labels: PropTypes.object,
    format: PropTypes.func,
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func
  }

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    orientation: 'horizontal',
    tooltip: true,
    reverse: false,
    labels: {}
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      limit: 0,
      grab: 0
    }
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleUpdate)
    this.handleUpdate()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleUpdate)
  }

  /**
   * Prevent default event and bubbling
   * @param  {Object} e - Event object
   * @return {void}
   */
  handleNoop = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  /**
   * Format label/tooltip value
   * @param  {Number} - value
   * @return {Formatted Number}
   */
  handleFormat = (value) => {
    const { format } = this.props
    return format ? format(value) : value
  }

  /**
   * Update slider state on change
   * @return {void}
   */
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

  /**
   * Attach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleStart = () => {
    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('mouseup', this.handleEnd)
  }

  /**
   * Handle drag/mousemove event
   * @param  {Object} e - Event object
   * @return {void}
   */
  handleDrag = (e) => {
    this.handleNoop(e)
    const { onChange } = this.props
    const { target } = e
    if (!onChange) return

    let value = this.position(e)
    if (target.classList.contains('rangeslider__label') && target.dataset.value) {
      value = parseFloat(target.dataset.value)
    }

    // const value = target.classList.contains('rangeslider__label') ? 10 : this.position(e)
    onChange && onChange(value, e)
  }

  /**
   * Detach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleEnd = (e) => {
    const { onChangeComplete } = this.props
    onChangeComplete && onChangeComplete(e)
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleEnd)
  }

  /**
   * Calculate position of slider based on its value
   * @param  {number} value - Current value of slider
   * @return {position} pos - Calculated position of slider based on value
   */
  getPositionFromValue = (value) => {
    const { limit } = this.state
    const { min, max } = this.props
    const diffMaxMin = max - min
    const diffValMin = value - min
    const percentage = diffValMin / diffMaxMin
    const pos = Math.round(percentage * limit)

    return pos
  }

  /**
   * Translate position of slider to slider value
   * @param  {number} pos - Current position/coordinates of slider
   * @return {number} value - Slider value
   */
  getValueFromPosition = (pos) => {
    let value = null
    const { limit } = this.state
    const {orientation, min, max, step} = this.props
    const percentage = (clamp(pos, 0, limit) / (limit || 1))
    const baseVal = step * Math.round(percentage * (max - min) / step)

    if (orientation === 'horizontal') {
      value = baseVal + min
    } else {
      value = max - baseVal
    }

    if (value >= max) value = max
    if (value <= min) value = min

    return value
  }

  /**
   * Calculate position of slider based on value
   * @param  {Object} e - Event object
   * @return {number} value - Slider value
   */
  position = (e) => {
    const { grab } = this.state
    const { orientation, reverse } = this.props

    const node = this.slider
    const coordinateStyle = constants.orientation[orientation].coordinate
    const directionStyle = reverse ? constants.orientation[orientation].reverseDirection : constants.orientation[orientation].direction
    const clientCoordinateStyle = `client${capitalize(coordinateStyle)}`
    const coordinate = !e.touches ? e[clientCoordinateStyle] : e.touches[0][clientCoordinateStyle]
    const direction = node.getBoundingClientRect()[directionStyle]
    const pos = reverse ? direction - coordinate - grab : coordinate - direction - grab
    const value = this.getValueFromPosition(pos)

    return value
  }

  /**
   * Grab coordinates of slider
   * @param  {Object} pos - Position object
   * @return {Object} - Slider fill/handle coordinates
   */
  coordinates = (pos) => {
    let fillPos = null
    const { limit, grab } = this.state
    const { orientation } = this.props
    // const dimension = constants.orientation[orientation].dimension
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

    // if (this.handle && orientation === 'vertical') {
    //   labelPos = handlePos
    //   labelPos = handlePos - (this.handle.getBoundingClientRect()[dimension] * 0.75)
    // } else {
    //   labelPos = handlePos
    // }

    return {
      fill: fillPos,
      handle: handlePos,
      label: handlePos
    }
  }

  render () {
    const { value, orientation, className, tooltip, reverse } = this.props
    const dimension = constants.orientation[orientation].dimension
    const direction = reverse ? constants.orientation[orientation].reverseDirection : constants.orientation[orientation].direction
    const position = this.getPositionFromValue(value)
    const coords = this.coordinates(position)
    const fillStyle = {[dimension]: `${coords.fill}px`}
    const handleStyle = {[direction]: `${coords.handle}px`}
    let labels = null
    let labelKeys = Object.keys(this.props.labels)

    if (labelKeys.length > 0) {
      let items = []

      labelKeys = labelKeys.sort((a, b) => reverse ? a - b : b - a)

      for (let key of labelKeys) {
        const labelPosition = this.getPositionFromValue(key)
        const labelCoords = this.coordinates(labelPosition)
        const labelStyle = {[direction]: `${labelCoords.label}px`}
        items.push((
          <li
            key={key}
            className={cx('rangeslider__label')}
            data-value={key}
            onMouseDown={this.handleDrag}
            onTouchStart={this.handleDrag}
            onTouchEnd={this.handleEnd}
            style={labelStyle}>
            {this.props.labels[key] }
          </li>
        ))
      }

      labels = (
        <ul
          ref={(sl) => { this.labels = sl }}
          className={cx('rangeslider__label-list')}>
          {items}
        </ul>
      )
    }

    return (
      <div
        ref={(s) => { this.slider = s }}
        className={cx('rangeslider', `rangeslider-${orientation}`, {'rangeslider-reverse': reverse}, className)}
        onMouseDown={this.handleDrag}
        onMouseUp={this.handleEnd}
        onTouchStart={this.handleDrag}
        onTouchEnd={this.handleEnd}>
        <div
          className='rangeslider__fill'
          style={fillStyle}
        />
        <div
          ref={(sh) => { this.handle = sh }}
          className='rangeslider__handle'
          onMouseDown={this.handleStart}
          onTouchMove={this.handleDrag}
          onTouchEnd={this.handleEnd}
          style={handleStyle}
        >
          {
            tooltip && (
              <div ref={(st) => { this.tooltip = st }} className='rangeslider__tooltip' >
                <span>{this.handleFormat(value)}</span>
              </div>
            )
          }
        </div>
        {labels}
      </div>
    )
  }
}

export default Slider
