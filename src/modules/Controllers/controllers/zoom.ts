import { Controller } from './Controller'
import {
  canvasContainer,
  layersContainer,
  setLayersContainerSize,
} from '../../../canvas'

const zoomStep = 100

// Zoom in
const zoomInElement = Controller.createElement('codicon:zoom-in')
const zoomInMethod = () => {
  let width = layersContainer!.clientWidth + zoomStep

  if (width > canvasContainer.clientWidth * 2)
    width = canvasContainer.clientWidth * 2

  setLayersContainerSize(width)
}

// Redo
const zoomOutElement = Controller.createElement('codicon:zoom-out')
const zoomOutMethod = () => {
  let width = layersContainer!.clientWidth - zoomStep

  if (width < zoomStep) width = zoomStep

  setLayersContainerSize(width)
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
