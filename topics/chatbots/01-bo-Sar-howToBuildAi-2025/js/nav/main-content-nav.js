// main-content-nav.js
import { handleMKey } from "./m-key-handler.js";
import { navBarLessonTitle } from "../ui/toggle-side-bar.js";
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedSideBarLink,lastFocusedSideBarLink } from "./side-bar-nav.js"
import { sideBarBtn } from "../ui/toggle-side-bar.js";
import { handleStepNav,lastStep } from "./step-nav.js";
import { letterFocus } from "./letter-focus.js";
// import { letterFocus } from "./letter-focus.js";
export function mainContentNav({ e, focusZone }){
    let key = e.key.toLowerCase()
    if (key === 'm') {
        handleMKey(e)
        return;
    }
    if (focusZone != 'mainTargetDiv') return 
    console.log(' main-content-nav.js')
    // Only block propagation for global nav keys
    if(key === 'n'){
        navBarLessonTitle.focus()
        return
    }
    if(key === 's'){
        // sideBarBtn.focus()
        lastClickedSideBarLink.focus()
        return
    }
    // THE PROBLEM IS IN handleStepNav.js
    // handleStepNav is in step-nav.js
    handleStepNav({ e, focusZone })
    // letterFocus({ e, focusZone })

}

