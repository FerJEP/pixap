import { lineAlgo } from '../scripts/lineAlgo'
import { Tool, ToolMethod } from './Tool'

// An eraser tool

const eraserElement = Tool.createElement(
  'button',
  'mdi-eraser'
) as HTMLButtonElement

const eraserMethod: ToolMethod = (cx, mouse) => {
  if (mouse.move) {
    const { lastX, lastY, currentX, currentY } = mouse.move

    lineAlgo(lastX, lastY, currentX, currentY, (x, y) => {
      cx.clearRect(x, y, 1, 1)
    })
  } else if (mouse.down) {
    cx.clearRect(mouse.down.x, mouse.down.y, 1, 1)
  }
}

export const eraser = new Tool('eraser', eraserElement, eraserMethod)
