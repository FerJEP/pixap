import { pencil } from './pencil'
import { eraser } from './eraser'
import { colorPicker } from './colorSelector'
import { square } from './square'
import { circle } from './circle'
import { line } from './line'
import { floodFill } from './floodFill'

// All the tools must be imported here, and added to the exported
// default array to be added to the tools container by ToolsHandler.ts

export const AllTools = [
  pencil,
  eraser,
  line,
  square,
  circle,
  floodFill,
  colorPicker,
]
