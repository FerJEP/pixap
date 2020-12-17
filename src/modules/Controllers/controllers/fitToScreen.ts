import { Controller } from './Controller'
import {
  canvasContainer,
  canvasDrawing,
  layersContainer,
  setLayersContainerSize,
} from '../../../canvas'
import { setLevel } from './zoom'
import { moveElement } from '../../../scripts/moveElement'

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

  //reseting zoom level
  setLevel(0)

  //Moving element to the center
  moveElement(
    layersContainer!,
    canvasContainer.clientHeight / 2,
    canvasContainer.clientWidth / 2
  )
}

export const fitToScreen = new Controller(
  'fit to screen',
  fitToScreenElement,
  fitToScreenMethod,
  'ctrl+f'
)
