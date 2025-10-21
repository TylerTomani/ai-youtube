import { sideBar, sideBarBtn } from "../ui/toggle-side-bar.js";

let sideBarLinks = [...document.querySelectorAll('.side-bar-links > li > a')];
let allSideBarLinks = [...document.querySelectorAll('.side-bar-links a')]; // all links including nested
let sideBarFocused = false;
let iSideBarLinks = -1;
let suppressIndexUpdate = false;

// Track focus
sideBar.addEventListener('focusin', () => sideBarFocused = true);
sideBar.addEventListener('focusout', () => sideBarFocused = false);

// Determine if an element is a subLink (nested inside li > ol > li)
function isSubLink(el) {
    return el.closest('.side-bar-links > li > ol > li a');
}

// Track index updates
allSideBarLinks.forEach((el, idx) => {
    el.addEventListener('focus', () => {
        if (!suppressIndexUpdate) {
            iSideBarLinks = idx;
        }
    });
});

// Dropdown toggle
allSideBarLinks.forEach(link => {
    if (link.classList.contains('drop-down')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const nextOl = link.nextElementSibling;
            if (nextOl && nextOl.tagName === 'OL') {
                nextOl.classList.toggle('show');
            }
        });
    }
});

// Main keyboard nav
export function initSideBarNav({ e }) {
    if (!sideBarFocused) return;
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

        if (sideBarBtn.contains(e.target)) {
            iSideBarLinks = 0;
        } else {
            iSideBarLinks = (iSideBarLinks + 1) % visibleLinks.length;
        }
        visibleLinks[iSideBarLinks].focus();
        suppressIndexUpdate = false;
    }

    // 'a' key moves backward
    if (key === 'a') {
        suppressIndexUpdate = true;

        if (iSideBarLinks === -1) iSideBarLinks = visibleLinks.length - 1;
        else iSideBarLinks = (iSideBarLinks - 1 + visibleLinks.length) % visibleLinks.length;

        visibleLinks[iSideBarLinks].focus();
        suppressIndexUpdate = false;
    }

    // 's' key: move from sublink back to parent top-level link
    if (key === 's') {
        const activeEl = document.activeElement;
        // console.log(isSubLink)
        if (isSubLink(activeEl)) {
            console.log('yes')
            const parentLink = activeEl.closest('.side-bar-links > li > ol > li')?.closest('li')?.querySelector('> a');
            if (parentLink) parentLink.focus();
        } else {
            // If top-level, reset index
            iSideBarLinks = 0;
        }
    }
}
