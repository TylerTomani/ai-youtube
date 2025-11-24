// main-content-nav.js
import { handleMKey } from "./m-key-handler.js";
import { mainContainer,navBarLessonTitle } from "../ui/toggle-side-bar.js";
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedSideBarLink,lastFocusedSideBarLink } from "./side-bar-nav.js"
import { sideBarBtn,sideBar } from "../ui/toggle-side-bar.js";
import { handleStepNav,lastStep } from "./step-nav.js";
import { letterFocus } from "./letter-focus.js";
// import { letterFocus } from "./letter-focus.js";
export function mainContentNav({ e, focusZone }){
    let key = e.key.toLowerCase()
    if (key === 'm') {
        handleMKey({e,focusZone})
        return;
    }
    // Only block propagation for global nav keys
    if(key === 'n'){
        navBarLessonTitle.focus()
        return
    }
    if(key === 's'){
        if(!mainContainer.classList.contains('collapsed')) {
            lastClickedSideBarLink.focus()
            return
        }
        if (mainContainer.classList.contains('collapsed')){
            sideBarBtn.focus()
        }
        return
    }
    // THE PROBLEM IS IN handleStepNav.js
    handleStepNav({ e, focusZone })
}

