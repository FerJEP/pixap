import { lineAlgo } from '../../src/scripts/lineAlgo'

/*
  I tried to create a function for lineAlgo(), but i messed up.
*/

test('Line Algorithm: Single point', () => {
  const mock = jest.fn((x, y) => [x, y])
  const p = 5

  // First point
  lineAlgo(p, p, p, p, mock)
  expect(mock).nthCalledWith(1, p, p)

  // Second point
  lineAlgo(p, 6, p, 6, mock)
  expect(mock).nthCalledWith(2, p, 6)

  // Third point

  lineAlgo(6, p, 6, p, mock)
  expect(mock).nthCalledWith(3, 6, p)

  //Only 3 points, only 3 calls
  expect(mock).toBeCalledTimes(3)
})

test('Line Algorithm: X Straight Line', () => {
  const constY = 6
  const startX = 4
  const endX = 12
  const lineLenght = endX - startX + 1
  let count = 0

  // from startX to endX (forward)
  lineAlgo(startX, constY, endX, constY, (x, y) => {
    expect(x).toBe(startX + count)
    expect(y).toBe(constY)
    count++
  })

  expect(count).toBe(lineLenght)

  //Reseting the counter
  count = 0

  // from endX to startY (backward)
  lineAlgo(endX, constY, startX, constY, (x, y) => {
    expect(x).toBe(endX - count)
    expect(y).toBe(constY)
    count++
  })

  expect(count).toBe(lineLenght)
})

test('Line Algorithm: Y Straight Line', () => {
  const constX = 6
  const startY = 4
  const endY = 12
  const lineLenght = endY - startY + 1

  let count = 0

  // Remeber Y++ goes down, and Y-- goes up

  // from startX to endY (downward)
  lineAlgo(constX, startY, constX, endY, (x, y) => {
    expect(y).toBe(startY + count)
    expect(x).toBe(constX)
    count++
  })

  expect(count).toBe(lineLenght)

  //Resetting the counter
  count = 0

  // from endX to startY (upward)
  lineAlgo(constX, endY, constX, startY, (x, y) => {
    expect(y).toBe(endY - count)
    expect(x).toBe(constX)
    count++
  })

  expect(count).toBe(lineLenght)
})

test('Line Algorithm: Diagonal \\', () => {
  const startX = 8
  const startY = 8
  const endX = 16
  const endY = 16
  const lineLenght = endX - startX + 1

  let count = 0

  //From top-left to bottom-right
  lineAlgo(startX, startY, endX, endY, (x, y) => {
    expect(x).toBe(startX + count)
    expect(y).toBe(startY + count)
    count++
  })

  expect(count).toBe(lineLenght)

  //Reseting counter
  count = 0

  // from bottom-right to top-left

  lineAlgo(endX, endY, startX, startY, (x, y) => {
    expect(x).toBe(endX - count)
    expect(y).toBe(endY - count)
    count++
  })

  expect(count).toBe(lineLenght)
})

test('Line Algorithm: Diagonal /', () => {
  const startX = 16
  const startY = 16
  const endX = 8
  const endY = 8
  const lineLenght = startX - endX + 1

  let count = 0

  //From top-left to bottom-right
  lineAlgo(startX, startY, endX, endY, (x, y) => {
    expect(x).toBe(startX - count)
    expect(y).toBe(startY - count)
    count++
  })

  expect(count).toBe(lineLenght)

  //Reseting count
  count = 0

  // from bottom-right to top-left
  lineAlgo(endX, endY, startX, startY, (x, y) => {
    expect(x).toBe(endX + count)
    expect(y).toBe(endY + count)
    count++
  })

  expect(count).toBe(lineLenght)
})
