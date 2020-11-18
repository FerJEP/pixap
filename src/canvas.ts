const canvas = document.getElementById('canvas') as HTMLCanvasElement

if (!(canvas instanceof HTMLCanvasElement))
  throw new Error('Invalid Canvas element')

export const cx = canvas.getContext('2d')!

export { canvas }
