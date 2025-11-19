// step-nav.js
import { mainTargetDiv } from "./main-content-nav.js"
import { toggleSingleImage,toggleStepImages,denlargeAllImages } from "../ui/toggle-img-sizes.js"
import { changeTutorialLink } from "../ui/change-tutorial-link.js"
import { lastClickedSideBarLink } from "./side-bar-nav.js"
let steps = []
let iSteps = 0
export let lastStep = null;
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
                step.scrollIntoView({ behavior: 'instant', inline: 'center' })

            });
            step.addEventListener("focusin", () => {
                iSteps = index;
            })
            step.addEventListener("focusout", () => { denlargeAllImages(allImgs) })

            step.addEventListener("keydown", e => {
                let key = e.key.toLowerCase();
                console.log('here')
                

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
    if(focusZone != 'mainTargetDiv') return
    let key = e.key
    if(!isNaN(key)){
        let intLet = parseInt(key)
        if(intLet <= steps.length){
            steps[intLet - 1 ].focus()
        }
    }
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
    if (key === 'a') {
        iSteps = (iSteps - 1 + steps.length) % steps.length
    }
    if(key === 'f' && e.target === mainTargetDiv){
        iSteps = 0

    }
    steps[iSteps].focus()
    
    
}
