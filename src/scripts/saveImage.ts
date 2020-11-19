import { canvas } from '../canvas'

export function saveImage(filename: string = 'Untiled') {
  const saveLink = document.createElement('a')

  saveLink.href = canvas.toDataURL()
  saveLink.download = filename + '.png'
  saveLink.click()
}
