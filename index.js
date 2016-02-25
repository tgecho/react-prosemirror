import React from 'react'
import {ProseMirror} from 'prosemirror'

export default React.createClass({
	displayName: 'ProseMirror',
	propTypes: {
		options: React.PropTypes.object,
		defaultValue: React.PropTypes.any,
		value: React.PropTypes.any,
		onChange: React.PropTypes.func,
		valueLink: React.PropTypes.shape({
			value: React.PropTypes.any,
			requestChange: React.PropTypes.func,
		}),
	},
	render() {
		return React.createElement('div', {ref: 'pm'})
	},
	componentWillUpdate(props) {
		if ('value' in props || 'valueLink' in props) {
			const value = props.value ||
				('valueLink' in props && props.valueLink.value) ||
				''

			if (value !== this._lastValue) {
				this.pm.setContent(value, props.options.docFormat)
				this._lastValue = value
			}
		}
	},
	componentWillMount() {
		this._lastValue = this.props.value
		if (this._lastValue === undefined && 'valueLink' in this.props) {
			this._lastValue = this.props.valueLink.value
		}
		if (this._lastValue === undefined) {
			this._lastValue = this.props.defaultValue
		}

		const options = Object.assign({doc: this._lastValue}, this.props.options)
		if (options.doc === undefined || options.doc === null) {
			// We could fall back to an empty string, but that wouldn't work for the json
			// docFormat. Setting docFormat to null allows ProseMirror to use its own
			// default empty document.
			options.doc = null
			options.docFormat = null
		}
		this.pm = new ProseMirror(options)
	},
	componentDidMount() {
		this.refs.pm.appendChild(this.pm.wrapper)
		this.pm.on('change', () => {
			const callback = this.props.onChange ||
				'valueLink' in this.props && this.props.valueLink.requestChange

			if (callback) {
				this._lastValue = this.pm.getContent(this.props.options.docFormat)
				callback(this._lastValue)
			}
		})
	},
	componentDidUpdate({options: previous}) {
		const current = this.props.options
		Object.keys(current).forEach(k => {
			if (current[k] !== previous[k]) {
				try {
					this.pm.setOption(k, current[k])
				} catch(e) {
					console.error(e)
					console.warn(`Are you creating "${k}" in your render function? If so it will fail the strict equality check.`)
				}
			}
		})
	},
	getContent(type = this.props.options.docFormat) {
		return this.pm.getContent(type)
	},
})

