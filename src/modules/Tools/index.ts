/*
    This class handles all the tools in the application.
*/

import { canvas, cx } from '../../canvas'
import { MouseInfo } from './tools/Tool'
import { AllTools as tools } from './tools/index'

interface IRatio {
  width: number
  height: number
}

// Dom element
const container = document.getElementById('toolsContainer')

if (!container) throw new Error('Invalid tools container')

// Declarations
const ratio: IRatio = {
  height: 0,
  width: 0,
}
const mouse: MouseInfo = {
  down: null,
  move: null,
}
let currentTool = tools[0]

// Initialization
updateRatio()

// Canvas resize listener (Init the ratio)

canvas.addEventListener('load', () => {
  updateRatio()
})

canvas.addEventListener('resize', () => {
  updateRatio()
})

// Canvas click listeners
canvas.addEventListener('mousedown', e => {
  mouse.down = getPositionInCanvas(e.offsetX, e.offsetY)
  if (currentTool.method) currentTool.method(cx, mouse)
})

canvas.addEventListener('mousemove', e => {
  if (mouse.down) {
    const { x, y } = getPositionInCanvas(e.offsetX, e.offsetY)

    if (x === mouse.move?.currentX && y === mouse.move.currentY) return

    if (mouse.move) {
      mouse.move.lastX = mouse.move.currentX
      mouse.move.lastY = mouse.move.currentY

      mouse.move.currentX = x
      mouse.move.currentY = y
    } else {
      mouse.move = {
        lastX: mouse.down.x,
        lastY: mouse.down.y,
        currentX: x,
        currentY: y,
      }
    }

    if (currentTool.method) currentTool.method(cx, mouse)
  } else {
    mouse.move = null
  }
})

canvas.addEventListener('mouseleave', e => {
  if (mouse.down && mouse.move) {
    const { x, y } = getPositionInCanvas(e.offsetX, e.offsetY)

    mouse.move.lastX = mouse.move.currentX
    mouse.move.lastY = mouse.move.currentY

    mouse.move.currentX = x
    mouse.move.currentY = y

    if (currentTool.method) currentTool.method(cx, mouse)
  }
})

canvas.addEventListener('mouseup', () => {
  mouse.down = null
})

// Tool container

container.append(...tools.map(tool => tool.element))

container.addEventListener('click', ({ target }) => {
  const toolSelected = tools.find(tool => tool.element === target)

  if (toolSelected && toolSelected.method) currentTool = toolSelected
})

function getPositionInCanvas(x: number, y: number) {
  const posX = Math.floor(x * ratio.width)
  const posY = Math.floor(y * ratio.height)

  return {
    x: posX,
    y: posY,
  }
}

function updateRatio() {
  ratio.width = canvas.width / canvas.offsetWidth
  ratio.height = canvas.height / canvas.offsetHeight
}
