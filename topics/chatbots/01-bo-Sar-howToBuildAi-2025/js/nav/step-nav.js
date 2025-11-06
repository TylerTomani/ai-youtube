// step-nav.js
import { mainTargetDiv } from "./main-content-nav.js"
import { toggleSingleImage,toggleStepImages,denlargeAllImages } from "../ui/toggle-img-sizes.js"
import { changeTutorialLink } from "../ui/change-tutorial-link.js"
let steps = []
let iSteps = 0
export let lastStep = null;
let allImgs = [];

let iImgContainerImages = 0
let stepClicked = false
export let copyCodesStepFocused = false;
export function initStepNavigation(mainTargetDiv){
    console.log('once')
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
                const hasVideo = step.querySelector('video') ? true : false
                if (hasVideo) {
                    const vid = step.querySelector('video')
                    // console.log(vid.currentTime)
                    // handleVideo({ vid, e, steps, allVids })
                    changeTutorialLink(e.target)
                    // const copyCodes = document.querySelectorAll('.copy-code, a')
                    if (key === 'enter') {
                        // copyCodesStepFocused = true
                    }

                    return
                }

                if (key === "enter") {
                    toggleStepImages(step, e);
                    step.scrollIntoView({ behavior: 'instant', block: 'center' });
                    const firstCopyCode = e.target.querySelector('.copy-code')
                    // copyCodesStepFocused = true
                    if (step == lastStep && stepClicked) {
                        copyCodesStepFocused = true
                        firstCopyCode?.focus()
                    }
                    changeTutorialLink(e.target)
                    lastStep = step
                    stepClicked = true
                }
                if (key === 'm') {
                    if (!copyCodesStepFocused) {
                        mainTargetDiv.focus()
                        // console.log('line 60 step-txt.js breaking code');
                        // This was breaking code
                        // body.scrollIntoView({ behavior: 'instant', block: 'start'})
                    } else {
                        step.focus()
                    }
                }

            });
            // --- unified pointerdown for click/tap ---
            step.addEventListener("pointerdown", e => {
                e.preventDefault();
                e.stopPropagation();
                if (e.target.tagName !== "IMG") {
                    denlargeAllImages(allImgs);
                    lastStep = step;
                    changeTutorialLink(e.target)
                }
            });
            step.dataset.listenerAdded = "true";
        }
    });
}

export function handleStepNav({e, focusZone}){
    if(focusZone != 'mainTargetDiv') return
    console.log('handle Step Nav pressed')
    let key = e.key

    if(!isNaN(key)){
        let intLet = parseInt(key)
        steps[intLet - 1 ].focus()
    }
    
    
}
