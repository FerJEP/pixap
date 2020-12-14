const canvasContainer = document.getElementById(
  'canvas-container'
) as HTMLElement

const layersContainer = document.getElementById('canvas-layers-container')

const canvasDrawing = document.getElementById(
  'canvas-drawing'
) as HTMLCanvasElement
const canvasBackground = document.getElementById(
  'canvas-background'
) as HTMLCanvasElement
const canvasPreview = document.getElementById(
  'canvas-preview'
) as HTMLCanvasElement

if (
  !canvasContainer ||
  !layersContainer ||
  !canvasDrawing ||
  !canvasBackground ||
  !canvasPreview
)
  throw new Error('Invalid canvas elements')

export { canvasContainer, layersContainer, canvasDrawing, canvasPreview }

export const cxDrawing = canvasDrawing.getContext('2d')!
export const cxPreview = canvasPreview.getContext('2d')!

export interface IPoint {
  x: number
  y: number
}

// Ratio between style canvas size and real canvas size
export const ratio = {
  height: 0,
  width: 0,
}

// Initialization
ImageSmoothingFalse()
updateRatio()
setCanvasDrawingSize(16, 16)

// Global listeners
window.addEventListener('load', () => updateRatio())

// Canvas listeners
layersContainer.addEventListener('customResize', () => updateRatio())

canvasDrawing.addEventListener('customResize', () => {
  ImageSmoothingFalse()
  updateRatio()
})

// functions

function updateRatio() {
  ratio.width = canvasDrawing.width / canvasDrawing.offsetWidth
  ratio.height = canvasDrawing.height / canvasDrawing.offsetHeight
}

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

function checkeredCanvas() {
  const color1 = '#d3d3d3'
  const color2 = '#ffffff'

  const cx = canvasBackground.getContext('2d')!

  for (let x = 0; x < canvasBackground.width; x++) {
    for (let y = 0; y < canvasBackground.height; y++) {
      cx.fillStyle = (x + y) % 2 === 0 ? color1 : color2
      cx.fillRect(x, y, 1, 1)
    }
  }
}

export function setLayersContainerSize(width: number) {
  const heightRatio = canvasDrawing.height / canvasDrawing.width

  layersContainer!.style.width = width + 'px'
  layersContainer!.style.height = width * heightRatio + 'px'
  layersContainer?.dispatchEvent(new Event('customResize'))
}

export function setCanvasDrawingSize(width: number, height: number) {
  canvasDrawing.width = canvasBackground.width = canvasPreview.width = width
  canvasDrawing.height = canvasBackground.height = canvasPreview.height = height

  checkeredCanvas()

  canvasDrawing?.dispatchEvent(new Event('customResize'))
}
