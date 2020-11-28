import { canvasState } from '../../../canvasState'
import { Controller, Shortcut } from './Controller'

// Undo
const undoElement = Controller.createElement('eva:arrow-back-outline')
const undoAction = () => {
  canvasState.undo()
}
const undoShortcut: Shortcut = {
  ctrlKey: true,
  key: 'z',
}

// Redo

const redoElement = Controller.createElement('eva:arrow-forward-outline')
const redoAction = () => {
  canvasState.redo()
}
const redoShortcut: Shortcut = {
  ctrlKey: true,
  key: 'y',
}

export const undo = new Controller(
  'undo',
  undoElement,
  undoAction,
  undoShortcut
)
export const redo = new Controller(
  'redo',
  redoElement,
  redoAction,
  redoShortcut
)
