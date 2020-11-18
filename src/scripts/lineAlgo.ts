/*
Bresenham's line algorithm
https://www.youtube.com/watch?v=zytBpLlSHms&t=412s

This is because the mousemove event is not fast enought to track
every pixel the pointer moves.
*/

export function lineAlgo(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  cb: (x: number, y: number) => void
) {
  if (x0 === x1 && y0 === y1) {
    cb(x1, y1)
    return
  }

  const dx = x1 - x0
  const sx = dx < 0 ? -1 : 1
  const dy = y1 - y0
  const sy = dy < 0 ? -1 : 1

  if (Math.abs(dy) < Math.abs(dx)) {
    const m = dy / dx
    const b = y0 - m * x0

    while (x0 != x1) {
      //fn
      cb(x0, Math.round(m * x0 + b))
      x0 += sx
    }
  } else {
    const m = dx / dy
    const b = x0 - m * y0
    while (y0 != y1) {
      cb(Math.round(m * y0 + b), y0)
      y0 += sy
    }
  }

  cb(x1, y1)
}
