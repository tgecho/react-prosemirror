import React from 'react'
import ProseMirror from 'react-prosemirror'
import 'prosemirror/src/convert/to_markdown'
import 'prosemirror/src/inputrules/autoinput'
import 'prosemirror/src/menu/inlinemenu'
import 'prosemirror/src/menu/buttonmenu'
import 'prosemirror/src/menu/menubar'


const Demo = React.createClass({
	getInitialState() {
		return {
			options: {
				docFormat: 'html',
				autoInput: true,
				menuBar: true,
				inlineMenu: false,
				buttonMenu: false,
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
							<input type="checkbox" checkedLink={this.optionLink('autoInput')} />
							autoInput
						</label>
						<label>
							<input type="checkbox" checkedLink={this.optionLink('inlineMenu')} />
							inlineMenu
						</label>
						<label>
							<input type="checkbox" checkedLink={this.optionLink('buttonMenu')} />
							buttonMenu
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
	},
	componentDidUpdate(_, prevState) {
		if (prevState.options.docFormat !== this.state.options.docFormat) {
			this.updateOutput(this.refs.pm.getContent())
		}
	},
})

React.render(<Demo />, document.getElementById('demo'))
