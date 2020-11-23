/*
    This module handles all the tools in the application.
*/

import {
  canvasContainer,
  canvasDrawing,
  canvasPreview,
  cxDrawing,
  cxPreview,
} from '../../canvas'
import { MouseInfo } from './tools/Tool'
import { AllTools as tools } from './tools/index'

interface IRatio {
  width: number
  height: number
}

// Dom element
const container = document.getElementById('tools-container')

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

// Window resize listener (Init the ratio)

window.addEventListener('load', () => {
  updateRatio()
})

window.addEventListener('resize', () => {
  updateRatio()
})

// Canvas click listeners
canvasContainer.addEventListener('mousedown', e => {
  mouse.down = getPositionInCanvas(e.clientX, e.clientY)
  callTool()
})

canvasContainer.addEventListener('mousemove', e => {
  if (mouse.down) {
    const { x, y } = getPositionInCanvas(e.clientX, e.clientY)

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

    callTool()
  } else {
    mouse.move = null
  }
})

canvasContainer.addEventListener('mouseup', () => {
  mouse.down = null
  if (currentTool.name !== 'eraser') {
    cxDrawing.drawImage(canvasPreview, 0, 0)
    cxPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height)
  }
})

// Tool container

container.append(...tools.map(tool => tool.element))

container.addEventListener('click', ({ target }) => {
  const toolSelected = tools.find(tool => tool.element === target)

  if (toolSelected && toolSelected.method) currentTool = toolSelected
})

function callTool() {
  if (currentTool.method) {
    if (currentTool.name === 'eraser') {
      currentTool.method(cxDrawing, mouse)
    } else {
      currentTool.method(cxPreview, mouse)
    }
  }
}

function getPositionInCanvas(clientX: number, clientY: number) {
  const rect = canvasDrawing.getBoundingClientRect()

  clientX -= rect.x
  clientY -= rect.y

  const posX = Math.floor(clientX * ratio.width)
  const posY = Math.floor(clientY * ratio.height)

  return {
    x: posX,
    y: posY,
  }
}

function updateRatio() {
  ratio.width = canvasDrawing.width / canvasDrawing.offsetWidth
  ratio.height = canvasDrawing.height / canvasDrawing.offsetHeight
}
