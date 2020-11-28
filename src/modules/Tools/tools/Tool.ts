import {
  ButtonIcon,
  createButtonIcon,
  insertButtonText,
} from '../../../scripts/icon'

export type MouseInfo = {
  down: {
    x: number
    y: number
  } | null
  move?: {
    lastX: number
    lastY: number
    currentX: number
    currentY: number
  } | null
}

export type ToolMethod = (
  cx: CanvasRenderingContext2D,
  mouse: MouseInfo
) => void

export class Tool {
  constructor(
    public name: string,
    public element: ButtonIcon,
    public method: ToolMethod | null,
    public shortcut?: string
  ) {
    this.element.setAttribute('name', this.name)

    let iconText = `${this.name} tool`
    if (shortcut) iconText += ` (${this.shortcut})`

    insertButtonText(this.element, iconText)
  }

  static createElement(icon: string) {
    return createButtonIcon({ icon, classes: ['tool'] })
  }
}
