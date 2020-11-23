const canvas = document.getElementById('canvas-drawing') as HTMLCanvasElement
const canvasBackground = document.getElementById(
  'canvas-background'
) as HTMLCanvasElement
const canvasPreview = document.getElementById(
  'canvas-preview'
) as HTMLCanvasElement

if (!canvas || !canvasBackground || !canvasPreview)
  throw new Error('Invalid canvas elements')

export { canvas, canvasPreview }

export const cx = canvas.getContext('2d')!
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
  cx.imageSmoothingEnabled = false
  //@ts-ignore
  cx.webkitImageSmoothingEnabled = false
  //@ts-ignore
  cx.mozImageSmoothingEnabled = false
  //@ts-ignore
  cx.msImageSmoothingEnabled = false
  //@ts-ignore
  cx.oImageSmoothingEnabled = false
}

function checkeredCanvas(color1: string, color2: string) {
  canvasBackground.width = canvas.width
  canvasBackground.height = canvas.height

  const cx = canvasBackground.getContext('2d')!

  for (let x = 0; x < canvasBackground.width; x++) {
    for (let y = 0; y < canvasBackground.height; y++) {
      cx.fillStyle = (x + y) % 2 === 0 ? color1 : color2
      cx.fillRect(x, y, 1, 1)
    }
  }
}
