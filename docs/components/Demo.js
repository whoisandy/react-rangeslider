import cx from 'classnames'
import React, { Component } from 'react'

class Demo extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      source: false
    }
  }

  handleToggle = (e) => {
    e.preventDefault()
    this.setState({
      source: !this.state.source
    })
  }

  render () {
    const { source } = this.state
    const { title, children } = this.props
    const className = cx('demo-panel-content', { 'source': source })
    return (
      <div className='demo-panel'>
        <div className='demo-panel-title'>
          <h4>{title}</h4>
          <a onClick={this.handleToggle} href='#'>View source</a>
        </div>
        <div className={className}>
          {children}
        </div>
      </div>
    )
  }
}

export default Demo
