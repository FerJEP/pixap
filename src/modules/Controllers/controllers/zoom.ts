import { Controller } from './Controller'
import {
  layersContainer,
  getZoomStep,
  setLayersContainerSize,
} from '../../../canvas'

// Zoom in
const zoomInElement = Controller.createElement('codicon:zoom-in')
const zoomInMethod = () => {
  setLayersContainerSize(layersContainer!.clientWidth + getZoomStep())
}

// Redo
const zoomOutElement = Controller.createElement('codicon:zoom-out')
const zoomOutMethod = () => {
  setLayersContainerSize(layersContainer!.clientWidth - getZoomStep())
}

export const zoomIn = new Controller(
  'zoomIn',
  zoomInElement,
  zoomInMethod,
  'ctrl++'
)
export const zoomOut = new Controller(
  'zoomOut',
  zoomOutElement,
  zoomOutMethod,
  'ctrl+-'
)
