import { getIcon } from '../../../scripts/getIcon'

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
    public element: HTMLElement,
    public method: ToolMethod | null
  ) {}

  static createElement(tagName: string, iconData?: string, inlineIcon = false) {
    const element = document.createElement(tagName) as HTMLElement
    element.classList.add('icon', 'tool')
    if (iconData) element.appendChild(getIcon(iconData, inlineIcon))
    return element
  }
}
