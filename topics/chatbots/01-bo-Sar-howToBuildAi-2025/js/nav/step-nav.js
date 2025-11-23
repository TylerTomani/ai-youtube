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
export function initStepNavigation(mainTargetDiv){
    steps = [...mainTargetDiv.querySelectorAll('.step-float')]
    allImgs = Array.from(mainTargetDiv.querySelectorAll(".step-img > img"));
    steps.forEach((step, index) => {
        if (!step.dataset.listenerAdded) {
            step.setAttribute("tabindex", "0");

            step.addEventListener("focus", () => {
                copyCodesStepFocused = false
                iSteps = index;
                iImgContainerImages = 0;
                // iCopyCodes = 0
                denlargeAllImages(allImgs);
                // pauseEnlargeAllVids(allVids)
                lastStep = step
                stepClicked = false
                step.scrollIntoView({ behavior: 'smooth', block: 'center' })

            });
            step.addEventListener("focusin", () => {
                iSteps = index;
            })
            step.addEventListener("focusout", () => { denlargeAllImages(allImgs) })

            step.addEventListener("keydown", e => {
                let key = e.key.toLowerCase();
                // const hasVideo = step.querySelector('video') ? true : false
                // if (hasVideo) {
                //     const vid = step.querySelector('video')
                //     if (key === 'enter') {
                //         // copyCodesStepFocused = true
                //     }
                //     return
                // }
                if(key == 'm'){
                    e.preventDefault()
                    // handleMKey(e)
                    console.log('here')
                    console.log(mainTargetDiv)
                    
                }
                
                if (key === "enter") {
                    toggleStepImages(step, e);
                    // step.scrollIntoView({ behavior: 'instant', block: 'center' });
                    const firstCopyCode = e.target.querySelector('.copy-code')
                    // copyCodesStepFocused = true
                    if (step == lastStep && stepClicked) {
                        copyCodesStepFocused = true
                        firstCopyCode?.focus()
                    }
                    // changeTutorialLink(e.target)
                    lastStep = step
                    stepClicked = true
                }
                

            });
            // --- unified pointerdown for click/tap ---
            step.addEventListener("pointerdown", e => {
                e.preventDefault();
                e.stopPropagation();
                if (e.target.tagName !== "IMG") {
                    denlargeAllImages(allImgs);
                    lastStep = step;
                    // changeTutorialLink(e.target)
                }
            });
            step.dataset.listenerAdded = "true";
        }
    });
}

export function handleStepNav({e, focusZone}){
    // if(focusZone != 'mainTargetDiv') return
    let key = e.key
    if(!isNaN(key)){
        let intLet = parseInt(key)
        if(intLet <= steps.length){
            steps[intLet - 1 ].focus()
        }
    }
    /////////////
    //**
    // FIGURE OUT how to make header shortcuts work when mainTargetDiv has focus
    //  */
    if(key === 's'){
        console.log("'s' in step-nav ")
        console.log(lastClickedSideBarLink)
        if (lastClickedSideBarLink){
            lastClickedSideBarLink.focus()
            return
        }
    }
    if (key === 'f') {
        iSteps = (iSteps + 1) % steps.length
    }
    if (key === 'f' && e.target === mainTargetDiv) {
        iSteps = 0
    }
    if (key === 'a') {
        iSteps = (iSteps - 1 + steps.length) % steps.length
    }
    /////////////
    if(steps[iSteps]){

        steps[iSteps].focus()
    } else{
        
    }
    
    
}
