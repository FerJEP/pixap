import { settingsContainer } from './Settings'
import { canvasDrawing } from '../canvas'
import { ButtonIcon, insertButtonText } from '../scripts/icon'
import { saveImage } from '../scripts/saveImage'
import { addShortcut } from '../shortcuts'

// Navbar mobile
const navbarBtn = document.getElementById('navbar-btn')
const navbarMobile = document.getElementById('navbar-mobile')

if (!navbarBtn || !navbarMobile) throw new Error('Navbar element do not exist!')

navbarBtn.onclick = () => {
  navbarMobile.classList.toggle('show')
}

// Save image button
const saveBtnKey = 'ctrl+s'
const saveBtn = document.getElementById('save-btn') as ButtonIcon
const fileNameInput = document.getElementById(
  'filename-input'
) as HTMLInputElement

function saveBtnHandler(e: Event) {
  e.preventDefault()
  e.stopPropagation()
  saveImage(canvasDrawing.toDataURL(), fileNameInput.value)
}

if (!saveBtn || !fileNameInput) throw new Error('Invalid save elements')

insertButtonText(saveBtn, `Save (${saveBtnKey})`)

saveBtn.addEventListener('click', saveBtnHandler)

addShortcut('saveBtn', saveBtnKey, saveBtnHandler)

// Settings menu button
const settingsBtn = document.getElementById('settings-btn') as ButtonIcon

if (!settingsBtn) throw new Error('Invalid setting nav button')

insertButtonText(settingsBtn, 'Settings')

settingsBtn.addEventListener('click', () => {
  settingsContainer?.classList.toggle('show')
})
