import { addShortcut } from '../../shortcuts'
import { canvasDrawing, layersContainer } from '../../canvas'
import { selectTool, toolsContainer, updateRatio } from './index'
import { AllTools as tools } from './tools/index'

// UpdateRatio listeners
window.addEventListener('load', updateRatio)
layersContainer!.addEventListener('customResize', () => updateRatio())
canvasDrawing!.addEventListener('customResize', () => updateRatio())

// Tool container

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
