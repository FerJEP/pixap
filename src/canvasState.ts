import { cxDrawing } from './canvas'

class CanvasState {
  private imageData: ImageData[] = []
  private redoImageData: ImageData[] = []

  constructor() {}

  setReturnPoint() {
    this.imageData.push(this.getImageData())
    this.redoImageData = []

    console.log('new data', this.imageData)
  }

  private getImageData() {
    return cxDrawing.getImageData(
      0,
      0,
      cxDrawing.canvas.width,
      cxDrawing.canvas.height
    )
  }

  undo() {
    const data = this.imageData.pop()

    if (data) {
      this.redoImageData.push(this.getImageData())
      cxDrawing.putImageData(data, 0, 0)
    }
    console.log('undoData', this.imageData)
    console.log('redoData', this.redoImageData)
  }

  redo() {
    const data = this.redoImageData.pop()

    if (data) {
      this.imageData.push(this.getImageData())
      cxDrawing.putImageData(data, 0, 0)
    }
    console.log('undoData', this.imageData)
    console.log('redoData', this.redoImageData)
  }
}

export const canvasState = new CanvasState()
