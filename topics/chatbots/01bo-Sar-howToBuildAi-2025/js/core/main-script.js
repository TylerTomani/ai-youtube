
// import { letterFocus } from "../nav/keyboard-nav.js";
import { letterFocus } from "../nav/keyboard-nav-temp.js";
const topicTempId = document.querySelector('#topicsTempId')
addEventListener('DOMContentLoaded', (e) => {

    // Assign FocusZones evenListens('focus')
    addEventListener('keydown', e => {
    // case 'sideBar':
    
    // case 'mainTargetDiv:
    
        // **
    /* default: (maybe)** NOT Sure whether to make letterFocus header,side-bar focus or 
    header and mainTargetDiv focus???? */
        letterFocus(e,topicTempId)
        
    });
});