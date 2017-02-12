import React from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Sliders from './components/sliders'
import './app.less'

function App () {
  return (
    <div className='wrapper'>
      <Header />
      <Sliders />
      <Footer />
    </div>
  )
}

export default App
