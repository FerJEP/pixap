import { getIcon } from '../../../scripts/getIcon'

export interface Shortcut {
  ctrlKey: boolean
  key: string
}

export class Controller {
  constructor(
    public name: string,
    public element: HTMLElement,
    public action: Function,
    public shortcut: Shortcut
  ) {
    this.element.setAttribute('name', this.name)
  }

  static createElement(iconData: string, inlineIcon = false) {
    const element = document.createElement('button')
    element.classList.add('icon', 'controller')
    element.appendChild(getIcon(iconData, inlineIcon))
    return element
  }
}
