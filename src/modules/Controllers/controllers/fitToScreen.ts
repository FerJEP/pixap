import {
  canvasContainer,
  canvasDrawing,
  setLayersContainerSize,
} from '../../../canvas'
import { Controller } from './Controller'

const fitToScreenElement = Controller.createElement('octicon-screen-normal-24')

const fitToScreenMethod = () => {
  // It took me 4 hours to think this code
  // It was simpler than what I was thinking tho
  const heightRatio = canvasDrawing.height / canvasDrawing.width
  let width = canvasContainer.clientWidth
  let height = width * heightRatio

  if (height > canvasContainer.clientHeight) {
    width = canvasContainer.clientHeight / heightRatio
    height = canvasContainer.clientHeight
  }

  setLayersContainerSize(width, height)
}

export const fitToScreen = new Controller(
  'fit to screen',
  fitToScreenElement,
  fitToScreenMethod,
  'f'
)
