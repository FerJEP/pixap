export function moveElement(
  el: HTMLElement,
  movementX: number,
  movementY: number
) {
  const { position, top, left } = getComputedStyle(el)

  if (position === 'static') return

  el.style.left = parseInt(left) + movementX + 'px'
  el.style.top = parseInt(top) + movementY + 'px'
}
