import { canvasContainer } from '../../canvas'
import { controllers } from './controllers/index'

const container = document.getElementById('controllers-container')

if (!container) throw new Error('Invalid Controls container')

// canvasContainer shortcuts
canvasContainer.tabIndex = 0

canvasContainer.addEventListener('keydown', () => {})

// Controls container
container.append(...controllers.map(controller => controller.element))

container.addEventListener('click', ({ target }) => {
  if (!(target instanceof HTMLElement)) return

  const targetName = target.getAttribute('name')

  if (!targetName) return

  const controller = controllers.find(
    controller => controller.name === targetName
  )

  if (!controller) return

  controller.action()
})
