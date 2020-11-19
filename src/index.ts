import './styles/index.style' //Main style file
import './scripts/navbar' //Navbar mobile handler
import './scripts/saveImage' //Save image handler
import { SettingsMenuHandler } from './SettingsMenuHandler' // File Settings handler
import { ToolsHandler } from './ToolsHandler'

const toolsContainer = document.getElementById('tools-container')

if (!toolsContainer) throw new Error('Invalid tools container element')

const settingsMenu = document.getElementById('app-settings')

if (!(settingsMenu instanceof HTMLElement))
  throw new Error('Invalid settings form element!')

// This is like loading the Tools module
new SettingsMenuHandler()
new ToolsHandler(toolsContainer)
