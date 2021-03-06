import { shallow } from 'enzyme'
import * as jsc from 'jsverify'
import * as React from 'react'

import { none, some } from 'fp-ts/lib/Option'
import { generators } from '~utils'
import { Image, mapStateToProps } from './Image'

describe('Image', () => {
  const wrapper = shallow(<Image baseUrl={none} secureBaseUrl={none} path={none} />)

  it('renders', () => {
    expect(wrapper.length).toBe(1)
  })

  describe('mapStateToProps', () => {
    it('surfaces baseUrl and secureBaseUrl', () => {
      jsc.assertForall(generators.appState, appState => {
        expect(mapStateToProps(appState).baseUrl).toBeDefined()
        expect(mapStateToProps(appState).secureBaseUrl).toBeDefined()

        return true
      })
    })
  })

  describe('if missing the path', () => {
    it('does not render an image', () => {
      wrapper.setProps({
        baseUrl: some('http://bloo.com/'),
        secureBaseUrl: some('https://bloo.com/'),
        path: none,
      })

      expect(wrapper.find('img').length).toBe(0)
    })
  })

  describe('if missing the base URL', () => {
    it('does not render an image', () => {
      wrapper.setProps({
        baseUrl: none,
        secureBaseUrl: none,
        path: some('blob.jpg'),
      })

      expect(wrapper.find('img').length).toBe(0)
    })
  })

  describe('if both the path and the base are present', () => {
    describe('and the protocol is https:', () => {
      it('renders the image with the correct source', () => {
        wrapper.setProps({
          baseUrl: some('http://bloo.com/'),
          secureBaseUrl: some('https://bloo.com/'),
          path: some('blob.jpg'),
          protocol: 'https:',
        })

        const image = wrapper.find('img')

        expect(image.length).toBe(1)
        expect(image.props().src).toEqual('https://bloo.com/original/blob.jpg')
      })
    })

    describe('and the protocol is not https:', () => {
      it('renders the image with the correct source', () => {
        wrapper.setProps({
          baseUrl: some('http://bloo.com/'),
          secureBaseUrl: some('https://bloo.com/'),
          path: some('blob.jpg'),
          protocol: 'potato:',
        })

        const image = wrapper.find('img')

        expect(image.length).toBe(1)
        expect(image.props().src).toEqual('http://bloo.com/original/blob.jpg')
      })
    })
  })
})
