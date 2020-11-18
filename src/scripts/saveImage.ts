import { canvas } from '../canvas'

const saveBtn = document.getElementById('save-btn')
const fileNameInput = document.getElementById('filename-input')

const saveLink = document.createElement('a')

if (!(saveBtn instanceof HTMLElement)) throw new Error('Invale save btn!')
if (!(fileNameInput instanceof HTMLInputElement))
  throw new Error('Invale filename input!')

saveBtn?.addEventListener('click', () => {
  saveLink.href = canvas.toDataURL()
  saveLink.download = fileNameInput.value + '.png'
  saveLink.click()
})
