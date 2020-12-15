import { canvasDrawing, cxDrawing, cxPreview } from '../../../canvas'
import { Tool } from './Tool'

// A color picker tool, relying on the browser color input

const colorPickerElement = document.createElement('button')
const inputColor = document.createElement('input')

colorPickerElement.classList.add('icon', 'tool')

inputColor.setAttribute('type', 'color')
cxDrawing.fillStyle = cxPreview.fillStyle = inputColor.value
cxDrawing.strokeStyle = cxPreview.strokeStyle = inputColor.value

colorPickerElement.appendChild(inputColor)

// This tool has no method, it controls itself
inputColor.addEventListener('input', e => {
  const { value } = e.currentTarget as HTMLInputElement

  cxDrawing.fillStyle = cxPreview.fillStyle = value
  cxDrawing.strokeStyle = cxPreview.strokeStyle = value
})

canvasDrawing.addEventListener('customResize', () => {
  cxDrawing.fillStyle = cxPreview.fillStyle = inputColor.value
  cxDrawing.strokeStyle = cxPreview.strokeStyle = inputColor.value
})

export const colorPicker = new Tool('color picker', colorPickerElement, null)
