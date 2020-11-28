/*
    This module handles all the tools in the application.
*/

import {
  canvasDrawing,
  canvasPreview,
  cxDrawing,
  cxPreview,
} from '../../canvas'
import { MouseInfo, Tool } from './tools/Tool'
import { AllTools as tools } from './tools/index'
import './listeners'

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
updateRatio()
selectTool('pencil')

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
