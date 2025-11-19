// main-content-nav.js
import { navBarLessonTitle } from "../ui/toggle-side-bar.js";
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedSideBarLink,lastFocusedSideBarLink } from "./side-bar-nav.js"
import { sideBarBtn } from "../ui/toggle-side-bar.js";
import { handleStepNav,lastStep } from "./step-nav.js";
export function mainContentNav({ e, focusZone }){
    if (focusZone != 'mainTargetDiv') return 
    let key = e.key.toLowerCase()

    // Only block propagation for global nav keys
    if (['s', 'n', 'm'].includes(key)) {
        e.preventDefault()
        e.stopPropagation()
        return
    }

    if (key === 'm') {
        // if mainTargetDiv currently has focus → go back to last step
        if (document.activeElement === mainTargetDiv && lastStep) {
            lastStep.focus();
        }
        // if a step is focused → move to mainTargetDiv
        else if (document.activeElement.classList.contains('step-float')) {
            mainTargetDiv.focus();
            scrollTo(0, 0);
        }
        // fallback: scroll to top
        else {
            // scrollTo(0, 0);
        }
        return;
    }

    // if(e.target != mainTargetDiv && key === 'm'){
    //     scrollTo(0,0)
    //     return 
    // }
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

