import './styles/index.style' //Main style file

import './canvas'

//Modules
import { openSettings } from './modules/Settings'
import './modules/Navbar' //Navbar mobile handler
import './modules/CanvasPointerEvents'
import './modules/Tools/index'
import './modules/Controllers'

// fit to screen
import { fitToScreen } from './modules/Controllers/controllers/fitToScreen'
fitToScreen.action()
openSettings()
