import cx from 'classnames'
import React, { Component } from 'react'

class Demo extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      source: false
    }
  }

  handleToggle = e => {
    e.preventDefault()
    this.setState({
      source: !this.state.source
    })
  };

  render () {
    const { source } = this.state
    const { title, children } = this.props
    const className = cx('demo-panel-content', { source: source })
    return (
      <div className='demo-panel'>
        <div className='demo-panel-title'>
          <h4>{title}</h4>
          <a id='source' onClick={this.handleToggle} href='#'>
            View Source
          </a>
          <a id='codesandbox' onClick={this.handleToggle} href='#'>
            Code Sandbox
          </a>
        </div>
        <div className={className}>
          {children}
        </div>
      </div>
    )
  }
}

export default Demo
