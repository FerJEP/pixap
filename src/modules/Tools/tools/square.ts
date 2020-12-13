import { lineAlgo } from '../../../scripts/lineAlgo'
import { Tool, ToolMethod } from './Tool'

const squareElement = Tool.createElement('bx-bx-rectangle')
const squareMethod: ToolMethod = (cx, points) => {
  if (points.length === 1) {
    const point = points[0]

    cx.fillRect(point.x, point.y, 1, 1)
  } else if (points.length > 1) {
    const firstPoint = points[0]
    const currentPoint = points[points.length - 1]

    const width = currentPoint.x - firstPoint.x
    const height = currentPoint.y - firstPoint.y

    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height)

    if (width === 0) {
      // if It's a vertical line
      lineAlgo(
        firstPoint.x,
        firstPoint.y,
        firstPoint.x,
        currentPoint.y,
        (x, y) => {
          cx.fillRect(x, y, 1, 1)
        }
      )
    } else if (height === 0) {
      // if It's a horizontal line
      lineAlgo(
        firstPoint.x,
        firstPoint.y,
        currentPoint.x,
        firstPoint.y,
        (x, y) => {
          cx.fillRect(x, y, 1, 1)
        }
      )
    } else {
      // else, it's finally a square
      cx.strokeRect(firstPoint.x + 0.5, firstPoint.y + 0.5, width, height)
      // +0.5 because of some problems with how pixels are drawn.
      // Basically, it is to avoid "antialiasing"
    }
  }
}
export const square = new Tool('square', squareElement, squareMethod, 's')
