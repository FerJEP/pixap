import { IPoint } from '../../../canvas'
import {
  ButtonIcon,
  createButtonIcon,
  insertButtonText,
} from '../../../scripts/icon'

export type ToolMethod = (
  cx: CanvasRenderingContext2D,
  points: IPoint[]
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
