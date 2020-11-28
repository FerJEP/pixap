import { lineAlgo } from '../../../scripts/lineAlgo'
import { Tool, ToolMethod } from './Tool'

const squareElement = Tool.createElement('button', 'bx-bx-rectangle')
const squareMethod: ToolMethod = (cx, mouse) => {
  if (mouse.move && mouse.down) {
    const width = mouse.move.currentX - mouse.down.x
    const height = mouse.move.currentY - mouse.down.y

    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height)

    if (width === 0) {
      // if It's a vertical line
      lineAlgo(
        mouse.down.x,
        mouse.down.y,
        mouse.down.x,
        mouse.move.currentY,
        (x, y) => {
          cx.fillRect(x, y, 1, 1)
        }
      )
    } else if (height === 0) {
      // if It's a horizontal line
      lineAlgo(
        mouse.down.x,
        mouse.down.y,
        mouse.move.currentX,
        mouse.down.y,
        (x, y) => {
          cx.fillRect(x, y, 1, 1)
        }
      )
    } else {
      // else, it's finally a square
      cx.strokeRect(mouse.down.x + 0.5, mouse.down.y + 0.5, width, height)
      // +0.5 because of some problems with how pixels are drawn.
      // Basically, it is to avoid "antialiasing"
    }
  } else if (mouse.down) {
    //if mouse hasn't moved yet
    cx.clearRect(0, 0, cx.canvas.width, cx.canvas.height)
    cx.fillRect(mouse.down.x, mouse.down.y, 1, 1)
  }
}
export const square = new Tool('square', squareElement, squareMethod, 's')
