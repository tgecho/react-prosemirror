import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import ProseMirror from 'react-prosemirror'
import 'prosemirror/dist/inputrules/autoinput'
import 'prosemirror/dist/menu/menubar'
import 'prosemirror/dist/menu/tooltipmenu'
import 'prosemirror/dist/menu/menu'
import 'prosemirror/dist/markdown'


const Demo = React.createClass({
	getInitialState() {
		return {
			options: {
				menuBar: true,
				tooltipMenu: true,
				autoInput: true,
				docFormat: 'html',
			},
			output: `<h2>Hello World!</h2><p>This is an editor.</p>`,
		}
	},
	render() {
		const {options, output} = this.state
		return (
			<table className="demo"><tbody>
				<tr>
					<th>Options</th>
					<td className="options">
						<label>
							<input type="checkbox" checkedLink={this.optionLink('menuBar')} />
							menuBar
						</label>
						<label>
							<input type="checkbox" checkedLink={this.optionLink('tooltipMenu')} />
							tooltipMenu
						</label>
						<label>
							<input type="checkbox" checkedLink={this.optionLink('autoInput')} />
							autoInput
						</label>
						<select valueLink={this.optionLink('docFormat')}>
							{['html', 'text', 'markdown', 'json'].map(f =>
								<option value={f} key={f}>{f}</option>
							)}
						</select>
						<button onClick={() => this.replaceState(this.getInitialState())}>Reset</button>
					</td>
				</tr>
				<tr>
					<th>Editor</th>
					<td>
						<ProseMirror value={output} onChange={this.updateOutput} options={options} ref="pm" />
					</td>
				</tr>
				<tr>
					<th>Output</th>
					<td>
						<pre>{typeof output === 'string' ? output : JSON.stringify(output, null, 2)}</pre>
					</td>
				</tr>
				<tr>
					<th>Rendered</th>
					<td>
						<div dangerouslySetInnerHTML={{__html: this.state.html}} />
					</td>
				</tr>
			</tbody></table>
		)
	},
	optionLink(name) {
		const {options} = this.state
		return {
			value: options[name],
			requestChange: (value) => {
				this.setState({options: {...options, [name]: value}})
			}
		}
	},
	updateOutput(output) {
		const {docFormat} = this.state.options
		this.setState({
			output,
			html: docFormat === 'html' ? output : this.refs.pm.getContent('html')
		})
	},
	componentDidMount() {
		this.updateOutput(this.refs.pm.getContent())
		this.pm = this.refs.pm.pm
	},
	componentDidUpdate(_, prevState) {
		if (prevState.options.docFormat !== this.state.options.docFormat) {
			this.updateOutput(this.refs.pm.getContent())
		}
	},
})

window.component = ReactDOM.render(<Demo />, document.getElementById('demo'))
window.pm = window.component.pm
