
import { letterFocus } from "../nav/letter-focus.js";
import { sideBarNav } from "../nav/side-bar-nav.js";
// import { letterFocus } from "../nav/keyboard-nav.js";

import { getFocusZone } from "../nav/keyboard-nav-temp.js";

addEventListener('DOMContentLoaded', (e) => {

    // I NEED?? To put this logic for focusZone in keyboar-nav???

    // Assign FocusZones evenListens('focus')
    addEventListener('keydown', e => {
    // case 'sideBar':
    
    // case 'mainTargetDiv:
        const focusZone = getFocusZone({e})
        console.log(focusZone)
        // **
    /* default: (maybe)** NOT Sure whether to make letterFocus header,side-bar focus or 
    header and mainTargetDiv focus???? */
    switch (focusZone){
        case 'header': 
            sideBarNav({e})
            letterFocus({ e })
        case 'sideBar' :
            letterFocus({ e })
            sideBarNav({e})
            break
        case 'mainTargetDiv':
            // sideBarNavigation({e})
            console.log('maintaget focused')
            letterFocus({e})
            break
    }
        
    });
});