import { lineAlgo } from '../../../scripts/lineAlgo'
import { Tool, ToolMethod } from './Tool'

const pencilElement = Tool.createElement(
  'button',
  'bx:bxs-pencil'
) as HTMLButtonElement

const pencilMethod: ToolMethod = (cx, mouse) => {
  if (mouse.move) {
    const { lastX, lastY, currentX, currentY } = mouse.move

    lineAlgo(lastX, lastY, currentX, currentY, (x, y) => {
      cx.fillRect(x, y, 1, 1)
    })
  } else if (mouse.down) {
    cx.fillRect(mouse.down.x, mouse.down.y, 1, 1)
  }
}

export const pencil = new Tool('pencil', pencilElement, pencilMethod, 'p')
