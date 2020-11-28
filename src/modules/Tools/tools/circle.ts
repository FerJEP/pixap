import { circleAlgo } from '../../../scripts/circleAlgo'
import { Tool, ToolMethod } from './Tool'

const circleElement = Tool.createElement('bi-circle')
const circleMethod: ToolMethod = (cx, mouse) => {
  if (mouse.move && mouse.down) {
    const xd = mouse.move.currentX - mouse.down.x
    const yd = mouse.move.currentY - mouse.down.y

    const radio = Math.floor(Math.sqrt(xd * xd + yd * yd))

    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height)
    circleAlgo(mouse.down.x, mouse.down.y, radio, (x, y) => {
      cx.fillRect(x, y, 1, 1)
    })
  } else if (mouse.down) {
    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height)
    cx.fillRect(mouse.down.x, mouse.down.y, 1, 1)
  }
}

export const circle = new Tool('circle', circleElement, circleMethod, 'c')
