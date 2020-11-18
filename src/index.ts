import './styles/index.style' //Main style file
import './scripts/navbar' //Navbar mobile handler
import { ToolsHandler } from './ToolsHandler'

const toolsContainer = document.getElementById('tools-container')

if (!toolsContainer) throw new Error('Invalid tools container element')

// This is like loading the Tools module
new ToolsHandler(toolsContainer)
