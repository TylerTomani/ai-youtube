// main-content-nav.js
import { navBarLessonTitle } from "../ui/toggle-side-bar.js";
export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedSideBarLink,lastFocusedSideBarLink } from "./side-bar-nav.js"
import { sideBarBtn } from "../ui/toggle-side-bar.js";
import { handleStepNav,lastStep } from "./step-nav.js";
import { letterFocus } from "./letter-focus.js";
// import { letterFocus } from "./letter-focus.js";
export function mainContentNav({ e, focusZone }){
    if (focusZone != 'mainTargetDiv') return 
    let key = e.key.toLowerCase()

    // Only block propagation for global nav keys

    if (key === 'm') {
        // if mainTargetDiv currently has focus → go back to last step
        if (document.activeElement != lastStep) {
            if(lastStep){
                lastStep.focus()
                return;
            }
        }
        if (document.activeElement != mainTargetDiv) {
            if(lastStep){
                lastStep.focus()
                return;
            }
        }
        // if a step is focused → move to mainTargetDiv
        if (document.activeElement.classList.contains('step-float')) {
            mainTargetDiv.focus();
            scrollTo(0, 0);
        }
        return;
    }

    
    if(key === 'n'){
        navBarLessonTitle.focus()
        return
    }
    if(key === 's'){
        // sideBarBtn.focus()
        console.log(lastClickedSideBarLink)
        lastClickedSideBarLink.focus()
        return
    }
    // THE PROBLEM IS IN handleStepNav.js
    // handleStepNav is in step-nav.js
    handleStepNav({ e, focusZone })
    // letterFocus({ e, focusZone })

}

