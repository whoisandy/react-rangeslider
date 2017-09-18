import React, { Component } from 'react'
import Codeblock from './Codeblock'

class Usage extends Component {
  render () {
    const text = `// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider'

// To include the default styles
import 'react-rangeslider/lib/index.css'

// Not using an ES6 transpiler
var Slider = require('react-rangeslider')
`

    const umdJs = `<script src="https://unpkg.com/react-rangeslider/umd/rangeslider.min.js"></script>`
    const umdCss = `<link rel="stylesheet" href="https://unpkg.com/react-rangeslider/umd/rangeslider.min.css" />`

    return (
      <section className='block'>
        <h2>Usage</h2>
        <p>
          React-Rangeslider is bundled with a single slider component. By default, basic styles are applied, but can be overridden depending on your design requirements.
        </p>
        <p>
          With a module bundler like webpack that supports either CommonJS or ES2015 modules, use as you would anything else:
        </p>
        <Codeblock>
          {text}
        </Codeblock>
        <p>
          The UMD build is also available on
          {' '}
          <a href='https://unpkg.com/react-rangeslider/umd/ReactRangeslider.min.js'>
            unpkg:
          </a>
        </p>
        <Codeblock>
          {umdJs}
        </Codeblock>
        <p>
          You can find the library on
          {' '}
          <code>window.ReactRangeslider</code>
          . Optionally you can drop in the default styles by adding the stylesheet.
        </p>
        <Codeblock>
          {umdCss}
        </Codeblock>
      </section>
    )
  }
}

export default Usage
