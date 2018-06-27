import { shallow } from 'enzyme'
import * as React from 'react'

import App from './App'

describe('App', () => {
  const wrapper = shallow(<App />)

  it('renders', () => {
    expect(wrapper.length).toBe(1)
  })
})