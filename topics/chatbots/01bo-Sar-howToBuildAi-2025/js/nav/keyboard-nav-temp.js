let focusZone = 'sideBar'
export function getFocusZone({e}){
    const eTarget = e.target
    if(eTarget.closest('.side-bar')){
        focusZone = 'sideBar'
    }
    if(eTarget.closest('.page-header')){
        focusZone = 'header'
    }
    if(eTarget.closest('#mainTargetDiv')){
        focusZone = 'mainTargetDiv'
    }
    return focusZone

}