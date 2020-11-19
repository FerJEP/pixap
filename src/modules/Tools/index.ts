/*
    This class handles all the tools in the application.
*/

import { canvas, cx } from './canvas'
import { MouseInfo } from './tools/Tool'
import { AllTools as tools } from './tools/index'

interface IRatio {
  width: number
  height: number
}

export class ToolsHandler {
  private currentTool = tools[0]
  private ratio!: IRatio
  private mouse: MouseInfo = {
    down: null,
    move: null,
  }

  constructor(private container: HTMLElement) {
    // Canvas resize listener (Init the this.ratio)
    this.updateRatio()

    canvas.addEventListener('load', () => {
      this.updateRatio()
    })

    canvas.addEventListener('resize', () => {
      this.updateRatio()
    })

    // Canvas click listeners
    canvas.addEventListener('mousedown', e => {
      this.mouse.down = this.getPositionInCanvas(e.offsetX, e.offsetY)
      if (this.currentTool.method) this.currentTool.method(cx, this.mouse)
    })

    canvas.addEventListener('mousemove', e => {
      if (this.mouse.down) {
        const { x, y } = this.getPositionInCanvas(e.offsetX, e.offsetY)

        if (x === this.mouse.move?.currentX && y === this.mouse.move.currentY)
          return

        if (this.mouse.move) {
          this.mouse.move.lastX = this.mouse.move.currentX
          this.mouse.move.lastY = this.mouse.move.currentY

          this.mouse.move.currentX = x
          this.mouse.move.currentY = y
        } else {
          this.mouse.move = {
            lastX: this.mouse.down.x,
            lastY: this.mouse.down.y,
            currentX: x,
            currentY: y,
          }
        }

        if (this.currentTool.method) this.currentTool.method(cx, this.mouse)
      } else {
        this.mouse.move = null
      }
    })

    canvas.addEventListener('mouseleave', e => {
      if (this.mouse.down && this.mouse.move) {
        const { x, y } = this.getPositionInCanvas(e.offsetX, e.offsetY)

        this.mouse.move.lastX = this.mouse.move.currentX
        this.mouse.move.lastY = this.mouse.move.currentY

        this.mouse.move.currentX = x
        this.mouse.move.currentY = y

        if (this.currentTool.method) this.currentTool.method(cx, this.mouse)
      }
    })

    canvas.addEventListener('mouseup', () => {
      this.mouse.down = null
    })

    // Tool container

    this.container.append(...tools.map(tool => tool.element))

    this.container.addEventListener('click', ({ target }) => {
      const toolSelected = tools.find(tool => tool.element === target)

      if (toolSelected && toolSelected.method) this.currentTool = toolSelected
    })
  }

  private getPositionInCanvas(x: number, y: number) {
    const posX = Math.floor(x * this.ratio.width)
    const posY = Math.floor(y * this.ratio.height)

    return {
      x: posX,
      y: posY,
    }
  }

  private updateRatio() {
    this.ratio = {
      width: canvas.width / canvas.offsetWidth,
      height: canvas.height / canvas.offsetHeight,
    }
  }
}
