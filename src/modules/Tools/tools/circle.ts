import { circleAlgo } from '../../../scripts/circleAlgo'
import { Tool, ToolMethod } from './Tool'

const circleElement = Tool.createElement('bi-circle')
const circleMethod: ToolMethod = (cx, points) => {
  if (points.length === 1) {
    const point = points[0]

    cx.fillRect(point.x, point.y, 1, 1)
  } else if (points.length > 1) {
    const firstPoint = points[0]
    const currentPoint = points[points.length - 1]

    const xd = currentPoint.x - firstPoint.x
    const yd = currentPoint.y - firstPoint.y

    const radio = Math.floor(Math.sqrt(xd * xd + yd * yd))

    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height)
    circleAlgo(firstPoint.x, firstPoint.y, radio, (x, y) => {
      cx.fillRect(x, y, 1, 1)
    })
  }
}

export const circle = new Tool('circle', circleElement, circleMethod, 'c')
