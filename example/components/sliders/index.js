import React from 'react'
import Horizontal from './horizontal'
import Negative from './negative'
import Float from './float'
import Vertical from './vertical'
import VerticalReversed from './vertical-reversed'

function Sliders () {
  return (
    <section id='examples'>
      <Horizontal />
      <Negative />
      <Float />
      <Vertical />
      <VerticalReversed />
    </section>
  )
}

export default Sliders
