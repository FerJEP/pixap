import { lineAlgo } from '../../../scripts/lineAlgo'
import { Tool, ToolMethod } from './Tool'

const lineElement = Tool.createElement('ant-design:line-outlined')

const lineMethod: ToolMethod = (cx, points) => {
  if (points.length === 1) {
    const point = points[0]

    cx.fillRect(point.x, point.y, 1, 1)
  } else if (points.length > 1) {
    const firstPoint = points[0]
    const currentPoint = points[points.length - 1]

    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height)

    lineAlgo(
      firstPoint.x,
      firstPoint.y,
      currentPoint.x,
      currentPoint.y,
      (x, y) => {
        cx.fillRect(x, y, 1, 1)
      }
    )
  }
}

export const line = new Tool('line', lineElement, lineMethod, 'l')
