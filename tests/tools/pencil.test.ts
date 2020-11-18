import { pencil } from '../../src/tools/pencil'

const canvas = document.createElement('canvas')
const cx = canvas.getContext('2d')!

const spyFillRect = jest.spyOn(cx, 'fillRect')

beforeEach(() => spyFillRect.mockClear())

test('Pencil: Initialization', () => {
  expect(typeof pencil.name).toBe('string')
  expect(pencil.element).toBeInstanceOf(HTMLButtonElement)
  expect(typeof pencil.method).toBe('function')
})

test('Pencil: Single Point', () => {
  //First point but draw
  pencil.method!(cx, { down: null })

  expect(spyFillRect).toBeCalledTimes(0)

  //Actual first point
  pencil.method!(cx, { down: { x: 10, y: 9 } })

  expect(spyFillRect).nthCalledWith(1, 10, 9, 1, 1)
  // cx.fillRect(x: 10, y: 10, width: 1, height: 1)

  // Second point
  pencil.method!(cx, {
    down: { x: 0, y: 0 },
    move: { lastX: 2, lastY: 3, currentX: 2, currentY: 3 },
  })

  expect(spyFillRect).nthCalledWith(2, 2, 3, 1, 1)
  // cx.fillRect(x: 2, y: 3, width: 1, height: 1)

  // 2 ponts, 2 calls
  expect(spyFillRect).toBeCalledTimes(2)
})

test('Pencil: Line', () => {
  const down = {
    x: 0,
    y: 0,
  }

  const move = {
    lastX: 0,
    lastY: 0,
    currentX: 8,
    currentY: 8,
  }

  pencil.method!(cx, { down, move })

  expect(spyFillRect).toBeCalledTimes(9)
  expect(spyFillRect).nthCalledWith(1, 0, 0, 1, 1)
  expect(spyFillRect).nthCalledWith(9, 8, 8, 1, 1)
})
