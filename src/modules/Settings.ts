import { canvasDrawing } from '../canvas'
import { canvasState } from '../canvasState'
import { fileNameInput } from './Navbar'

interface ISettings {
  filename: string
  canvasWidth: string
  canvasHeight: string
}

// Dom elements
const settingsForm = document.getElementById('settings-form') as HTMLFormElement
const settingsCloseBtn = document.getElementById('settings-close-btn')
const settingsContainer = document.getElementById('settings-container')

if (!settingsForm || !settingsCloseBtn || !settingsContainer)
  throw new Error('Invalid setting elements')

// Declarations
const settings: ISettings = {
  filename: '',
  canvasWidth: canvasDrawing.width.toString(),
  canvasHeight: canvasDrawing.height.toString(),
}

// Form's listener
settingsForm.addEventListener('submit', e => {
  e.preventDefault()
  getSettings()
  applySettings()
  canvasState.clear()
  closeSettings()
})

// Close button listener
settingsCloseBtn.addEventListener('click', () => {
  closeSettings()
})

export function openSettings() {
  if (!settingsContainer?.classList.contains('show')) {
    setInputValues()
    settingsContainer?.classList.add('show')
  }
}

export function closeSettings() {
  settingsContainer?.classList.remove('show')
}

function getSettings() {
  const keys = Object.keys(settings)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as keyof ISettings

    const input = settingsForm.elements.namedItem(key)

    if (input instanceof HTMLInputElement && input.checkValidity()) {
      settings[key] = input.value
    }
  }
}

function setInputValues() {
  const keys = Object.keys(settings)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i] as keyof ISettings

    const input = settingsForm.elements.namedItem(key)

    if (input instanceof HTMLInputElement) {
      input.value = settings[key]
    }
  }
}

function applySettings() {
  canvasDrawing.width = parseInt(settings.canvasWidth)
  canvasDrawing.height = parseInt(settings.canvasHeight)

  fileNameInput.value = settings.filename || 'untiled'

  canvasDrawing.dispatchEvent(new Event('customResize'))
}
