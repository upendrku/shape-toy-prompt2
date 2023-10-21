/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'

import { App } from '../App'

describe('app', () => {
  it('should render a canvas', () => {
    expect.assertions(1)

    render(<App />)

    const canvas = screen.getByRole('img', {
      name: /draw shapes here/i,
    })

    expect(canvas).toMatchInlineSnapshot(`
      <canvas
        aria-label="Draw shapes here"
        class="border-2 border-gray-600"
        height="500"
        role="img"
        width="500"
      />
    `)
  })

  it("render a 'Add Circle' button", () => {
    expect.assertions(1)

    render(<App />)

    const btn = screen.getByRole('button', { name: /add circle/i })

    expect(btn).toBeInTheDocument()
  })

  it("render a 'Add Rectangle' button", () => {
    expect.assertions(1)

    render(<App />)

    const btn = screen.getByRole('button', { name: /add rectangle/i })

    expect(btn).toBeInTheDocument()
  })

  describe('context suite', () => {
    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D

    beforeEach(function () {
      canvas = document.createElement('canvas')
      const c = canvas.getContext('2d')
      if (!c) throw new Error('context was not mocked')

      ctx = c
    })

    it("draw a circle on click of 'Add Circle' button", async () => {
      expect.assertions(1)

      const user = userEvent.setup()

      render(<App context={ctx} />)

      // added this clear events to clear the useLess call to clearRect on mount.
      //@ts-expect-error these methods on the mock dont exist on the real rendering context
      ctx.__clearEvents()

      await user.click(screen.getByRole('button', { name: /add circle/i }))

      //@ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: unknown[] = ctx.__getEvents()

      expect(events).toHaveLength(5)
    })

    it("draw a rectangle on click of 'Add Rectangle' button", async () => {
      expect.assertions(1)

      const user = userEvent.setup()

      render(<App context={ctx} />)

      // added this clear events to clear the useLess call to clearRect on mount.
      //@ts-expect-error these methods on the mock dont exist on the real rendering context
      ctx.__clearEvents()

      await user.click(screen.getByRole('button', { name: /add rectangle/i }))

      //@ts-expect-error these methods on the mock dont exist on the real rendering context
      const events: unknown[] = ctx.__getEvents()

      expect(events).toHaveLength(3)
    })
  })
})
