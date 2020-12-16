import {
  floodFill,
  sameColor,
  getImageDataIndex,
} from '../../src/modules/Tools/tools/floodFill'

import { square } from '../../src/modules/Tools/tools/square'
import { createCanvas } from 'canvas'

test('Flood fill: initialization', () => {
  expect(floodFill.name).toBe('flood fill')
  expect(floodFill.element).toBeInstanceOf(HTMLButtonElement)
  expect(typeof floodFill.method).toBe('function')
  expect(typeof floodFill.shortcut).toBe('string')
})

test('Flood fill: filling a clear canvas', () => {
  /*

  Creating canvas and context

  I had to set the width and height of the canvas to 16, because if
  I didn't, I would fill the jest call stack (That is was the error said)

  */
  const canvas = document.createElement('canvas')
  const cx = canvas.getContext('2d')!

  canvas.width = canvas.height = 16

  // setting black color
  cx.fillStyle = '#000000'
  const blackRgba = [0, 0, 0, 255]

  const points = [{ x: 0, y: 0 }]

  const spy = jest.spyOn(cx, 'putImageData')

  // Calling tool
  floodFill.method!(cx, points)

  expect(spy).toBeCalled()

  /* 
  Getting ImageData

  For some reason, getting the imageData of the canvas context after
  calling the flood fill method does not return the updated ImageData.

  const imageData = cx.getImageData(0, 0, cx.canvas.width, cx.canvas.height)

  It is a jest-canvas-mock issue: 
  https://github.com/hustcc/jest-canvas-mock/issues/60
    

  I had to spy on putImageData and get the ImageData from its argument to
  check if the flood fill method did its job.
*/
  const imageData = spy.mock.calls[0][0]

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
  /*
    jest-canvas-mock is giving me some problems with getting the
    ImageData after using putImageData: 
    
    https://github.com/hustcc/jest-canvas-mock/issues/60
    
    so I'm trying node-canvas within this test
  */
  const canvas = createCanvas(16, 16)
  const cx = canvas.getContext('2d')

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
  let count = 0

  // Checking the colors by looping throught the canvas
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      // Getting color
      const pointIndex = getImageDataIndex(imageData, { x, y })
      const color = Array.from(imageData.data.slice(pointIndex, pointIndex + 4))

      const info = isSquare(x, y)

      console.log(info, count)
      if (info === 'stroke') {
        expect(color).toEqual(squareColor.rgba)
      } else if (info === 'fill') {
        expect(color).toEqual(fillColor.rgba)
      } else {
        expect(color).toEqual([0, 0, 0, 0])
      }
      count++
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
