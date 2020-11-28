// Window resize listener (Init the ratio)

import hotkeys from 'hotkeys-js'
import { canvasContainer } from '../../canvas'
import { canvasState } from '../../canvasState'
import {
  callTool,
  selectTool,
  getPositionInCanvas,
  mouse,
  updateRatio,
  previewToDrawing,
} from './index'
import { AllTools as tools } from './tools/index'

// DOM element
const toolsContainer = document.getElementById('tools-container')

if (!toolsContainer) throw new Error('Invalid tools container')

// Window listeners
window.addEventListener('load', () => {
  updateRatio()
})

window.addEventListener('resize', () => {
  updateRatio()
})

// Canvas click listeners
canvasContainer.addEventListener('mousedown', e => {
  mouse.down = getPositionInCanvas(e.clientX, e.clientY)
  canvasState.setReturnPoint()
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
  previewToDrawing()
})

// Tool container

toolsContainer!.append(...tools.map(tool => tool.element))

toolsContainer!.addEventListener('click', ({ target }) => {
  if (target instanceof HTMLElement) {
    const name = target.getAttribute('name')

    if (name) selectTool(name)
  }
})

// hotkeys

const keys = tools
  .reduce((keys, tool) => {
    if (tool.shortcut) return keys.concat(tool.shortcut)
    return keys
  }, <Array<string>>[])
  .join()

//@ts-ignore
hotkeys(keys, (e, handler) => {
  const tool = tools.find(tool => tool.shortcut === handler.key)

  if (tool) selectTool(tool.name)
})
