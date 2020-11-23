import { canvasDrawing } from '../canvas'

export function saveImage(filename: string = 'Untiled') {
  const saveLink = document.createElement('a')

  saveLink.href = canvasDrawing.toDataURL()
  saveLink.download = filename + '.png'
  saveLink.click()
}
