import { undo, redo } from './state'
import { zoomIn, zoomOut } from './zoom'

export const controllers = [undo, redo, zoomIn, zoomOut]
