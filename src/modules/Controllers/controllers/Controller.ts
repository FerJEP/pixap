import hotkeys from 'hotkeys-js'
import { getIcon } from '../../../scripts/getIcon'

export class Controller {
  constructor(
    public name: string,
    public element: HTMLElement,
    public action: Function,
    public shortcut: string
  ) {
    this.element.setAttribute('name', this.name)
    hotkeys(shortcut, e => {
      e.preventDefault()
      this.action()
    })
  }

  static createElement(iconData: string, inlineIcon = false) {
    const element = document.createElement('button')
    element.classList.add('icon', 'controller')
    element.appendChild(getIcon(iconData, inlineIcon))
    return element
  }
}
