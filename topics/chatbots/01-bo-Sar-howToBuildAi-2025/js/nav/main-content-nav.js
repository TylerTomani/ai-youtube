// main-content-nav.js
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedSideBarLink,lastFocusedSideBarLink } from "./side-bar-nav.js"
import { sideBarBtn } from "../ui/toggle-side-bar.js";
import { lastStep } from "./step-nav.js";
export function mainContentNav({ e, focusZone }){
    if (focusZone != 'mainTargetDiv') return 
    let key = e.key.toLowerCase()
    e.preventDefault()
    e.stopPropagation()
    if(e.target == mainTargetDiv && key === 'm'){
        // scrollTo(0,0)
        lastStep.focus()
        return 
    }
    if(e.target != mainTargetDiv && key === 'm'){
        scrollTo(0,0)
        return 
    }
    if(key === 's'){
        sideBarBtn.focus()
    }

    
}

