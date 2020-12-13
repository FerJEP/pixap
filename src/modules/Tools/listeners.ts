import { addShortcut } from '../../shortcuts'
import { selectTool, toolsContainer } from './index'
import { AllTools as tools } from './tools/index'

// Tool container

toolsContainer!.addEventListener('click', ({ target }) => {
  if (target instanceof HTMLElement) {
    const name = target.getAttribute('name')

    if (name) selectTool(name)
  }
})

// addShortcut

tools.forEach(tool => {
  if (tool.shortcut) {
    addShortcut(tool.name, tool.shortcut, () => selectTool(tool.name))
  }
})
