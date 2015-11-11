# react-prosemirror
A [React](https://facebook.github.io/react/) component for [ProseMirror](http://prosemirror.net/).

- [Demo](https://tgecho.github.io/react-prosemirror)
- [Kudos](http://marijnhaverbeke.nl/)
- [Author](http://un.deter.red)

## Hello World

```
import ProseMirror from 'react-prosemirror'

const Hello = React.createClass({
  getInitialState() {
    return {value: 'Hello World!'}
  },
  render() {
    return <ProseMirror value={value} onChange={callback} />
  },
  onChange(value) {
    this.setState({value})
  }
})
```

## Installation

Until published to NPM, you can clone this repo or run:
```
npm install git+git@github.com:tgecho/react-prosemirror.git
```

react-prosemirror and ProseMirror are both written in ES6, so you'll need some sort of transpiler such as [Babel](https://babeljs.io/) (bug reports/pull requests for other transpilers are welcome!). In Webpack, it's typical to make Babel ignore `node_modules` to improve performance using a loader definition such as:

```
{test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
```

To enable Babel for both libraries, you can add another loader like the following:
```
{test: /\.jsx?$/, include: /prosemirror/, loader: 'babel'},
```

## Usage

The intent is to provide an API compatible with standard React form elements. react-prosemirror supports `defaultValue`, `value` and `onChange` props as well as `valueLink`. It additionally supports an `options` prop which is passed directly to the ProseMirror constructor.

The ProseMirror instance is stored on the component instance as `pm`. You can gain access to it by putting a `ref` prop on the component.

```
render() {
  return <ProseMirror value={value} onChange={callback} ref="editor" />
},
someFunc(posA, posB) {
  this.refs.editor.pm.setSelection(posA, posB)
}
```

Finally, instances have a `getContent` method which defaults to the selected `docFormat`.

### Options

react-prosemirror simply passes options into ProseMirror. It will not automatically load other modules. For example, if you wish to use the `menubar` option or `markdown` format, you'll need to import those modules in addition to adding the appropriate options.

```
import 'prosemirror/src/parse/markdown'
import 'prosemirror/src/serialize/markdown'
import 'prosemirror/src/menu/menubar'
```

### Formats

`options.docFormat` is used to determine the type of value returned to the `onChange` callback as well as what is expected to be in the `value` prop.

react-prosemirror will attempt to control the component in the spirit of standard React form elements (see: [Why Controlled Components?](https://facebook.github.io/react/docs/forms.html#why-controlled-components)). To avoid thrashing ProseMirror, it will only call `setContent` when the new value is not strictly equal (`===`) to the last value pulled from ProseMirror. This should work for most cases, but be aware that if you're using a complex type such as `json`.

## Project Status

I would consider this library largely complete within its scope, though clearly not proven in a production setting. I'm open to refinements, especially around the interaction of `docFormat` and controlled values.

I will track ProseMirror API changes as appropriate, including when they begin publishing to NPM.
