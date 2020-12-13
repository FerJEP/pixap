import { lineAlgo } from '../../../scripts/lineAlgo'
import { Tool, ToolMethod } from './Tool'

// An eraser tool

const eraserElement = Tool.createElement('mdi-eraser') as HTMLButtonElement

const eraserMethod: ToolMethod = (cx, points) => {
  if (points.length === 1) {
    const point = points[0]

    cx.clearRect(point.x, point.y, 1, 1)
  } else if (points.length > 1) {
    const lastPoint = points[points.length - 2]
    const currentPoint = points[points.length - 1]

    lineAlgo(
      lastPoint.x,
      lastPoint.y,
      currentPoint.x,
      currentPoint.y,
      (x, y) => {
        cx.clearRect(x, y, 1, 1)
      }
    )
  }
}

export const eraser = new Tool('eraser', eraserElement, eraserMethod, 'e')
