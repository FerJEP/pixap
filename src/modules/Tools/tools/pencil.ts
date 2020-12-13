import { lineAlgo } from '../../../scripts/lineAlgo'
import { Tool, ToolMethod } from './Tool'

const pencilElement = Tool.createElement('bx:bxs-pencil') as HTMLButtonElement

const pencilMethod: ToolMethod = (cx, points) => {
  if (points.length === 1) {
    const point = points[0]

    cx.fillRect(point.x, point.y, 1, 1)
  } else if (points.length > 1) {
    const lastPoint = points[points.length - 2]
    const currentPoint = points[points.length - 1]

    lineAlgo(
      lastPoint.x,
      lastPoint.y,
      currentPoint.x,
      currentPoint.y,
      (x, y) => {
        cx.fillRect(x, y, 1, 1)
      }
    )
  }
}

export const pencil = new Tool('pencil', pencilElement, pencilMethod, 'p')
