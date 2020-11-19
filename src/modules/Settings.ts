import { canvas } from './canvas'

interface ISettings {
  canvasWidth: number
  canvasHeight: number
}

interface IPartialSettings extends Partial<ISettings> {}

const defaultSettings: ISettings = {
  canvasWidth: 16,
  canvasHeight: 16,
}

export class SettingsMenuHandler {
  private settings: ISettings
  private appSettingsElement: HTMLElement
  private form: HTMLFormElement
  private settingsCloseBtn: HTMLButtonElement

  constructor(_settings?: IPartialSettings) {
    this.settings = { ...defaultSettings, ..._settings }

    this.appSettingsElement = document.getElementById('app-settings')!
    this.form = document.getElementById('settings-form') as HTMLFormElement
    this.settingsCloseBtn = document.getElementById(
      'settings-close-btn'
    ) as HTMLButtonElement

    this.loadSettingsToForm()

    this.form.addEventListener('submit', e => {
      e.preventDefault()
      this.getSettings()
      this.applySettings()
    })

    this.settingsCloseBtn.addEventListener('click', () => {
      this.appSettingsElement.classList.remove('show')
      this.loadSettingsToForm()
    })
  }

  getSettings() {
    const keys = Object.keys(this.settings)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof ISettings

      const input = this.form.elements.namedItem(key)

      if (input instanceof HTMLInputElement && input.checkValidity()) {
        this.settings[key] = Number(input.value)
      }
    }
  }

  applySettings() {
    canvas.width = this.settings.canvasWidth
    canvas.height = this.settings.canvasHeight
    canvas.dispatchEvent(new Event('resize'))
  }

  loadSettingsToForm() {
    const keys = Object.keys(this.settings)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i] as keyof ISettings

      const input = this.form.elements.namedItem(key)

      if (input instanceof HTMLInputElement) {
        input.value = String(this.settings[key])
      }
    }
  }
}
