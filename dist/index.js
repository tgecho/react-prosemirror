'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _edit = require('prosemirror/dist/edit');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({
	displayName: '.',

	propTypes: {
		options: _react2.default.PropTypes.object,
		defaultValue: _react2.default.PropTypes.any,
		value: _react2.default.PropTypes.any,
		onChange: _react2.default.PropTypes.func,
		valueLink: _react2.default.PropTypes.shape({
			value: _react2.default.PropTypes.any.isRequired,
			requestChange: _react2.default.PropTypes.func.isRequired
		})
	},
	render: function render() {
		return _react2.default.createElement('div', { ref: 'pm' });
	},
	componentWillUpdate: function componentWillUpdate(props) {
		if ('value' in props || 'valueLink' in props) {
			var value = props.value || 'valueLink' in props && props.valueLink.value;

			if (value !== this._lastValue) {
				this.pm.setContent(value, props.options.docFormat);
			}
		}
	},
	componentWillMount: function componentWillMount() {
		this._lastValue = this.props.value || 'valueLink' in this.props && this.props.valueLink.value || this.props.defaultValue;

		this.pm = new _edit.ProseMirror(Object.assign({ doc: this._lastValue }, this.props.options));
	},
	componentDidMount: function componentDidMount() {
		var _this = this;

		this.refs.pm.appendChild(this.pm.wrapper);
		this.pm.on('change', function () {
			var callback = _this.props.onChange || 'valueLink' in _this.props && _this.props.valueLink.requestChange;

			if (callback) {
				_this._lastValue = _this.pm.getContent(_this.props.options.docFormat);
				callback(_this._lastValue);
			}
		});
	},
	componentDidUpdate: function componentDidUpdate(_ref) {
		var _this2 = this;

		var previous = _ref.options;

		var current = this.props.options;
		Object.keys(current).forEach(function (k) {
			if (current[k] !== previous[k]) {
				_this2.pm.setOption(k, current[k]);
			}
		});
	},
	getContent: function getContent() {
		var type = arguments.length <= 0 || arguments[0] === undefined ? this.props.options.docFormat : arguments[0];

		return this.pm.getContent(type);
	}
});