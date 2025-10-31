// side-bar-nav.js
import { sideBar, sideBarBtn } from "../ui/toggle-side-bar.js";
import { injectContent } from "../core/inject-content.js";
let sideBarLinks = [...document.querySelectorAll('.side-bar-links > li > a')];
let allSideBarLinks = [...document.querySelectorAll('.side-bar-links a')]; // all links including nested
let sideBarFocused = true;
let iSideBarLinks = -1;
let suppressIndexUpdate = false;
export let lastClickedSideBarLink = null
export let lastFocusedSideBarLink = null

// Track focus
sideBar.addEventListener('focusin', () => sideBarFocused = true);
sideBar.addEventListener('focusout', () => sideBarFocused = false);

// Determine if an element is a subLink (nested inside li > ol > li)
function isSubLink(el) {
    return el.closest('.side-bar-links > li > ol > li a');
}

// Track index updates
allSideBarLinks.forEach((el, i) => {
    if(el.hasAttribute('autofocus')){
        lastFocusedSideBarLink = el
    }
    el.addEventListener('focus', (e) => {
        lastFocusedSideBarLink = e.target
        if (!suppressIndexUpdate) {
            iSideBarLinks = i;
        }
    });
    el.addEventListener('click', (e) => {
        lastClickedSideBarLink = e.target
        // if (!suppressIndexUpdate) {
        //     iSideBarLinks = i;
        // }
    });
    el.addEventListener('keydown', injectContent);
});

// Dropdown toggle
allSideBarLinks.forEach(link => {
    if (link.classList.contains('drop-down')) {
        link.addEventListener('click', (e) => {
            e.stopPropagation()
            const nextOl = link.nextElementSibling;
            if (nextOl && nextOl.tagName === 'OL') {
                nextOl.classList.toggle('show');
            }
        });
    } else {
        link.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
        })
    }
});

// Main keyboard nav
export function sideBarNav({ e , focusZone}) {
    // if (!sideBarFocused) return;
    if(focusZone != 'sideBar') return 

    if(!e || !e.key) return 
    const key = e.key.toLowerCase();

    // Number keys
    if (!isNaN(key)) {
        const intLet = parseInt(key);

        const activeEl = document.activeElement;

        // Sublist logic
        if (isSubLink(activeEl)) {
            const currentSubList = activeEl.closest('ol'); // the current ol
            const subLinks = [...currentSubList.querySelectorAll('li > a')].filter(a => a.offsetParent !== null);
            subLinks[intLet - 1]?.focus();
        } else {
            // Top-level links
            sideBarLinks[intLet - 1]?.focus();
        }
        return;
    }
    const visibleLinks = allSideBarLinks.filter(link => link.offsetParent !== null);
    // 'f' key moves forward
    if (key === 'f') {
        suppressIndexUpdate = true;

        // Refresh visibleLinks
        const visibleLinks = allSideBarLinks.filter(link => link.offsetParent !== null);
        const activeEl = document.activeElement;

        // Find current position *within* visibleLinks
        let currentVisibleIndex = visibleLinks.indexOf(activeEl);

        // Move forward (wrap around if needed)
        const nextIndex = (currentVisibleIndex + 1) % visibleLinks.length;

        // Focus the next visible link
        visibleLinks[nextIndex].focus();

        // Update global index to match new focus
        iSideBarLinks = allSideBarLinks.indexOf(visibleLinks[nextIndex]);

        suppressIndexUpdate = false;
    }

    // 'a' key moves backward
    if (key === 'a') {
        suppressIndexUpdate = true;

        const visibleLinks = allSideBarLinks.filter(link => link.offsetParent !== null);
        const activeEl = document.activeElement;

        let currentVisibleIndex = visibleLinks.indexOf(activeEl);
        const prevIndex = (currentVisibleIndex - 1 + visibleLinks.length) % visibleLinks.length;

        visibleLinks[prevIndex].focus();

        iSideBarLinks = allSideBarLinks.indexOf(visibleLinks[prevIndex]);

        suppressIndexUpdate = false;
    }

    // 's' key: move from sublink back to parent top-level link
    if (key === 's') {
        /////////////////////////////////
        //** Will NEED to implement this into mainTargetDiv Focus as well
        // some way */ 
        if (e.target == sideBarBtn) {
            if(lastClickedSideBarLink){
                lastClickedSideBarLink.focus()
                return 
            } else if(lastFocusedSideBarLink){
                lastFocusedSideBarLink.focus()
                console.log(lastFocusedSideBarLink)
                return
            } else {
                return
            }
        }
        /////////////////////////////////
        const activeEl = document.activeElement;
        // If sublink, go to its parent top-level link
        if (isSubLink(activeEl)) {
            const ol = activeEl.closest('ol.drop-snips') || activeEl.closest('ol');
            const parentLi = ol?.closest('.side-bar-links > li') || ol?.closest('li');
            const parentLink = parentLi?.querySelector(':scope > a.drop-down') || parentLi?.querySelector(':scope > a');
            if (parentLink) {
                suppressIndexUpdate = true;
                parentLink.focus();
                // update index to parent's index explicitly so visible f/a navigation continues correctly
                iSideBarLinks = allSideBarLinks.indexOf(parentLink);
                suppressIndexUpdate = false;
                return;
            }
        }

        // If a drop-down link itself has focus, pressing 's' again moves to sidebar button
        if (activeEl && activeEl.classList && activeEl.classList.contains('drop-down')) {
            suppressIndexUpdate = true;
            sideBarBtn.focus();
            // set index to -1 or 0 depending on how you want f navigation to behave
            iSideBarLinks = -1;
            suppressIndexUpdate = false;
            return;
        }

        // Fallback: if not in sublink or drop-down, reset index
        iSideBarLinks = 0;
    }

}
