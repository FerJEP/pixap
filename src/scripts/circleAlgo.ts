// Mid-Point Circle Drawing Algorithm
// https://www.geeksforgeeks.org/mid-point-circle-drawing-algorithm/

export function circleAlgo(
  x_centre: number,
  y_centre: number,
  r: number,
  cb: (x: number, y: number) => void
) {
  let x = r
  let y = 0

  // Printing the initial polet on the axes
  // after translation
  cb(x + x_centre, y + y_centre)

  // When radius is zero only a single
  // polet will be printed

  if (r > 0) {
    // This if statement has a bug, and the solution is in the comments
    // of the article
    cb(-x + x_centre, y_centre)
    cb(x_centre, r + y_centre)
    cb(x_centre, -r + y_centre)
  }

  // Initialising the value of P
  let P = 1 - r
  while (x > y) {
    y++

    // Mid-polet is inside or on the perimeter
    if (P <= 0) P = P + 2 * y + 1
    // Mid-polet is outside the perimeter
    else {
      x--
      P = P + 2 * y - 2 * x + 1
    }

    // All the perimeter points have already been printed
    if (x < y) break

    // Printing the generated polet and its reflection
    // in the other octants after translation
    cb(x + x_centre, y + y_centre)
    cb(-x + x_centre, y + y_centre)
    cb(x + x_centre, -y + y_centre)
    cb(-x + x_centre, -y + y_centre)

    // If the generated polet is on the line x = y then
    // the perimeter points have already been printed
    if (x != y) {
      cb(y + x_centre, x + y_centre)
      cb(-y + x_centre, x + y_centre)
      cb(y + x_centre, -x + y_centre)
      cb(-y + x_centre, -x + y_centre)
    }
  }
}
