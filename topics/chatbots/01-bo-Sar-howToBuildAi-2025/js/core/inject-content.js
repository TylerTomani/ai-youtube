// inject-content.js
let iAllSideBarLinks = 0
import { allSideBarLinks,lastClickedSideBarLink,updateLastClicked,getHrefFromLink } from "../nav/side-bar-nav.js";
import { mainTargetDiv } from "../nav/main-content-nav.js";
import { initStepNavigation } from "../nav/step-nav.js";
import { removeLastStep } from "../nav/step-nav.js";
import { handleSKeySideBarNav } from "./main-script.js";

import { updateImgs } from "../ui/toggle-img-sizes.js";
import { addCopyCode } from "../ui/copy-code.js";
export const nxtBtn = document.querySelector('#endNxtBtn')
export const prevBtn = document.querySelector('#prevBtn')
// nxtBtn.addEventListener('click', e => {})
nxtBtn.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (key === 'm') mainTargetDiv.focus();
    if (key === 's') handleSKeySideBarNav(e);

    // move forward
    if (key === 'enter') {
        e.preventDefault()
        e.stopPropagation()
        // start from the last clicked link
        iAllSideBarLinks = allSideBarLinks.indexOf(lastClickedSideBarLink);
        iAllSideBarLinks = (iAllSideBarLinks + 1) % allSideBarLinks.length;
        updateLastClicked(allSideBarLinks[iAllSideBarLinks])
        const href = getHrefFromLink(allSideBarLinks[iAllSideBarLinks])
        if (href) {
            injectContent(href);
        }
    }
    
});
nxtBtn.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    iAllSideBarLinks = allSideBarLinks.indexOf(lastClickedSideBarLink);
    iAllSideBarLinks = (iAllSideBarLinks + 1) % allSideBarLinks.length;
    updateLastClicked(allSideBarLinks[iAllSideBarLinks])
    const href = getHrefFromLink(allSideBarLinks[iAllSideBarLinks])
    if (href) {
        injectContent(href);
    }
});
// move backward
prevBtn.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();
    if (key === 'm') mainTargetDiv.focus();
    if (key === 's') handleSKeySideBarNav(e);
    if (key === 'enter') {
        iAllSideBarLinks = (iAllSideBarLinks - 1 + allSideBarLinks.length) % allSideBarLinks.length;
        updateLastClicked(allSideBarLinks[iAllSideBarLinks])
        const href = getHrefFromLink(allSideBarLinks[iAllSideBarLinks])
        if (href) {
            injectContent(href);
        }
    }
});
prevBtn.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    iAllSideBarLinks = (iAllSideBarLinks - 1 + allSideBarLinks.length) % allSideBarLinks.length;
    updateLastClicked(allSideBarLinks[iAllSideBarLinks])
    const href = getHrefFromLink(allSideBarLinks[iAllSideBarLinks])
    if (href) {
        injectContent(href);
    }
});

export function injectContent(href) {
    fetch(href)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(html => {
            // Insert HTML into the main container
            mainTargetDiv.innerHTML = html; 
            initStepNavigation({ mainTargetDiv})
            removeLastStep()
            addCopyCode()
            // Update nav lesson title if available
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            updateImgs()
            // const headerH3 = doc.querySelector('#targetHeaderh3');
            // if (headerH3 && navLessonTitle) navLessonTitle.textContent = headerH3.textContent;
            // Initialize step navigation & copy-code buttons
            // initStepNavigation(mainTargetDiv, sidebarLinks, iSideBarLinks);
            // addCopyCode();
            // Optional callback after injection
            if (typeof callback === "function") callback();
        })
        // .catch(err => {console.error('Failed to load content:', err);});
}
