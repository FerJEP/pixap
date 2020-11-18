export function getIcon(dataIcon: string, dataInline: boolean = false) {
  const icon = document.createElement('span')
  icon.classList.add('iconify')
  icon.setAttribute('data-icon', dataIcon)
  icon.setAttribute('data-inline', `${dataInline}`)
  return icon
}
