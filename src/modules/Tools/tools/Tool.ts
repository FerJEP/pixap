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
    public method: ToolMethod | null,
    public shortcut?: string
  ) {
    this.element.setAttribute('name', this.name)

    const hoverText = document.createElement('div')
    hoverText.classList.add('icon-text')
    hoverText.textContent = `${this.name} tool`
    if (shortcut) hoverText.textContent += ` (${this.shortcut})`

    this.element.appendChild(hoverText)
  }

  static createElement(iconData: string) {
    const element = document.createElement('button')

    element.classList.add('icon', 'tool')

    element.appendChild(getIcon(iconData))

    return element
  }
}
