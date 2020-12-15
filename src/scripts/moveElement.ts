export function moveElement(
  el: HTMLElement,
  top: number,
  left: number,
  add = false
) {
  const style = getComputedStyle(el)

  if (style.position === 'static') return

  if (add) {
    el.style.top = parseInt(style.top) + top + 'px'
    el.style.left = parseInt(style.left) + left + 'px'
  } else {
    el.style.top = top + 'px'
    el.style.left = left + 'px'
  }
}
