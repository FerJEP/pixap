import { cxDrawing } from '../../../canvas'
import { Tool } from './Tool'

// A color picker tool, relying on the browser color input

const colorPickerElement = Tool.createElement('input') as HTMLInputElement
colorPickerElement.setAttribute('type', 'color')
colorPickerElement.value = cxDrawing.strokeStyle as string
colorPickerElement.value = cxDrawing.fillStyle as string

colorPickerElement.addEventListener('input', e => {
  const { value } = e.currentTarget as HTMLInputElement

  cxDrawing.fillStyle = value
  cxDrawing.strokeStyle = value
})

// This tool has no method, it controls itself

export const colorPicker = new Tool('colorPicker', colorPickerElement, null)
