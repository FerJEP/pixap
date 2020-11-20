const canvas = document.getElementById('canvas-drawing') as HTMLCanvasElement

if (!(canvas instanceof HTMLCanvasElement))
  throw new Error('Invalid Canvas element')

const cx = canvas.getContext('2d')!

ImageSmoothingFalse()

canvas.addEventListener('resize', ImageSmoothingFalse)

export { canvas, cx }

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
