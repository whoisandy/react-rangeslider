import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'

function render () {
  const mount = document.getElementById('mount')
  ReactDOM.render(<App />, mount)
}

render()
