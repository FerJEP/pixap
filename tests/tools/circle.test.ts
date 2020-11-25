import { circle } from '../../src/modules/Tools/tools/circle'
import { r10Points, r3Points } from '../circlePoints'

const canvas = document.createElement('canvas')
const cx = canvas.getContext('2d')!

const spyFillRect = jest.spyOn(cx, 'fillRect')

beforeEach(() => spyFillRect.mockClear())

test('Circle:  Initialization', () => {
  expect(circle.name).toBe('circle')
  expect(circle.element).toBeInstanceOf(HTMLButtonElement)
  expect(typeof circle.method).toBe('function')
})

test('Circle: Single point', () => {
  // Called with no cords
  circle.method!(cx, { down: null })
  expect(spyFillRect).toBeCalledTimes(0)

  // Just a click
  circle.method!(cx, { down: { x: 0, y: 0 } })
  expect(spyFillRect).toBeCalledTimes(1)
  expect(spyFillRect).nthCalledWith(1, 0, 0, 1, 1)

  // Another click
  circle.method!(cx, { down: { x: 7, y: 8 } })
  expect(spyFillRect).toBeCalledTimes(2)
  expect(spyFillRect).nthCalledWith(2, 7, 8, 1, 1)
})

test('Circle: 3 radius', () => {
  circle.method!(cx, {
    down: { x: 0, y: 0 },
    move: { lastX: 0, lastY: 0, currentX: 3, currentY: 0 },
  })

  expect(spyFillRect).toBeCalledTimes(r3Points.length)
  expect(spyFillRect.mock.calls).toEqual(
    r3Points.map(point => point.concat(1, 1))
  )
})

test('Circle: 10 radius', () => {
  circle.method!(cx, {
    down: { x: 0, y: 0 },
    move: { lastX: 0, lastY: 0, currentX: 10, currentY: 0 },
  })

  expect(spyFillRect).toBeCalledTimes(r10Points.length)
  expect(spyFillRect.mock.calls).toEqual(
    r10Points.map(point => point.concat(1, 1))
  )
})
