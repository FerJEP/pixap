import {
  canvasContainer,
  canvasDrawing,
  IPoint,
  layersContainer,
  ratio,
} from '../canvas'
import { moveElement } from '../scripts/moveElement'
import { startDrawing, keepDrawing, stopDrawing, cancelDrawing } from './Tools'

let lastPoint: IPoint | null = null
let previous2TouchEvent: TouchEvent | null = null

canvasContainer.addEventListener('mousedown', e => {
  if (e.button === 0) {
    // left click button
    const point = getPositionInCanvas(e.clientX, e.clientY)

    startDrawing(point)
    lastPoint = point
  }
})

canvasContainer.addEventListener(
  'touchstart',
  e => {
    e.preventDefault()
    e.stopPropagation()

    if (e.touches.length > 1) {
      cancelDrawing()
      lastPoint = null
      previous2TouchEvent = e
    } else {
      const point = getPositionInCanvas(
        e.touches[0].clientX,
        e.touches[0].clientY
      )

      startDrawing(point)
    }
  },
  {
    passive: false,
  }
)

canvasContainer.addEventListener('mousemove', e => {
  if (e.buttons === 4) {
    // wheel button
    moveElement(layersContainer!, e.movementX, e.movementY)
  } else if (e.buttons === 1) {
    // left click button
    const point = getPositionInCanvas(e.clientX, e.clientY)

    if (lastPoint && lastPoint.x === point.x && lastPoint.y === point.y) return

    keepDrawing(point)

    lastPoint = point
  }
})

canvasContainer.addEventListener(
  'touchmove',
  e => {
    e.preventDefault()
    e.stopPropagation()

    if (e.touches.length > 1) {
      cancelDrawing()
      lastPoint = null

      const currentX = e.touches[0].pageX + e.touches[1].pageX / 2
      const currentY = e.touches[0].pageY + e.touches[1].pageY / 2

      const previousX =
        previous2TouchEvent!.touches[0].pageX +
        previous2TouchEvent!.touches[1].pageX / 2
      const previousY =
        previous2TouchEvent!.touches[0].pageY +
        previous2TouchEvent!.touches[1].pageY / 2

      const movementX = currentX - previousX
      const movementY = currentY - previousY

      moveElement(layersContainer!, movementX, movementY)
      previous2TouchEvent = e
    } else {
      const point = getPositionInCanvas(
        e.touches[0].clientX,
        e.touches[0].clientY
      )

      if (lastPoint && lastPoint.x === point.x && lastPoint.y === point.y)
        return

      keepDrawing(point)

      lastPoint = point
    }
  },
  {
    passive: false,
  }
)

canvasContainer.addEventListener('mouseup', e => {
  if (e.button === 0) {
    stopDrawing()

    lastPoint = null
  }
})

canvasContainer.addEventListener(
  'touchend',
  e => {
    if (e.touches.length > 1) {
      previous2TouchEvent = e
    } else if (e.touches.length == 0) {
      e.preventDefault()
      e.stopPropagation()

      stopDrawing()

      lastPoint = null
      previous2TouchEvent = null
    }
  },
  {
    passive: false,
  }
)

function getPositionInCanvas(clientX: number, clientY: number): IPoint {
  const rect = canvasDrawing.getBoundingClientRect()

  clientX -= rect.x
  clientY -= rect.y

  const posX = Math.floor(clientX * ratio.width)
  const posY = Math.floor(clientY * ratio.height)

  return {
    x: posX,
    y: posY,
  }
}
