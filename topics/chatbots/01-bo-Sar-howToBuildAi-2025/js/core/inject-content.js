// inject-content.js
import { mainTargetDiv } from "../nav/main-content-nav.js";
import { initStepNavigation } from "../nav/step-nav.js";
// import { addCopyCode } from "../ui/copy-code.js";
// const nxtBtn = document.querySelector('nxtBtn')
// const prevBtn = document.querySelector('prevBtn')
// nxtBtn.addEventListener('click', injectContent);
export function injectContent(href) {
    
    fetch(href)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.text();
        })
        .then(html => {
            // Insert HTML into the main container
            mainTargetDiv.innerHTML = html; 
            initStepNavigation(mainTargetDiv)

            // Update nav lesson title if available
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            // const headerH3 = doc.querySelector('#targetHeaderh3');
            // if (headerH3 && navLessonTitle) navLessonTitle.textContent = headerH3.textContent;

            // Initialize step navigation & copy-code buttons
            // initStepNavigation(mainTargetDiv, sidebarLinks, iSideBarLinks);
            // addCopyCode();

            // Optional callback after injection
            if (typeof callback === "function") callback();
        })
        .catch(err => {
            console.error('Failed to load content:', err);
        });
}
