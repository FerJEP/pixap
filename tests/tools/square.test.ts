import { square } from '../../src/modules/Tools/tools/square'

const canvas = document.createElement('canvas')
const cx = canvas.getContext('2d')!

const spyStrokeRect = jest.spyOn(cx, 'strokeRect')
const spyFillRect = jest.spyOn(cx, 'fillRect')
const spyClearRect = jest.spyOn(cx, 'clearRect')

beforeEach(() => {
  spyStrokeRect.mockClear()
  spyFillRect.mockClear()
  spyClearRect.mockClear()
})

test('Square:  Initialization', () => {
  expect(square.name).toBe('square')
  expect(square.element).toBeInstanceOf(HTMLButtonElement)
  expect(typeof square.method).toBe('function')
})

test('Square: Single Point', () => {
  // Called with no cords
  square.method!(cx, [])
  expect(spyFillRect).toBeCalledTimes(0)

  // Just a click
  square.method!(cx, [{ x: 0, y: 0 }])
  expect(spyFillRect).toBeCalledTimes(1)
  expect(spyFillRect).nthCalledWith(1, 0, 0, 1, 1)
  // cx.fillRect(x: 1, y: 0, width: 1, height: 1)

  // Another click
  square.method!(cx, [{ x: 4, y: 7 }])
  expect(spyFillRect).toBeCalledTimes(2)
  expect(spyFillRect).nthCalledWith(2, 4, 7, 1, 1)

  // stokeRect and clearRect should not be called
  expect(spyStrokeRect).toBeCalledTimes(0)
  expect(spyClearRect).toBeCalledTimes(0)
})

test('Square: Same X Y axises', () => {
  // Same X axis
  square.method!(cx, [
    { x: 0, y: 0 },
    { x: 0, y: 4 },
  ])
  expect(spyFillRect).toBeCalledTimes(5)
  expect(spyClearRect).toBeCalledTimes(1)

  expect(spyFillRect).nthCalledWith(5, 0, 4, 1, 1)

  // Same Y axis
  square.method!(cx, [
    { x: 0, y: 0 },
    { x: 4, y: 0 },
  ])
  expect(spyFillRect).toBeCalledTimes(10)
  expect(spyClearRect).toBeCalledTimes(2)
  expect(spyFillRect).nthCalledWith(10, 4, 0, 1, 1)
})

test('Square: Drawing a square', () => {
  //Drawing a square
  square.method!(cx, [
    { x: 0, y: 0 },
    { x: 6, y: 6 },
  ])

  expect(spyStrokeRect).toBeCalledTimes(1)
  expect(spyClearRect).toBeCalledTimes(1)
  //See square code to "undestand" why 0.5
  expect(spyStrokeRect).nthCalledWith(1, 0.5, 0.5, 6, 6)

  // Drawing a rectangle
  square.method!(cx, [
    { x: 0, y: 0 },
    { x: 7, y: 3 },
  ])

  expect(spyStrokeRect).toBeCalledTimes(2)
  expect(spyClearRect).toBeCalledTimes(2)
  expect(spyStrokeRect).nthCalledWith(2, 0.5, 0.5, 7, 3)
})
