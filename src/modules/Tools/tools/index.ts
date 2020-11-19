import { pencil } from './pencil'
import { eraser } from './eraser'
import { colorPicker } from './colorSelector'

// All the tools must be imported here, and added to the exported
// default array to be added to the tools container by ToolsHandler.ts

export const AllTools = [pencil, eraser, colorPicker]
