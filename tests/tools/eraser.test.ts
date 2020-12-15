import { eraser } from '../../src/modules/Tools/tools/eraser'

const canvas = document.createElement('canvas')
const cx = canvas.getContext('2d')!

const spyClearRect = jest.spyOn(cx, 'clearRect')

beforeEach(() => spyClearRect.mockClear())

test('Eraser: Initialization', () => {
  expect(typeof eraser.name).toBe('string')
  expect(eraser.element).toBeInstanceOf(HTMLButtonElement)
  expect(typeof eraser.method).toBe('function')
})

test('Eraser: Single Point', () => {
  // Called with no cords
  eraser.method!(cx, [])

  expect(spyClearRect).toBeCalledTimes(0)

  //Actual first point
  eraser.method!(cx, [{ x: 10, y: 9 }])

  expect(spyClearRect).nthCalledWith(1, 10, 9, 1, 1)
  // cx.clearRect(x: 10, y: 10, width: 1, height: 1)

  // Second point
  eraser.method!(cx, [{ x: 2, y: 3 }])

  expect(spyClearRect).nthCalledWith(2, 2, 3, 1, 1)
  // cx.clearRect(x: 2, y: 3, width: 1, height: 1)

  // 2 ponts, 2 calls
  expect(spyClearRect).toBeCalledTimes(2)
})

test('Eraser: Line', () => {
  eraser.method!(cx, [
    { x: 0, y: 0 },
    { x: 8, y: 8 },
  ])

  expect(spyClearRect).toBeCalledTimes(9)
  expect(spyClearRect).nthCalledWith(1, 0, 0, 1, 1)
  expect(spyClearRect).nthCalledWith(9, 8, 8, 1, 1)
})
