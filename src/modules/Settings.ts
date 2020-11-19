import { canvas } from '../canvas'

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
  canvasWidth: 16,
  canvasHeight: 16,
}

//Initialization
loadSettingsToForm()

// Form's listener
settingsForm.addEventListener('submit', e => {
  e.preventDefault()
  getSettings()
  applySettings()
})

// Close button listener
settingsCloseBtn.addEventListener('click', () => {
  settingsContainer.classList.remove('show')
  loadSettingsToForm()
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
  canvas.width = settings.canvasWidth
  canvas.height = settings.canvasHeight
  canvas.dispatchEvent(new Event('resize'))
}

function loadSettingsToForm() {
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
