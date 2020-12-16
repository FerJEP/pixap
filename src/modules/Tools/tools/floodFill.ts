import * as convert from 'color-convert'
import { IPoint } from '../../../canvas'
import { Tool, ToolMethod } from './Tool'

const floodFillElement = Tool.createElement('bx-bxs-color-fill')

const floodFillMethod: ToolMethod = (cx, points) => {
  //If there is no points
  if (points.length < 1) return

  const imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height)
  const point = points[points.length - 1]
  const pointIndex = getImageDataIndex(imageData, point)

  // rgb -> rgba
  const fillColor = [...convert.hex.rgb(cx.fillStyle.toString()), 255]

  // Getting the color from imageData: [R,G,B,A]
  const targetColor = Array.from(
    imageData.data.slice(pointIndex, pointIndex + 4)
  )

  // if fill Color is equal to target color, return
  if (sameColor(fillColor, targetColor)) return

  fill(point)

  cx.putImageData(imageData, 0, 0)

  function fill(point: IPoint) {
    const pointIndex = getImageDataIndex(imageData, point)

    const pointColor = Array.from(
      imageData.data.slice(pointIndex, pointIndex + 4)
    )

    if (sameColor(fillColor, pointColor) || !sameColor(targetColor, pointColor))
      return

    // if fill color and target color are the same OR
    // pointColor is NOT the targetColot, return

    // filling
    for (let i = 0; i <= 3; i++) {
      imageData.data[pointIndex + i] = fillColor[i]
    }

    // Now calling in the four directions
    // x + 1 = right
    fill({ x: point.x + 1, y: point.y })
    // x - 1 = left
    fill({ x: point.x - 1, y: point.y })
    // y + 1 = down
    fill({ x: point.x, y: point.y + 1 })
    // y -1 = up
    fill({ x: point.x, y: point.y - 1 })
  }
}

export function sameColor(color1: any[], color2: any[]) {
  return color1.every((color, i) => color === color2[i])
}

export function getImageDataIndex(imageData: ImageData, point: IPoint) {
  return point.y * (imageData.width * 4) + point.x * 4
}

export const floodFill = new Tool(
  'flood fill',
  floodFillElement,
  floodFillMethod,
  'b'
)
