import {
  floodFill,
  sameColor,
  getImageDataIndex,
} from '../../src/modules/Tools/tools/floodFill'

import { square } from '../../src/modules/Tools/tools/square'
import { createCanvas } from 'canvas'

/*
  jest-canvas-mock has some issues with ImageData.

  it seems to not be updating the ImageData with putImageData()

  There is a open issue on Github: 
  https://github.com/hustcc/jest-canvas-mock/issues/60

  So, within this test, node-canvas is being used.
  jest-canvas-mock seems to be working fine in the other tool tests.
*/

const canvas = createCanvas(16, 16)
const cx = canvas.getContext('2d')

// Clearing canvas after each test
beforeEach(() => cx.clearRect(0, 0, canvas.width, canvas.height))

test('Flood fill: initialization', () => {
  expect(floodFill.name).toBe('flood fill')
  expect(floodFill.element).toBeInstanceOf(HTMLButtonElement)
  expect(typeof floodFill.method).toBe('function')
  expect(typeof floodFill.shortcut).toBe('string')
})

test('Flood fill: filling a clear canvas', () => {
  // setting black color
  cx.fillStyle = '#000000'
  const blackRgba = [0, 0, 0, 255]

  const points = [{ x: 0, y: 0 }]

  // Calling tool
  floodFill.method!(cx, points)

  // Getting the imageData
  const imageData = cx.getImageData(0, 0, canvas.width, canvas.height)

  // FIRST CHECK

  const pointIndex1 = getImageDataIndex(imageData, points[0])

  // Getting the color in above point
  const color1 = Array.from(imageData.data.slice(pointIndex1, pointIndex1 + 4))

  // color1 is the color where the "click" happended, so should be black
  expect(sameColor(blackRgba, color1)).toBeTruthy()

  // SECOND CHECK

  // Getting point 2 from the other corner of the canvas
  const pointIndex2 = getImageDataIndex(imageData, {
    x: cx.canvas.width - 1,
    y: cx.canvas.height - 1,
  })

  const color2 = Array.from(imageData.data.slice(pointIndex2, pointIndex2 + 4))

  // color2 is the color of the other corner of the canvas,
  // which should be black because nothing should have stopped
  // the flood fill tool from filling the whole canvas
  expect(sameColor(blackRgba, color2)).toBeTruthy()
})

test('Flood fill: filling a square', () => {
  // Setting colors
  const squareColor = {
    //Black
    hex: '#000000',
    rgba: [0, 0, 0, 255],
  }

  const fillColor = {
    // Cyan
    hex: '#1be8f3',
    rgba: [27, 232, 243, 255],
  }

  // Creating a 6x6 square

  const points = [
    { x: 4, y: 4 },
    { x: 10, y: 10 },
  ]

  cx.fillStyle = squareColor.hex

  square.method!(cx, points)

  // Filling the square from the center

  cx.fillStyle = fillColor.hex

  floodFill.method!(cx, [{ x: 7, y: 7 }])

  const imageData = cx.getImageData(0, 0, canvas.width, canvas.height)

  // Checking the colors by looping throught the canvas
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      // Getting color
      const pointIndex = getImageDataIndex(imageData, { x, y })
      const color = Array.from(imageData.data.slice(pointIndex, pointIndex + 4))

      const info = isSquare(x, y)

      if (info === 'stroke') {
        expect(color).toEqual(squareColor.rgba)
      } else if (info === 'fill') {
        expect(color).toEqual(fillColor.rgba)
      } else {
        expect(color).toEqual([0, 0, 0, 0])
      }
    }
  }

  function isSquare(x: number, y: number) {
    //Checking if x and y are part of the square
    if (
      range(x, points[0].x, points[1].x) &&
      range(y, points[0].y, points[1].y)
    ) {
      // Cheking if the point is the filled part
      if (
        range(x, points[0].x + 1, points[1].x - 1) &&
        range(y, points[0].y + 1, points[1].y - 1)
      ) {
        return 'fill'
      } else {
        // If it is not, it is the stroke
        return 'stroke'
      }
    } else {
      // If it is not part of the square, it is not part of the square,
      // what else do you wanna read bro?
      return 'no'
    }

    function range(n: number, from: number, to: number) {
      return n >= from && n <= to
    }
  }
})
