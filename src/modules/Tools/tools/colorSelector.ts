import { cxPreview } from '../../../canvas'
import { Tool } from './Tool'

// A color picker tool, relying on the browser color input

const colorPickerElement = Tool.createElement('input') as HTMLInputElement
colorPickerElement.setAttribute('type', 'color')
colorPickerElement.value = cxPreview.strokeStyle as string
colorPickerElement.value = cxPreview.fillStyle as string

colorPickerElement.addEventListener('input', e => {
  const { value } = e.currentTarget as HTMLInputElement

  cxPreview.fillStyle = value
  cxPreview.strokeStyle = value
})

// This tool has no method, it controls itself

export const colorPicker = new Tool('colorPicker', colorPickerElement, null)
