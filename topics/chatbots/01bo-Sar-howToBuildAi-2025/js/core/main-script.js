import { letterFocus } from "../nav/letter-focus.js";
import { initSideBarNav } from "../nav/side-bar-nav.js";
import { getFocusZone } from "../nav/get-focus-zone.js";
import { initDropDowns } from "../ui/drop-downs-sidebar-temp.js";

// Initialize drop-downs
addEventListener('DOMContentLoaded', (e) => {
    initDropDowns({e});

    // Keydown listener for the whole page
    addEventListener('keydown', e => {
        const focusZone = getFocusZone({ e });
        // Letter navigation works for all zones
        letterFocus({ e, focusZone });

        // Only custom handling for sidebar or mainTargetDiv
        switch (focusZone) {
            case 'header':
                if (document.activeElement.tagName === 'A' && e.key.toLowerCase() === 'enter') {
                    // Let it navigate naturally
                    // You can also explicitly do: 
                    window.location.href = document.activeElement.href;
                    return; // exit switch so nothing else interferes
                }
                break;
            case 'sideBar':
                initSideBarNav({ e });
                break;
            case 'mainTargetDiv':
                // Any custom main content keyboard logic here
                break;

        }
    });
});
