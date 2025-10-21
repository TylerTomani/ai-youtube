// side-bar
// export function sideBarNav({e},sideBarFocused){ // Maybe true with boolean?? might be
import { sideBar, sideBarBtn } from "../ui/toggle-side-bar.js"

const sideBarLinks = document.querySelectorAll('.side-bar-links > li > a')
const subSideBarLinks = document.querySelectorAll('.side-bar-links > li > ol > li a')
const allSideBarLink = document.querySelector('.side-bar-links a')
let sideBarFocused = false
let iSideBarLinks = -1
let suppressIndexUpdate = false

sideBar.addEventListener('focusin', () => sideBarFocused = true)
sideBar.addEventListener('focusout', () => sideBarFocused = false)

// Run ONCE
sideBarLinks.forEach(el => {
    el.addEventListener('focus', () => {
        if (!suppressIndexUpdate) {
            iSideBarLinks = [...sideBarLinks].indexOf(el)
        }
    })
})

export function initSideBarNav({ e }) {
    let key = e.key.toLowerCase()
    if (!sideBarFocused) return

    if (!isNaN(key)) {
        const intLet = parseInt(key)
        sideBarLinks[intLet - 1]?.focus()
    }
    
    if (key === 'f') {
    suppressIndexUpdate = true;
    if (sideBarBtn.contains(e.target)) {
        iSideBarLinks = 0;
        sideBarLinks[0].focus();
    } else {
        iSideBarLinks = (iSideBarLinks === -1)
            ? 0
            : (iSideBarLinks + 1) % sideBarLinks.length;
        sideBarLinks[iSideBarLinks].focus();
    }
    suppressIndexUpdate = false;
}
    if (key === 'a') {
        suppressIndexUpdate = true
        iSideBarLinks = (iSideBarLinks - 1 + sideBarLinks.length) % sideBarLinks.length
        sideBarLinks[iSideBarLinks].focus()
        suppressIndexUpdate = false
    }


    if (key === 's') {
        iSideBarLinks = 0
    }
}
