import { addShortcut } from '../../shortcuts'
import { canvasContainer, canvasDrawing, layersContainer } from '../../canvas'
import {
  selectTool,
  updateRatio,
  startDrawing,
  onDrawing,
  stopDrawing,
} from './index'
import { AllTools as tools } from './tools/index'

// DOM element
const toolsContainer = document.getElementById('tools-container')

if (!toolsContainer) throw new Error('Invalid tools container')

// UpdateRatio listeners
window.addEventListener('load', updateRatio)
layersContainer!.addEventListener('customResize', () => updateRatio())
canvasDrawing!.addEventListener('customResize', () => updateRatio())

// Canvas mouse & touch listeners
canvasContainer.addEventListener('mousedown', e => startDrawing(e))
canvasContainer.addEventListener('touchstart', e => startDrawing(e))

canvasContainer.addEventListener('mousemove', e => onDrawing(e))
canvasContainer.addEventListener('touchmove', e => onDrawing(e))

canvasContainer.addEventListener('mouseup', e => stopDrawing(e))
canvasContainer.addEventListener('touchend', e => stopDrawing(e))

// Tool container

toolsContainer!.append(...tools.map(tool => tool.element))

toolsContainer!.addEventListener('click', ({ target }) => {
  if (target instanceof HTMLElement) {
    const name = target.getAttribute('name')

    if (name) selectTool(name)
  }
})

// addShortcut

tools.forEach(tool => {
  if (tool.shortcut) {
    addShortcut(tool.name, tool.shortcut, () => selectTool(tool.name))
  }
})
