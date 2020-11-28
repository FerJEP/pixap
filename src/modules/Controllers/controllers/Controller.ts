import hotkeys from 'hotkeys-js'
import {
  ButtonIcon,
  createButtonIcon,
  insertButtonText,
} from '../../../scripts/icon'

export class Controller {
  constructor(
    public name: string,
    public element: ButtonIcon,
    public action: Function,
    public shortcut: string
  ) {
    this.element.setAttribute('name', this.name)

    insertButtonText(this.element, `${this.name} (${this.shortcut})`)

    hotkeys(shortcut, e => {
      e.preventDefault()
      this.action()
    })
  }

  static createElement(icon: string) {
    return createButtonIcon({ icon, classes: ['controller'] })
  }
}
