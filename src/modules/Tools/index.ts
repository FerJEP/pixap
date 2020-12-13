/*
    This module handles all the tools in the application.
*/

import { IPoint, canvasPreview, cxDrawing, cxPreview } from '../../canvas'
import { Tool } from './tools/Tool'
import { AllTools as tools } from './tools/index'
import { canvasState } from '../../canvasState'

// DOM

export const toolsContainer = document.getElementById('tools-container')

// Declarations

let isDrawing = false
let points: IPoint[] = []

let currentTool: Tool

// Initialization
if (!toolsContainer) throw new Error('Invalid tools container')

toolsContainer.append(...tools.map(tool => tool.element))

selectTool('pencil')

import './listeners'
// End

export function callTool() {
  // If it is not drawing or there is not tool method, return
  if (!isDrawing || !currentTool.method) return

  // Eraser tool needs to clear canvasDrawing instead of preview
  if (currentTool.name === 'eraser') {
    currentTool.method(cxDrawing, points)
  } else {
    currentTool.method(cxPreview, points)
  }
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

// call startDrawing() first, then keepDrawing() when pointer moves, and finally
// stopDrawing() when pointer to stop the drawing state.

export function startDrawing(point: IPoint) {
  if (isDrawing) return

  // Starting drawing
  points.push(point)
  isDrawing = true

  // Calling tool
  canvasState.setReturnPoint()
  callTool()
}

// Called after startDrawing
export function keepDrawing(point: IPoint) {
  if (!isDrawing) return

  points.push(point)

  callTool()
}

// Called after startDrawing
export function stopDrawing() {
  if (!isDrawing) return

  // Stopping
  isDrawing = false
  points = []

  // Drawing canvasPreview on canvasDrawing
  if (currentTool.name !== 'eraser') {
    cxDrawing.drawImage(canvasPreview, 0, 0)
    cxPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height)
  }
}

export function cancelDrawing() {
  if (!isDrawing) return

  isDrawing = false
  points = []

  if (currentTool.name !== 'eraser') {
    cxPreview.clearRect(0, 0, canvasPreview.width, canvasPreview.height)
  }
}
