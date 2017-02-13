import React, { Component} from 'react'
import {
  Horizontal,
  Negative,
  Float,
  Labels,
  Orientation
} from './sliders'
import Demo from './Demo'
import Codeblock from './Codeblock'

import horizontalExample from '!raw!./sliders/horizontal'
import negativeExample from '!raw!./sliders/negative'
import floatExample from '!raw!./sliders/float'
import labelsExample from '!raw!./sliders/labels'
import orientationExample from '!raw!./sliders/orientation'

class Examples extends Component {
  render () {
    return (
      <section className='block'>
        <h2>Examples</h2>
        <Demo title='Basic Slider'>
          <Horizontal />
          <Codeblock>
            {horizontalExample}
          </Codeblock>
        </Demo>
        <Demo title='Negative values (No Tooltip)'>
          <Negative />
          <Codeblock>
            {negativeExample}
          </Codeblock>
        </Demo>
        <Demo title='Floating point boundaries'>
          <Float />
          <Codeblock>
            {floatExample}
          </Codeblock>
        </Demo>
        <Demo title='Custom labels &amp; Formatting'>
          <Labels />
          <Codeblock>
            {labelsExample}
          </Codeblock>
        </Demo>
        <Demo title='Orientation &amp; Custom Styles'>
          <Orientation />
          <Codeblock>
            {orientationExample}
          </Codeblock>
        </Demo>
      </section>
    )
  }
}

export default Examples
