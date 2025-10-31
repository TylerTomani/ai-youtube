export const mainTargetDiv = document.querySelector('#mainTargetDiv')
import { lastClickedSideBarLink,lastFocusedSideBarLink } from "./side-bar-nav.js"
import { sideBarBtn } from "../ui/toggle-side-bar.js";
export function mainContentNav({ e, focusZone }){
    if (focusZone != 'mainTargetDiv') return 
    addEventListener('keydown', e => {
        let key = e.key.toLowerCase()
        if(key === 's'){
            // if(lastClickedSideBarLink){
            //     lastClickedSideBarLink.focus()
            // } else if(lastFocusedSideBarLink){
            //     lastFocusedSideBarLink.focus()
            // } else {
            //     sideBarBtn.focus()
            //     console.log(sideBarBtn)
            //     console.log('yes')
            // }
        }
    });

}