/* eslint no-debugger: "warn" */
import cx from 'classnames'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ResizeObserver from 'resize-observer-polyfill'
import { capitalize, clamp, isObject } from './utils'

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
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        start: PropTypes.number,
        end: PropTypes.number
      })
    ]),
    orientation: PropTypes.string,
    tooltip: PropTypes.bool,
    reverse: PropTypes.bool,
    labels: PropTypes.object,
    handleLabel: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        start: PropTypes.string,
        end: PropTypes.string
      })
    ]),
    format: PropTypes.func,
    onChangeStart: PropTypes.func,
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
    mode: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    value: 0,
    orientation: 'horizontal',
    tooltip: true,
    reverse: false,
    labels: {},
    handleLabel: '',
    mode: 'single'
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      active: false,
      limit: 0,
      grab: 0,
      activeEl: 'end'
    }
  }

  componentDidMount () {
    this.handleUpdate()
    const resizeObserver = new ResizeObserver(this.handleUpdate)
    resizeObserver.observe(this.slider)
  }

  /**
   * Format label/tooltip value
   * @param  {Number} - value
   * @return {Formatted Number}
   */
  handleFormat = value => {
    const { format } = this.props
    return format ? format(value) : value
  }

  /**
   * Update slider state on change
   * @return {void}
   */
  handleUpdate = () => {
    if (!this.slider) {
      // for shallow rendering
      return
    }
    const { orientation } = this.props
    const dimension = capitalize(constants.orientation[orientation].dimension)
    const sliderPos = this.slider[`offset${dimension}`]
    const handlePos = this.end[`offset${dimension}`]
    this.setState({
      limit: sliderPos - handlePos,
      grab: handlePos / 2
    })
  }

  /**
   * Attach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleStart = e => {
    e.stopPropagation()
    const { onChangeStart } = this.props
    document.addEventListener('mousemove', this.handleDrag)
    document.addEventListener('mouseup', this.handleEnd)
    this.setState(
      {
        active: true,
        activeEl: document.activeElement === this.start ? 'start' : 'end'
      },
      () => {
        onChangeStart && onChangeStart(e)
      }
    )
  }

  /**
   * Handle drag/mousemove event
   * @param  {Object} e - Event object
   * @return {void}
   */
  handleDrag = e => {
    e.stopPropagation()
    const { onChange } = this.props
    const { target: { className, classList, dataset } } = e
    if (!onChange || className === 'rangeslider__labels') return

    let sliderValue = this.position(e)

    if (
      classList &&
      classList.contains('rangeslider__label-item') &&
      dataset.value
    ) {
      sliderValue = parseFloat(dataset.value)
    }

    this.updateValue(sliderValue, e)
  }

  /**
   * Detach event listeners to mousemove/mouseup events
   * @return {void}
   */
  handleEnd = e => {
    e.stopPropagation()
    const { onChangeComplete } = this.props
    this.setState(
      {
        active: false
      },
      () => {
        onChangeComplete && onChangeComplete(e)
      }
    )
    document.removeEventListener('mousemove', this.handleDrag)
    document.removeEventListener('mouseup', this.handleEnd)
  }

  /**
   * Support for key events on the slider handle
   * @param  {Object} e - Event object
   * @return {void}
   */
  handleKeyDown = e => {
    e.preventDefault()
    const { keyCode } = e
    const { value, min, max, step } = this.props
    const changedValue =
      value.start || value.end ? value[this.state.activeEl] : value
    let sliderValue

    switch (keyCode) {
      case 38:
      case 39:
        sliderValue = changedValue + step > max ? max : changedValue + step
        this.updateValue(sliderValue, e)
        break
      case 37:
      case 40:
        sliderValue = changedValue - step < min ? min : changedValue - step
        this.updateValue(sliderValue, e)
        break
    }
  }

  updateValue = (sliderValue, e) => {
    const { onChange, mode, min, max, value } = this.props
    if (mode === 'single') {
      onChange && onChange(sliderValue, e)
    } else {
      const isHandlerClicked =
        document.activeElement === this.start ||
        document.activeElement === this.end
      const values = activeEl => ({
        start:
          activeEl === 'start'
            ? clamp(sliderValue, min, value.end)
            : value.start,
        end:
          activeEl === 'end'
            ? clamp(sliderValue, value.start, max)
            : value.end
      })
      this.setState(
        {
          activeEl: isHandlerClicked
            ? document.activeElement === this.start ? 'start' : 'end'
            : this.state.activeEl
        },
        () => {
          onChange && onChange(values(this.state.activeEl), e)
        }
      )
    }
  }

  /**
   * Calculate position of slider based on its value
   * @param  {number} value - Current value of slider, might be a single number or object
   * @return {position} pos - Calculated position of slider based on value
   */
  getPositionFromValue = value => {
    const { limit } = this.state
    const { min, max } = this.props
    const diffMaxMin = max - min
    const calcPos = val => Math.round((val - min) / diffMaxMin * limit)
    return isObject(value)
      ? {
        start: clamp(calcPos(value.start), min, calcPos(value.end)),
        end: clamp(calcPos(value.end), calcPos(value.start), limit)
      }
      : calcPos(value)
  }

  /**
   * Translate position of slider to slider value
   * @param  {number} or {object} pos - Current position/coordinates of slider
   * @return {number} or {object} value - Slider value
   */
  getValueFromPosition = pos => {
    const { limit } = this.state
    const { orientation, min, max, step } = this.props
    const calcBaseVal = position =>
      step *
      Math.round(clamp(position, 0, limit) / (limit || 1) * (max - min) / step)
    const calcValue = base =>
      clamp(orientation === 'horizontal' ? base + min : max - base, min, max)
    return isObject(pos)
      ? {
        start: clamp(
            calcValue(calcBaseVal(pos.start)),
            min,
            calcValue(calcBaseVal(pos.end))
          ),
        end: clamp(
            calcValue(calcBaseVal(pos.end)),
            calcValue(calcBaseVal(pos.start)),
            max
          )
      }
      : calcValue(calcBaseVal(pos))
  }

  /**
   * Calculate position of slider based on value
   * @param  {Object} e - Event object
   * @return {number} value - Slider value
   */
  position = e => {
    const { grab } = this.state
    const { orientation, reverse } = this.props

    const node = this.slider
    const coordinateStyle = constants.orientation[orientation].coordinate
    const directionStyle = reverse
      ? constants.orientation[orientation].reverseDirection
      : constants.orientation[orientation].direction
    const clientCoordinateStyle = `client${capitalize(coordinateStyle)}`
    const coordinate = !e.touches
      ? e[clientCoordinateStyle]
      : e.touches[0][clientCoordinateStyle]
    const direction = node.getBoundingClientRect()[directionStyle]
    const pos = reverse
      ? direction - coordinate - grab
      : coordinate - direction - grab
    const value = this.getValueFromPosition(pos)

    return value
  }

  /**
   * Grab coordinates of slider
   * @param  pos - Position object or a single number
   * @return {Object} - Slider fill/handle coordinates
   */
  coordinates = pos => {
    const { limit, grab } = this.state
    const { orientation, min } = this.props
    const value = this.getValueFromPosition(pos)
    const position = this.getPositionFromValue(value)
    const calcHandlePos = val =>
      orientation === 'horizontal' ? val + grab : val
    const calcFillPos = val =>
      orientation === 'horizontal' ? val : limit - val
    // N.B. the lable value is only calculated when the param is number, as it takes array key
    if (isObject(pos)) {
      const startHandlePos = calcHandlePos(position.start)
      const endHandlePos = calcHandlePos(position.end)
      return {
        fill: [
          Math.abs(endHandlePos - startHandlePos),
          clamp(startHandlePos, min, endHandlePos)
        ],
        handle: {
          start: clamp(startHandlePos, min, endHandlePos),
          end: clamp(endHandlePos, startHandlePos, limit + 2 * grab)
        }
      }
    }
    return {
      fill: [calcFillPos(calcHandlePos(position))],
      handle: calcHandlePos(position),
      label: calcHandlePos(position)
    }
  }

  renderLabels = labels => (
    <ul
      ref={sl => {
        this.labels = sl
      }}
      className={cx('rangeslider__labels')}
    >
      {labels}
    </ul>
  )

  renderHandler = (value, refString, handleStyle, showTooltip, handleLabel) => (
    <div
      ref={sh => {
        this[refString] = sh
      }}
      key={refString}
      tabIndex={0}
      role='button'
      className='rangeslider__handle'
      onMouseDown={this.handleStart}
      onMouseUp={this.handleEnd}
      onTouchMove={this.handleDrag}
      onTouchEnd={this.handleEnd}
      onKeyDown={this.handleKeyDown}
      onKeyUp={this.handleEnd}
      style={{...handleStyle,
        ...{zIndex: `${this.state.activeEl === refString ? 1 : 0}`}}}
    >
      {showTooltip[refString] ? (
        <div
          ref={st => {
            this.tooltip = st
          }}
          className='rangeslider__handle-tooltip'
        >
          <span>{this.handleFormat(value)}</span>
        </div>
      ) : null}
      <div className='rangeslider__handle-label'>{handleLabel[refString]}</div>
    </div>
  )

  renderDoubleHandler = (value, handleStyle, showTooltip, handleLabel) => [
    this.renderHandler(
      value.start,
      'start',
      handleStyle.start,
      showTooltip,
      handleLabel
    ),
    this.renderHandler(
      value.end,
      'end',
      handleStyle.end,
      showTooltip,
      handleLabel
    )
  ]

  render () {
    const {
      value,
      orientation,
      className,
      tooltip,
      reverse,
      labels,
      min,
      max,
      handleLabel,
      mode
    } = this.props
    const { active, activeEl } = this.state
    const dimension = constants.orientation[orientation].dimension
    const direction = reverse
      ? constants.orientation[orientation].reverseDirection
      : constants.orientation[orientation].direction
    const position = this.getPositionFromValue(value)
    const coords = this.coordinates(position)
    const fillStyle = {
      [dimension]: `${coords.fill[0]}px`,
      [direction]: `${coords.fill[1] || 0}px`
    }
    const handleStyle =
      mode === 'single'
        ? { [direction]: `${coords.handle}px` }
        : {
          start: { [direction]: `${coords.handle.start}px` },
          end: { [direction]: `${coords.handle.end}px` }
        }

    let showTooltip = {
      start: tooltip && active && activeEl === 'start',
      end: tooltip && active && activeEl === 'end'
    }

    let labelItems = []
    let labelKeys = Object.keys(labels)

    if (labelKeys.length > 0) {
      labelKeys = labelKeys.sort((a, b) => (reverse ? a - b : b - a))

      for (let key of labelKeys) {
        const labelPosition = this.getPositionFromValue(Number(key))
        const labelCoords = this.coordinates(labelPosition)
        const labelStyle = { [direction]: `${labelCoords.label}px` }

        labelItems.push(
          <li
            key={key}
            className={cx('rangeslider__label-item')}
            data-value={key}
            onMouseDown={this.handleDrag}
            onTouchStart={this.handleStart}
            onTouchEnd={this.handleEnd}
            style={labelStyle}
          >
            {this.props.labels[key]}
          </li>
        )
      }
    }

    return (
      <div
        ref={s => {
          this.slider = s
        }}
        className={cx(
          'rangeslider',
          `rangeslider-${orientation}`,
          { 'rangeslider-reverse': reverse },
          className
        )}
        onMouseDown={this.handleDrag}
        onMouseUp={this.handleEnd}
        onTouchStart={this.handleStart}
        onTouchEnd={this.handleEnd}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-orientation={orientation}
      >
        <div className='rangeslider__fill' style={fillStyle} />
        {mode === 'single'
          ? this.renderHandler(
              value,
              'end',
              handleStyle,
              showTooltip.end,
              handleLabel
            )
          : this.renderDoubleHandler(
              value,
              handleStyle,
              showTooltip,
              handleLabel
            )}
        {labels ? this.renderLabels(labelItems) : null}
      </div>
    )
  }
}

export default Slider
