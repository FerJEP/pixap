import { canvasContainer } from '../canvas'
import { onDrawing, startDrawing, stopDrawing } from './Tools'

canvasContainer.addEventListener('mousedown', e => startDrawing(e), {
  passive: false,
})
canvasContainer.addEventListener('touchstart', e => startDrawing(e), {
  passive: false,
})

canvasContainer.addEventListener('mousemove', e => onDrawing(e), {
  passive: false,
})
canvasContainer.addEventListener('touchmove', e => onDrawing(e), {
  passive: false,
})

canvasContainer.addEventListener('mouseup', e => stopDrawing(e), {
  passive: false,
})
canvasContainer.addEventListener('touchend', e => stopDrawing(e), {
  passive: false,
})
