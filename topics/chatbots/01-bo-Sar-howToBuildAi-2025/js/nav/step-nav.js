// step-nav.js
import { mainTargetDiv } from "./main-content-nav.js"
import { toggleSingleImage,toggleStepImages,denlargeAllImages } from "../ui/toggle-img-sizes.js"
import { getFocusZone } from "./get-focus-zone.js"
import { changeTutorialLink } from "../ui/change-tutorial-link.js"
import { lastClickedSideBarLink } from "./side-bar-nav.js"
import { handleMKey } from "./m-key-handler.js"
let steps = []
let copyCodes = []
let iSteps = 0
let iCopyCodes = 0
export let lastStep
export let lastFocusedMainEl
let allImgs = [];
let iImgContainerImages = 0
// I don't know if i need copyCodesStepsFocused ???
// export let copyCodesStepFocused = false;
let stepFocused = false 
let stepClicked = false

export function removeLastStep(){lastStep = null}
function updateCurrentCopyCodes({e}){
    copyCodes = e.target.querySelectorAll('.copy-code')
}
export function initStepNavigation({ mainTargetDiv}){
    steps = [...mainTargetDiv.querySelectorAll('.step-float')]
    allImgs = Array.from(mainTargetDiv.querySelectorAll(".step-img > img,step-vid > video"));
    steps.forEach((step, index,arr) => {
        if (!step.dataset.listenerAdded) {
            step.setAttribute("tabindex", "0");
            step.addEventListener("focus", () => {
                stepClicked = false
                iSteps = index;
                // maybe not iCopyCodes = 0
                iCopyCodes = 0
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
            step.addEventListener("focusin", () => { iSteps = index;})
            step.addEventListener("focusout", () => { denlargeAllImages(allImgs) })
            step.addEventListener("keydown", e => {
                let key = e.key.toLowerCase();
                if(key === 'm'){
                    step.focus()
                }
                if (key === "enter" ) {
                    const stepFloat = e.target.closest('.step-float')
                    const img = stepFloat.querySelector('img ,video')                 
                    if (!e.shiftKey){
                        updateCurrentCopyCodes({e})
                        stepClicked = !stepClicked
                        toggleSingleImage(img)
                        const firstCopyCode = e.target.querySelector('.copy-code')
                        if(img){
                            if(img.classList.contains('enlarge') && stepClicked){
                                if(firstCopyCode){
                                    firstCopyCode.focus()
                                }
                            }
                        } else {
                            if (firstCopyCode) {
                                firstCopyCode.focus()
                            }
                        }
                        lastStep = step
                    }else {
                        step.focus()
                        toggleSingleImage(img)
                    }
                    
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
    copyCodes.forEach((el,i) => {
        el.addEventListener('keydown', e => {
            let key = e.key.toLowerCase()
            console.log('here')
        });
        el.addEventListener('focus', e => {
            iCopyCodes = i
            lastFocusedMainEl = e.target
            console.log(lastFocusedMainEl)
        });
    })
}
export function handleStepNav({e, focusZone}){
    if(focusZone != 'mainTargetDiv') return
    let key = e.key
    if(!isNaN(key)){
        let intLet = parseInt(key)
        // console.log(stepClicked)
        if (!stepClicked){  
            if(intLet <= steps.length){
                steps[intLet - 1 ].focus()
            }
        } else if(stepClicked){
            if(copyCodes[intLet - 1]){
                copyCodes[intLet -1 ].focus()
            }
        }
    } 
    stepFocused = !stepFocused
    // console.log(stepFocused)
    /////////////
    //**
    // MAKE FOCUS ZONES for stepFocused and not !stepFocused
    //  */
    if(key === 's'){
        stepClicked = false
        if (lastClickedSideBarLink){
            lastClickedSideBarLink.focus()
            return
        }
    }
    if (key === 'f') {
        if(!stepClicked){
            iSteps = (iSteps + 1) % steps.length
            steps[iSteps].focus()
        } else if(stepClicked){
            console.log('here')
            iCopyCodes = (iCopyCodes + 1) % copyCodes.length
            if(copyCodes[iCopyCodes]){
                copyCodes[iCopyCodes].focus()
            }
        }
    }
    if (key === 'f' && e.target === mainTargetDiv) {
        if (!stepClicked) {  
            iSteps = 0
            steps[iSteps].focus()
        }
    }
    if (key === 'a') {
        if (!stepClicked) {  
            iSteps = (iSteps - 1 + steps.length) % steps.length
            steps[iSteps].focus()
        } else if(stepClicked){
            if(copyCodes[iCopyCodes]){

                iCopyCodes = (iCopyCodes - 1 + copyCodes.length) % copyCodes.length
                copyCodes[iCopyCodes].focus()
            }
        }
        else {
            // cycle through set of updated copyCodes
            const step = e.target.closest('.step-float')
            step.focus()
        }
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
