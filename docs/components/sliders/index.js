import React from 'react'
import Horizontal from './horizontal'
import HorizontalCustomLabels from './horizontal-custom-labels'
import Negative from './negative'
import Float from './float'
import Vertical from './vertical'
import VerticalCustomLabels from './vertical-custom-labels'
import VerticalReversed from './vertical-reversed'

function Sliders () {
  return (
    <section id='examples'>
      <Horizontal />
      <HorizontalCustomLabels />
      <Negative />
      <Float />
      <Vertical />
      <VerticalCustomLabels />
      <VerticalReversed />
    </section>
  )
}

export default Sliders
