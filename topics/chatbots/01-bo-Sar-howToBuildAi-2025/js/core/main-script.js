// main-script.js
import { letterFocus } from "../nav/letter-focus.js";
import { getFocusZone } from "../nav/get-focus-zone.js";
import { initDropDowns, } from "../ui/drop-downs-sidebar-temp.js";
// step-navigation
import { handleStepNav,lastStep } from "../nav/step-nav.js";
// uis
import { initToggleSidebar, sideBarBtn } from "../ui/toggle-side-bar.js";
import { sideBarNav,lastClickedSideBarLink,lastFocusedSideBarLink } from "../nav/side-bar-nav.js";
import { mainContentNav } from "../nav/main-content-nav.js";
export const navBarLessonTitle = document.querySelector('#navBarLessonTitle')
// Initialize drop-downs
addEventListener('DOMContentLoaded', (e) => {
    // Detect initial focus zone
    initDropDowns({e});
    const initialZone = getFocusZone({ el: document.activeElement });
    // Pass the initialZone to any scripts that need it
    if (initialZone === 'sideBar') sideBarNav({e, focusZone: initialZone });
    letterFocus({ e, focusZone: initialZone });
    initToggleSidebar({e})
    sideBarBtn.addEventListener('keydown', handleSKeySideBarNav);
    navBarLessonTitle.addEventListener('keydown', handleSKeySideBarNav);
    function handleSKeySideBarNav(e){
        console.log('here')
        let key = e.key.toLowerCase()
        if(key === 's'){
            e.preventDefault()
            e.stopPropagation()
            const dropSnips = lastClickedSideBarLink.closest('ul')
            if(lastClickedSideBarLink && !dropSnips.classList.contains('hide')){
                lastClickedSideBarLink.focus()
                return
            } else {
                lastFocusedSideBarLink.focus()   
            }
        }
    }
    // Keydown listener for the whole page
    addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        let focusZone = getFocusZone({ e });
        // Letter navigation works for all zones
        letterFocus({ e, focusZone });
        switch (focusZone) {
            case 'header':
                // don't need this i think ??        
                // letterFocus({ e , focusZone });
                break;
            case 'sideBar':
                sideBarNav({ e , focusZone});
                break;
            case 'mainTargetDiv':
                // Any custom main content keyboard logic here
                mainContentNav({ e , focusZone})
                // 
                //** We initialize new steps with initStepNavigation(mainTargetDiv) in
                // inject-content.js  and use in handleStepNav from step-nav.js
                // in main-content-nav.js
                //  */
                // handleStepNav is in step-nav.js
                break;

        }
    });
});
