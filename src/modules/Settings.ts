import { canvasDrawing } from '../canvas'

interface ISettings {
  canvasWidth: number
  canvasHeight: number
}

// Dom elements
const settingsForm = document.getElementById('settings-form') as HTMLFormElement
const settingsCloseBtn = document.getElementById('settings-close-btn')
const settingsContainer = document.getElementById('settings-container')

if (!settingsForm || !settingsCloseBtn || !settingsContainer)
  throw new Error('Invalid setting elements')

// Declarations
const settings: ISettings = {
  canvasWidth: canvasDrawing.width,
  canvasHeight: canvasDrawing.height,
}

//Initialization
initInputValues()
applySettings()

// Form's listener
settingsForm.addEventListener('submit', e => {
  e.preventDefault()
  getSettings()
  applySettings()
})

// Close button listener
settingsCloseBtn.addEventListener('click', () => {
  settingsContainer.classList.remove('show')
  initInputValues()
})

// Methods
function getSettings() {
  const keys = Object.keys(settings)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as keyof ISettings

    const input = settingsForm.elements.namedItem(key)

    if (input instanceof HTMLInputElement && input.checkValidity()) {
      settings[key] = Number(input.value)
    }
  }
}

function applySettings() {
  canvasDrawing.width = settings.canvasWidth
  canvasDrawing.height = settings.canvasHeight
  canvasDrawing.dispatchEvent(new Event('customResize'))
}

function initInputValues() {
  const keys = Object.keys(settings)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as keyof ISettings

    const input = settingsForm.elements.namedItem(key)

    if (input instanceof HTMLInputElement) {
      input.value = String(settings[key])
    }
  }
}

// exports

export { settingsContainer }
