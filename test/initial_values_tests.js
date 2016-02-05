import 'babel-polyfill'

import React from 'react'
import RTest from 'react-addons-test-utils'

import ProseMirror from '../index'
import 'prosemirror/dist/markdown'


function pmForProps(props={}) {
	/*
	Renders the ProseMirror component with the props you pass it and returns the
	generated instance of the ProseMirror editor for inspection.

	Example:
		const pm = pmForProps()
		pm.getContent('html')
	*/
	return RTest.renderIntoDocument(<ProseMirror {...props} />).pm
}

function testValues(pm, values) {
	/*
	Assert that the content of the ProseMirror editor matches with your
	expectations across one or more formats.

	Example:
		testValues(pm, {text: 'Hello World!'})
	*/
	for (const key in values) {
		expect(pm.getContent(key)).toEqual(values[key])
	}
}

function valueProps(value) {
	/*
	Return variations on value for each way to set the initial value of the
	ProseMirror component.
	*/
	return [
		{value: value},
		{valueLink: {value: value, requestChange(){}}},
		{defaultValue: value},
	]
}


;['text', 'markdown', 'html'].forEach(inputFormat => {

	/*
	Checking to ensure blank/undefined values all end up resulting in a empty document.
	*/

	;['', undefined, null].forEach(value => {
		valueProps(value).forEach(valueProps => {

			const pmProps = {
				...valueProps,
				options: {docFormat: inputFormat},
			}

			it(`Blank value: ${JSON.stringify(pmProps)}`, () => {
				const pm = pmForProps(pmProps)
				testValues(pm, {
					'text': '',
					'markdown': '',
					'html': '<p></p>',
					'json': {type: 'doc', content:[{type: 'paragraph'}]},
				})
			})
		})
	})

	/*
	Checking to ensure blank/undefined values all end up resulting in a empty document.
	*/

	;['a string'].forEach(value => {
		valueProps(value).forEach(valueProps => {

			const pmProps = {
				...valueProps,
				options: {docFormat: inputFormat},
			}

			it(`String value: ${JSON.stringify(pmProps)}`, () => {
				const pm = pmForProps(pmProps)
				testValues(pm, {
					'text': `${value}`,
					'markdown': `${value}`,
					'html': `<p>${value}</p>`,
					'json': {type: 'doc', content:[{type: 'paragraph', content: [{type: 'text', text: value.toString()}]}]},
				})
			})
		})
	})
})

/*
Invalid values will be passed into ProseMirror and may result in an error.
*/

;['text', 'markdown'].forEach(inputFormat => {

	;[0, 1].forEach(value => {
		valueProps(value).forEach(valueProps => {

			const pmProps = {
				...valueProps,
				options: {docFormat: inputFormat},
			}

			it(`Invalid value: ${JSON.stringify(pmProps)}`, () => {
				expect(() => pmForProps(pmProps)).toThrow()
			})
		})
	})
})

/*
It just so happens that the html format coerces to a string, so things like
numbers will work.
*/
;[0, 1].forEach(value => {
	valueProps(value).forEach(valueProps => {

		const pmProps = {
			...valueProps,
			options: {docFormat: 'html'},
		}

		it(`Invalid value: ${JSON.stringify(pmProps)}`, () => {
			const pm = pmForProps(pmProps)
			testValues(pm, {
				'text': `${value}`,
				'markdown': `${value}`,
				'html': `<p>${value}</p>`,
				'json': {type: 'doc', content:[{type: 'paragraph', content: [{type: 'text', text: value.toString()}]}]},
			})
		})
	})
})
