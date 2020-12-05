import hotkeys, { KeyHandler } from 'hotkeys-js'

export interface Shortcut {
  name: string
  key: string
  method: KeyHandler
}

export const shortcuts: Shortcut[] = []

export function addShortcut(name: string, key: string, method: KeyHandler) {
  const isAlready = shortcuts.some(
    shortcut => shortcut.name === name || shortcut.key === key
  )

  if (isAlready) throw new Error(`Shortcut already registered`)

  hotkeys(key, method)
  shortcuts.push({ name, key, method })
}
