// step-nav.js
import { mainTargetDiv } from "./main-content-nav.js"
let steps = []
let iSteps = 0
export function initStepNavigation(mainTargetDiv){
    steps = [...mainTargetDiv.querySelectorAll('.step-float')]
}

export function handleStepNav({e, focusZone}){
    if(focusZone != 'mainTargetDiv') return
    let key = e.key
    if(!isNaN(key)){
        let intLet = parseInt(key)
        steps[intLet - 1 ].focus()
    }
    
}