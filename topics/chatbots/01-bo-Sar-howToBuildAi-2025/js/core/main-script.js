// main-script.js
import { letterFocus } from "../nav/letter-focus.js";
import { sideBarNav } from "../nav/side-bar-nav.js";

import { getFocusZone } from "../nav/get-focus-zone.js";
import { initDropDowns, } from "../ui/drop-downs-sidebar-temp.js";

// step-navigation
import { handleStepNav } from "../nav/step-nav.js";
// uis
import { initToggleSidebar } from "../ui/toggle-side-bar.js";
import { lastClickedSideBarLink,lastFocusedSideBarLink } from "../nav/side-bar-nav.js";
import { mainContentNav } from "../nav/main-content-nav.js";

// Initialize drop-downs
addEventListener('DOMContentLoaded', (e) => {
    // Detect initial focus zone
    initDropDowns({e});
    const initialZone = getFocusZone({ el: document.activeElement });

    // Pass the initialZone to any scripts that need it
    if (initialZone === 'sideBar') sideBarNav({e, focusZone: initialZone });
    letterFocus({ e, focusZone: initialZone });
    initToggleSidebar({e})
    
    // Keydown listener for the whole page
    addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        const focusZone = getFocusZone({ e });
        // Letter navigation works for all zones
        letterFocus({ e, focusZone });
        // Only custom handling for sidebar or mainTargetDiv
        switch (focusZone) {
            case 'header':
                // don't need this i think ??        
                letterFocus({ e, focusZone });
                break;
            case 'sideBar':
                sideBarNav({ e , focusZone});
                break;
            case 'mainTargetDiv':
                // Any custom main content keyboard logic here
                mainContentNav({e,focusZone})
                // 
                //** We initialize new steps with initStepNavigation(mainTargetDiv) in
                // inject-content.js  and use in handleStepNav in step-nav.js
                //  */
                handleStepNav({e, focusZone})
                break;

        }
    });
});
