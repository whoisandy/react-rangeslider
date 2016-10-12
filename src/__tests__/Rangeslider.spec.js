import React from 'react'
import { shallow, mount } from 'enzyme'
import Slider from '../Rangeslider'

describe('Rangeslider specs', () => {
  it('should render properly', () => {
    const slider = shallow(<Slider />)
    expect(slider.hasClass('rangeslider')).toBeTruthy()
    expect(slider.children().length).toEqual(2)
    expect(slider.find('.rangeslider__fill').length).toEqual(1)
    expect(slider.find('.rangeslider__handle').length).toEqual(1)
  })

  it('should have default props', () => {
    const slider = mount(<Slider />)
    expect(slider.prop('min')).toEqual(0)
    expect(slider.prop('max')).toEqual(100)
    expect(slider.prop('step')).toEqual(1)
    expect(slider.prop('value')).toEqual(0)
    expect(slider.prop('orientation')).toEqual('horizontal')
    expect(slider.prop('reverse')).toEqual(false)
    expect(slider.prop('labels')).toEqual({})
  })
})
