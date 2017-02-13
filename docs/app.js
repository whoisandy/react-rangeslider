import React from 'react'
import Header from './components/Header'
import Features from './components/Features'
import Usage from './components/Usage'
import Install from './components/Install'
import Examples from './components/Examples'
import Footer from './components/Footer'
import 'react-rangeslider/lib/index.css'
import './app.less'

function App () {
  return (
    <div className='wrapper'>
      <Header />
      <Features />
      <Install />
      <Usage />
      <Examples />
      <Footer />
    </div>
  )
}

export default App
