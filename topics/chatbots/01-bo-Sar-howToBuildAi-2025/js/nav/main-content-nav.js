// main-content-nav.js
import { navBarLessonTitle } from "../ui/toggle-side-bar.js";
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedSideBarLink,lastFocusedSideBarLink } from "./side-bar-nav.js"
import { sideBarBtn } from "../ui/toggle-side-bar.js";
import { handleStepNav,lastStep } from "./step-nav.js";
export function mainContentNav({ e, focusZone }){
    if (focusZone != 'mainTargetDiv') return 
    let key = e.key.toLowerCase()
    e.preventDefault()
    e.stopPropagation()
    if(e.target == mainTargetDiv && key === 'm'){        
        if(lastStep){
            lastStep.focus()
            return 
        }
        scrollTo(0,0)
    }
    if(e.target != mainTargetDiv && key === 'm'){
        scrollTo(0,0)
        return 
    }
    if(key === 'n'){
        navBarLessonTitle.focus()
        return
    }
    if(key === 's'){
        sideBarBtn.focus()
        console.log('here')
        return
    }
    // THE PROBLEM IS IN handleStepNav.js
    // handleStepNav is in step-nav.js
    handleStepNav({ e, focusZone })
}

