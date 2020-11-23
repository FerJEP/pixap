const canvasDrawing = document.getElementById(
  'canvas-drawing'
) as HTMLCanvasElement
const canvasBackground = document.getElementById(
  'canvas-background'
) as HTMLCanvasElement
const canvasPreview = document.getElementById(
  'canvas-preview'
) as HTMLCanvasElement

if (!canvasDrawing || !canvasBackground || !canvasPreview)
  throw new Error('Invalid canvas elements')

export { canvasDrawing, canvasPreview }

export const cxDrawing = canvasDrawing.getContext('2d')!
export const cxPreview = canvasPreview.getContext('2d')!

// cx.ImageSmoothingEnabled = false
ImageSmoothingFalse()
checkeredCanvas('#d3d3d3', '#ffffff')

window.addEventListener('resize', () => {
  ImageSmoothingFalse()
  checkeredCanvas('#d3d3d3', '#ffffff')
})

function ImageSmoothingFalse() {
  //@ts-ignore
  cxDrawing.imageSmoothingEnabled = false
  //@ts-ignore
  cxDrawing.webkitImageSmoothingEnabled = false
  //@ts-ignore
  cxDrawing.mozImageSmoothingEnabled = false
  //@ts-ignore
  cxDrawing.msImageSmoothingEnabled = false
  //@ts-ignore
  cxDrawing.oImageSmoothingEnabled = false
}

function checkeredCanvas(color1: string, color2: string) {
  canvasBackground.width = canvasDrawing.width
  canvasBackground.height = canvasDrawing.height

  const cx = canvasBackground.getContext('2d')!

  for (let x = 0; x < canvasBackground.width; x++) {
    for (let y = 0; y < canvasBackground.height; y++) {
      cx.fillStyle = (x + y) % 2 === 0 ? color1 : color2
      cx.fillRect(x, y, 1, 1)
    }
  }
}
