'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint no-debugger: "warn" */


/**
 * Predefined constants
 * @type {Object}
 */
var constants = {
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
};

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props, context) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, props, context));

    _this.handleNoop = function (e) {
      e.stopPropagation();
      e.preventDefault();
    };

    _this.handleUpdate = function () {
      var orientation = _this.props.orientation;

      var dimension = (0, _utils.capitalize)(constants.orientation[orientation].dimension);
      var sliderPos = _this.slider['offset' + dimension];
      var handlePos = _this.handle['offset' + dimension];

      _this.setState({
        limit: sliderPos - handlePos,
        grab: handlePos / 2
      });
    };

    _this.handleStart = function () {
      document.addEventListener('mousemove', _this.handleDrag);
      document.addEventListener('mouseup', _this.handleEnd);
    };

    _this.handleDrag = function (e) {
      _this.handleNoop(e);
      var onChange = _this.props.onChange;
      var target = e.target;

      if (!onChange) return;

      var value = _this.position(e);
      if (target.classList.contains('rangeslider__label') && target.dataset.value) {
        value = target.dataset.value;
      }

      // const value = target.classList.contains('rangeslider__label') ? 10 : this.position(e)
      onChange && onChange(value);
    };

    _this.handleEnd = function () {
      document.removeEventListener('mousemove', _this.handleDrag);
      document.removeEventListener('mouseup', _this.handleEnd);
    };

    _this.getPositionFromValue = function (value) {
      var limit = _this.state.limit;
      var _this$props = _this.props;
      var min = _this$props.min;
      var max = _this$props.max;

      var diffMaxMin = max - min;
      var diffValMin = value - min;
      var percentage = diffValMin / diffMaxMin;
      var pos = Math.round(percentage * limit);

      return pos;
    };

    _this.getValueFromPosition = function (pos) {
      var value = null;
      var limit = _this.state.limit;
      var _this$props2 = _this.props;
      var orientation = _this$props2.orientation;
      var min = _this$props2.min;
      var max = _this$props2.max;
      var step = _this$props2.step;

      var percentage = (0, _utils.clamp)(pos, 0, limit) / (limit || 1);
      var baseVal = step * Math.round(percentage * (max - min) / step);

      if (orientation === 'horizontal') {
        value = baseVal + min;
      } else {
        value = max - baseVal;
      }

      if (value >= max) value = max;
      if (value <= min) value = min;

      return value;
    };

    _this.position = function (e) {
      var grab = _this.state.grab;
      var _this$props3 = _this.props;
      var orientation = _this$props3.orientation;
      var reverse = _this$props3.reverse;


      var node = _this.slider;
      var coordinateStyle = constants.orientation[orientation].coordinate;
      var directionStyle = reverse ? constants.orientation[orientation].reverseDirection : constants.orientation[orientation].direction;
      var clientCoordinateStyle = 'client' + (0, _utils.capitalize)(coordinateStyle);
      var coordinate = !e.touches ? e[clientCoordinateStyle] : e.touches[0][clientCoordinateStyle];
      var direction = node.getBoundingClientRect()[directionStyle];
      var pos = reverse ? direction - coordinate - grab : coordinate - direction - grab;
      var value = _this.getValueFromPosition(pos);

      return value;
    };

    _this.coordinates = function (pos) {
      var fillPos = null;
      var labelPos = null;
      var _this$state = _this.state;
      var limit = _this$state.limit;
      var grab = _this$state.grab;
      var orientation = _this.props.orientation;

      var dimension = constants.orientation[orientation].dimension;
      var value = _this.getValueFromPosition(pos);
      var handlePos = _this.getPositionFromValue(value);
      var sumHandleposGrab = orientation === 'horizontal' ? handlePos + grab : handlePos;

      if (orientation === 'horizontal') {
        fillPos = sumHandleposGrab;
      } else {
        fillPos = limit - sumHandleposGrab;
      }

      if (_this.handle && orientation === 'vertical') {
        labelPos = handlePos - _this.handle.getBoundingClientRect()[dimension] * 0.75;
      } else {
        labelPos = handlePos;
      }

      return {
        fill: fillPos,
        handle: handlePos,
        label: labelPos
      };
    };

    _this.state = {
      limit: 0,
      grab: 0
    };
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.handleUpdate);
      this.handleUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.handleUpdate);
    }

    /**
     * Prevent default event and bubbling
     * @param  {Object} e - Event object
     * @return {void}
     */


    /**
     * Update slider state on change
     * @return {void}
     */


    /**
     * Attach event listeners to mousemove/mouseup events
     * @return {void}
     */


    /**
     * Handle drag/mousemove event
     * @param  {Object} e - Event object
     * @return {void}
     */


    /**
     * Detach event listeners to mousemove/mouseup events
     * @return {void}
     */


    /**
     * Calculate position of slider based on its value
     * @param  {number} value - Current value of slider
     * @return {position} pos - Calculated position of slider based on value
     */


    /**
     * Translate position of slider to slider value
     * @param  {number} pos - Current position/coordinates of slider
     * @return {number} value - Slider value
     */


    /**
     * Calculate position of slider based on value
     * @param  {Object} e - Event object
     * @return {number} value - Slider value
     */


    /**
     * Grab coordinates of slider
     * @param  {Object} pos - Position object
     * @return {Object} - Slider fill/handle coordinates
     */

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var value = _props.value;
      var orientation = _props.orientation;
      var className = _props.className;
      var reverse = _props.reverse;

      var dimension = constants.orientation[orientation].dimension;
      var direction = reverse ? constants.orientation[orientation].reverseDirection : constants.orientation[orientation].direction;
      var position = this.getPositionFromValue(value);
      var coords = this.coordinates(position);
      var fillStyle = _defineProperty({}, dimension, coords.fill + 'px');
      var handleStyle = _defineProperty({}, direction, coords.handle + 'px');
      var labels = null;
      var labelKeys = Object.keys(this.props.labels);

      if (labelKeys.length > 0) {
        var items = [];

        labelKeys = labelKeys.sort(function (a, b) {
          return reverse ? a - b : b - a;
        });

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = labelKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            var labelPosition = this.getPositionFromValue(key);
            var labelCoords = this.coordinates(labelPosition);
            var labelStyle = _defineProperty({}, direction, labelCoords.label + 'px');
            items.push(_react2.default.createElement('li', {
              className: (0, _classnames2.default)('rangeslider__label'),
              'data-value': key,
              dangerouslySetInnerHTML: { __html: this.props.labels[key] },
              onMouseDown: this.handleDrag,
              onTouchStart: this.handleDrag,
              onTouchEnd: this.handleNoop,
              style: labelStyle }));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        labels = _react2.default.createElement(
          'ul',
          {
            ref: function ref(sl) {
              _this2.labels = sl;
            },
            className: (0, _classnames2.default)('rangeslider__label-list') },
          items
        );
      }

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(s) {
            _this2.slider = s;
          },
          className: (0, _classnames2.default)('rangeslider', 'rangeslider-' + orientation, { 'rangeslider-reverse': reverse }, className),
          onMouseDown: this.handleDrag,
          onTouchStart: this.handleDrag,
          onTouchEnd: this.handleNoop },
        _react2.default.createElement('div', {
          className: 'rangeslider__fill',
          style: fillStyle }),
        _react2.default.createElement('div', {
          ref: function ref(sh) {
            _this2.handle = sh;
          },
          className: 'rangeslider__handle',
          onMouseDown: this.handleStart,
          onTouchEnd: this.handleNoop,
          onTouchMove: this.handleDrag,
          style: handleStyle }),
        labels
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  min: _react.PropTypes.number,
  max: _react.PropTypes.number,
  step: _react.PropTypes.number,
  value: _react.PropTypes.number,
  orientation: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  className: _react.PropTypes.string,
  reverse: _react.PropTypes.bool,
  labels: _react.PropTypes.object
};
Slider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  orientation: 'horizontal',
  reverse: false,
  labels: {}
};
exports.default = Slider;