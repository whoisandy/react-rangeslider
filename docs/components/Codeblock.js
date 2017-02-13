import React, { Component } from 'react'
import marked from 'marked'

class Codeblock extends Component {
  componentWillMount () {
    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code, lang) {
        return require('highlight.js').highlight(lang, code).value
      }
    })
  }

  render () {
    const text = `\`\`\`js
${this.props.children}
    \`\`\``

    return (
      <div className='code' dangerouslySetInnerHTML={{ __html: marked(text) }} />
    )
  }
}

export default Codeblock
