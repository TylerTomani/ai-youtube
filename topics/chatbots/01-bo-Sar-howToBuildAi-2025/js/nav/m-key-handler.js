// m-key-handler.js
import { lastStep } from "./step-nav.js";
import { mainTargetDiv } from "./main-content-nav.js";
export function handleMKey({e,focusZone}) {
    e.preventDefault();
    e.stopPropagation();
    // console.log(focusZone)
    // 1. If there is a lastStep → ALWAYS go there
    if(focusZone != 'mainTargetDiv'){
        if(lastStep){
            lastStep.focus()
        } else if(document.contains(mainTargetDiv)){
            mainTargetDiv.focus()
        }
    }
    // 2. Otherwise ALWAYS go to mainTargetDiv
    if (focusZone === 'mainTargetDiv'){
        if (e.target === lastStep){
            mainTargetDiv.focus()
            mainTargetDiv.scrollIntoView({behavior:'instant',block:'start'});
            return
        } else
        if(e.target === mainTargetDiv){
            if(lastStep){
                lastStep.focus()
                return
            } 
        }
    }
}
