let focusZone 
export function getFocusZone({e}){
    const eTarget = e.target
    
    if(eTarget.closest('.side-bar')){
        console.log(eTarget.closest('.side-bar'))
        focusZone = 'sidebar'

    }
    return focusZone

}