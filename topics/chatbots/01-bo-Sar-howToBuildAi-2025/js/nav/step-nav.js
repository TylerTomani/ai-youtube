// step-nav.js
import { mainTargetDiv } from "./main-content-nav.js"
import { toggleSingleImage,toggleStepImages,denlargeAllImages } from "../ui/toggle-img-sizes.js"
import { changeTutorialLink } from "../ui/change-tutorial-link.js"
import { lastClickedSideBarLink } from "./side-bar-nav.js"
import { handleMKey } from "./m-key-handler.js"
// import {home}
let steps = []
let iSteps = 0
export let lastStep ;
let allImgs = [];

let iImgContainerImages = 0
let stepClicked = false
export let copyCodesStepFocused = false;
export function removeLastStep(){
    lastStep = null

}
export function initStepNavigation(mainTargetDiv){
    steps = [...mainTargetDiv.querySelectorAll('.step-float')]
    allImgs = Array.from(mainTargetDiv.querySelectorAll(".step-img > img,step-vid > video"));
    steps.forEach((step, index,arr) => {
        if (!step.dataset.listenerAdded) {
            step.setAttribute("tabindex", "0");
            step.addEventListener("focus", () => {
                // copyCodesStepFocused = false
                iSteps = index;
                iImgContainerImages = 0;
                // iCopyCodes = 0
                denlargeAllImages(allImgs);
                // pauseEnlargeAllVids(allVids)
                lastStep = step
                stepClicked = false
                if(index < arr.length - 1){
                    step.scrollIntoView({ behavior: 'smooth', block: 'center' })
                } else {
                    // last step
                    step.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }

            });
            step.addEventListener("focusin", () => {
                iSteps = index;
            })
            step.addEventListener("focusout", () => { denlargeAllImages(allImgs) })

            step.addEventListener("keydown", e => {
                let key = e.key.toLowerCase();
                if(key == 'm'){   
                }
                if (key === "enter") {
                }
            });
            // --- unified pointerdown for click/tap ---
            step.addEventListener("pointerdown", e => {
                if (e.target.tagName !== "IMG") {
                    denlargeAllImages(allImgs);
                    lastStep = step;
                }
            });
            // step.dataset.listenerAdded = "true";
        }
    });
}
export function handleStepNav({e, focusZone}){
    if(focusZone != 'mainTargetDiv') return
    let key = e.key
    if(!isNaN(key)){
        let intLet = parseInt(key)
        if(intLet <= steps.length){
            steps[intLet - 1 ].focus()
        }
    }
    /////////////
    //**
    // MAKE FOCUS ZONES for stepFocused and not !stepFocused
    //  */
    if(key === 's'){
        // if (lastClickedSideBarLink){
        //     lastClickedSideBarLink.focus()
        //     return
        // }
    }
    if (key === 'f') {
        iSteps = (iSteps + 1) % steps.length
        steps[iSteps].focus()
    }
    if (key === 'f' && e.target === mainTargetDiv) {
        iSteps = 0
        steps[iSteps].focus()
    }
    if (key === 'a') {
        iSteps = (iSteps - 1 + steps.length) % steps.length
        steps[iSteps].focus()
    }
    /////////////
    if(steps[iSteps]){
    } else{
        
    }
}
document.addEventListener('click', (e) => {
    const step = e.target.closest('.step-float');
    if (!step) return;
    // remove from all
    document.querySelectorAll('.step-float.selected').forEach(el => el.classList.remove('selected'));
    // add to the tapped one
    step.classList.add('selected');
});
