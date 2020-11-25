import { canvasDrawing } from '../canvas'
import { saveImage } from '../scripts/saveImage'

// Navbar mobile
const navbarBtn = document.getElementById('navbar-btn')
const navbarMobile = document.getElementById('navbar-mobile')

if (!navbarBtn || !navbarMobile) throw new Error('Navbar element do not exist!')

navbarBtn.onclick = () => {
  navbarMobile.classList.toggle('show')
}

// Save image button
const saveBtn = document.getElementById('save-btn')
const fileNameInput = document.getElementById(
  'filename-input'
) as HTMLInputElement

saveBtn?.addEventListener('click', () =>
  saveImage(canvasDrawing.toDataURL(), fileNameInput.value)
)

// Settings menu button
const settingsBtn = document.getElementById('settings-btn')
import { settingsContainer } from './Settings'

settingsBtn?.addEventListener('click', () => {
  settingsContainer?.classList.toggle('show')
})
