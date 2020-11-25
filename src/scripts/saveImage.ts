export function saveImage(dataURL: string, filename: string) {
  const saveLink = document.createElement('a')

  saveLink.href = dataURL
  saveLink.download = filename + '.png'
  saveLink.click()
}
