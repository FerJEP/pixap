import * as convert from 'color-convert'
import { IPoint } from '../../../canvas'
import { Tool, ToolMethod } from './Tool'

const floodFillElement = Tool.createElement('bx-bxs-color-fill')

/*
 Algorithm from:

 https://en.wikipedia.org/wiki/Flood_fill#Alternative_implementations
*/

const floodFillMethod: ToolMethod = (cx, points) => {
  //If there is no points
  if (points.length < 1) return

  const imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height)
  const width = imageData.width

  const point = points[points.length - 1]
  const pointIndex = getImageDataIndex(width, point)

  const fillColor = Array.from(convert.hex.rgb(cx.fillStyle as string))
  // filling RGB(A)
  fillColor[3] = 255

  // targetColor taken from the point
  const targetColor = getColor(pointIndex)

  // If target-color is equal to replacement-color, return.
  if (sameColor(fillColor, targetColor)) return

  setFillColor(pointIndex)

  const queue = [{ index: pointIndex, calledBy: pointIndex }]

  while (queue.length) {
    const index = queue.shift()!
    const x = (index.index / 4) % width

    const up = index.index - width * 4
    const down = index.index + width * 4
    const left = index.index - 4
    const right = index.index + 4

    // Checking for y - 1 point (up)
    if (sameColor(getColor(up), targetColor)) {
      setFillColor(up)
      queue.push({ index: up, calledBy: index.index })
    }

    // Checking for y + 1 point (down)
    if (sameColor(getColor(down), targetColor)) {
      setFillColor(down)
      queue.push({ index: down, calledBy: index.index })
    }

    /*
      Checking for X avoids checking for left or right if the index is
      at the edge of the canvas
    */

    if (x > 0) {
      // Checking for x - 1 point (left)
      if (sameColor(getColor(left), targetColor)) {
        setFillColor(left)
        queue.push({ index: left, calledBy: index.index })
      }
    }

    if (x < width - 1) {
      // Checking for x + 1 point (right)
      if (sameColor(getColor(right), targetColor)) {
        setFillColor(right)
        queue.push({ index: right, calledBy: index.index })
      }
    }
  }

  // Putting ImageData back
  cx.putImageData(imageData, 0, 0)

  // helper functions
  function setFillColor(index: number) {
    imageData.data[index] = fillColor[0]
    imageData.data[index + 1] = fillColor[1]
    imageData.data[index + 2] = fillColor[2]
    imageData.data[index + 3] = fillColor[3]
  }

  function getColor(index: number) {
    return [
      imageData.data[index],
      imageData.data[index + 1],
      imageData.data[index + 2],
      imageData.data[index + 3],
    ]
  }
}

export function sameColor(color1: any[], color2: any[]) {
  // Loops throught the array and checks every value
  for (let i = 0; i < color1.length; i++) {
    if (color1[i] !== color2[i]) return false
  }

  return true
}

export function getImageDataIndex(width: number, point: IPoint) {
  return point.y * (width * 4) + point.x * 4
}

export const floodFill = new Tool(
  'flood fill',
  floodFillElement,
  floodFillMethod,
  'b'
)
