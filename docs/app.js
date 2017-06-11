import React from 'react'
import Header from './components/Header'
import Features from './components/Features'
import Usage from './components/Usage'
import Install from './components/Install'
import Examples from './components/Examples'
import Footer from './components/Footer'
import '../src/rangeslider.less'
import './app.less'

function App () {
  return (
    <div className='wrapper'>
      <header>
        <Header />
      </header>
      <section>
        <Features />
        <Install />
        <Usage />
        <Examples />
        <Footer />
      </section>
    </div>
  )
}

export default App
