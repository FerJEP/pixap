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
import { MouseInfo, Tool } from './tools/Tool'
import { AllTools as tools } from './tools/index'
import { canvasState } from '../../canvasState'

// DOM

export const toolsContainer = document.getElementById('tools-container')

// Declarations
export const ratio = {
  height: 0,
  width: 0,
}
export const mouse: MouseInfo = {
  down: null,
  move: null,
}

let currentTool: Tool

// Initialization
if (!toolsContainer) throw new Error('Invalid tools container')

toolsContainer.append(...tools.map(tool => tool.element))

updateRatio()
selectTool('pencil')

import './listeners'
// End

export function callTool() {
  if (currentTool.method) {
    if (currentTool.name === 'eraser') {
      currentTool.method(cxDrawing, mouse)
    } else {
      currentTool.method(cxPreview, mouse)
    }
  }
}

export function getPositionInCanvas(clientX: number, clientY: number) {
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

export function updateRatio() {
  ratio.width = canvasDrawing.width / canvasDrawing.offsetWidth
  ratio.height = canvasDrawing.height / canvasDrawing.offsetHeight
}

export function selectTool(name: string) {
  const tool = tools.find(tool => tool.name === name)

  if (!tool || !tool.method) return

  if (currentTool) {
    currentTool.element.classList.remove('selected')
  }

  currentTool = tool
  currentTool.element.classList.add('selected')
}

export function previewToDrawing() {
  if (currentTool.name !== 'eraser') {
    cxDrawing.drawImage(canvasPreview, 0, 0)
    cxPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height)
  }
}

export function startDrawing(e: MouseEvent | TouchEvent) {
  let clientX: number
  let clientY: number

  if (e instanceof MouseEvent) {
    clientX = e.clientX
    clientY = e.clientY
  } else {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  }

  // Allowed clickable area (resting scroll bar, see below)
  let allowWidth = canvasContainer.clientWidth + canvasContainer.offsetLeft
  let allowHeight = canvasContainer.clientHeight + canvasContainer.offsetTop

  // if drawing starts on the scroll bar, just return
  if (clientX > allowWidth || clientY > allowHeight) return

  e.preventDefault()
  e.stopPropagation()

  mouse.down = getPositionInCanvas(clientX, clientY)

  canvasState.setReturnPoint()
  callTool()
}

export function onDrawing(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  e.stopPropagation()

  if (mouse.down) {
    const { x, y } =
      e instanceof MouseEvent
        ? getPositionInCanvas(e.clientX, e.clientY)
        : getPositionInCanvas(e.touches[0].clientX, e.touches[0].clientY)

    if (mouse.move) {
      if (x === mouse.move.currentX && y === mouse.move.currentY) return

      mouse.move.lastX = mouse.move.currentX
      mouse.move.lastY = mouse.move.currentY

      mouse.move.currentX = x
      mouse.move.currentY = y
    } else {
      if (x === mouse.down.x && y === mouse.down.x) return

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
}

export function stopDrawing(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  e.stopPropagation()

  mouse.down = null
  mouse.move = null
  previewToDrawing()
}
