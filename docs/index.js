import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import App from './app'

function render () {
  const mount = document.getElementById('mount')
  ReactGA.initialize('UA-100351333-1')
  ReactGA.ga('send', 'pageview', '/')
  ReactDOM.render(<App />, mount)
}

render()
