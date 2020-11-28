import { canvasState } from '../../../canvasState'
import { Controller } from './Controller'

// Undo
const undoElement = Controller.createElement('eva:arrow-back-outline')
const undoAction = () => {
  canvasState.undo()
}

// Redo

const redoElement = Controller.createElement('eva:arrow-forward-outline')
const redoAction = () => {
  canvasState.redo()
}

export const undo = new Controller('undo', undoElement, undoAction, 'ctrl+z')
export const redo = new Controller('redo', redoElement, redoAction, 'ctrl+y')
