
import { letterFocus } from "../nav/letter-focus.js";
// import { letterFocus } from "../nav/keyboard-nav.js";

import { getFocusZone } from "../nav/keyboard-nav-temp.js";

addEventListener('DOMContentLoaded', (e) => {

    // I NEED?? To put this logic for focusZone in keyboar-nav???

    // Assign FocusZones evenListens('focus')
    addEventListener('keydown', e => {
    // case 'sideBar':
    
    // case 'mainTargetDiv:
        const focusZone = getFocusZone({e})
        // console.log(focusZone  )
        // **
    /* default: (maybe)** NOT Sure whether to make letterFocus header,side-bar focus or 
    header and mainTargetDiv focus???? */
        letterFocus({e})
        
    });
});