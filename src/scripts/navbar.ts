import { saveImage } from './saveImage'

const navbarBtn = document.getElementById('navbar-btn')
const navbarMobile = document.getElementById('navbar-mobile')

if (!navbarBtn || !navbarMobile) throw new Error('Navbar element do not exist!')

navbarBtn.onclick = () => {
  navbarMobile.classList.toggle('show')
}

//elements

//Save image
const saveBtn = document.getElementById('save-btn')
const fileNameInput = document.getElementById(
  'filename-input'
) as HTMLInputElement

saveBtn?.addEventListener('click', () => saveImage(fileNameInput.value))

// Settings menu
const settingsBtn = document.getElementById('settings-btn')
const appSettings = document.getElementById('app-settings')

settingsBtn?.addEventListener('click', () => {
  appSettings?.classList.toggle('show')
})
