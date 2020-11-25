import { circleAlgo } from '../../src/scripts/circleAlgo'
import { r3Points, r10Points } from '../circlePoints'

test('Circle Algorihtm: 0 radius', () => {
  const point: Array<number[]> = []
  circleAlgo(0, 0, 0, (x, y) => {
    point.push([x, y])
  })
  expect(point).toHaveLength(1)
  expect(point[0]).toEqual([0, 0])
})

test('Circle Algorihtm: 3 radius', () => {
  const points: Array<number[]> = []
  circleAlgo(0, 0, 3, (x, y) => {
    points.push([x, y])
  })
  expect(points).toHaveLength(r3Points.length)
  expect(points).toEqual(r3Points)
})

test.only('Circle Algorihtm: 10 radius', () => {
  const points: Array<number[]> = []
  circleAlgo(0, 0, 10, (x, y) => {
    points.push([x, y])
  })
  expect(points).toHaveLength(r10Points.length)
  expect(points).toEqual(r10Points)
})
