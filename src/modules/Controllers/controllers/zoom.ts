import { Controller } from './Controller'
import {
  canvasContainer,
  layersContainer,
  setLayersContainerSize,
} from '../../../canvas'

const zoomStep = 100
let level = 0

export const setLevel = (n: number) => (level = n)

// Zoom in
const zoomInElement = Controller.createElement('codicon:zoom-in')
const zoomInMethod = () => {
  let width = layersContainer!.clientWidth + zoomStep

  setLayersContainerSize(width)
  level++
}

// Redo
const zoomOutElement = Controller.createElement('codicon:zoom-out')
const zoomOutMethod = () => {
  if (level <= -5) return

  let width = layersContainer!.clientWidth - zoomStep

  setLayersContainerSize(width)
  level--
}

canvasContainer.addEventListener(
  'wheel',
  e => {
    e.preventDefault()

    if (e.deltaY < 0) zoomInMethod()
    else zoomOutMethod()
  },
  { passive: false }
)

export const zoomIn = new Controller(
  'zoomIn',
  zoomInElement,
  zoomInMethod,
  'ctrl+up'
)
export const zoomOut = new Controller(
  'zoomOut',
  zoomOutElement,
  zoomOutMethod,
  'ctrl+down'
)
