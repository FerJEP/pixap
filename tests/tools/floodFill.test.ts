import {
  floodFill,
  sameColor,
  getImageDataIndex,
} from '../../src/modules/Tools/tools/floodFill'

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

test
