export interface ButtonIcon extends HTMLButtonElement {}

interface ButtonIconProps {
  hoverText?: string
  icon: string
  dataInline?: boolean
  classes?: string[]
}

function createIconSvg(dataIcon: string, dataInline = false) {
  const icon = document.createElement('span')
  icon.classList.add('iconify')
  icon.setAttribute('data-icon', dataIcon)
  icon.setAttribute('data-inline', `${dataInline}`)
  return icon
}

export function insertButtonText(button: ButtonIcon, hoverText: string) {
  const text = document.createElement('div')

  text.classList.add('icon-text')
  text.textContent = hoverText

  button.appendChild(text)
}

export function createButtonIcon(prop: ButtonIconProps): ButtonIcon {
  const button = document.createElement('button') as ButtonIcon
  const svg = createIconSvg(prop.icon, prop.dataInline)

  button.appendChild(svg)

  if (prop.classes) button.classList.add(...prop.classes)
  if (prop.hoverText) insertButtonText(button, prop.hoverText)

  button.classList.add('icon')

  return button
}
