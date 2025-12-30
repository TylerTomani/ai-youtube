// toggle-img-sizes.js
let allImgs 
export function updateImgs(){
    allImgs = document.querySelectorAll('.step-img img, .step-vid video')
}
// --- Image handling ---
export function toggleSingleImage(img) {
    // denlargeAllImages()
    if(img){
        img.classList.toggle("enlarge");
        // img.style.zIndex = img.classList.contains("enlarge") ? 100 : 0;
    }
}
if(allImgs){

    allImgs.forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            toggleSingleImage(e.target)
        });
    })
}
export function toggleStepImages(step, e) {
    const images = Array.from(step.querySelectorAll(".step-img > img"));
    if (!images.length) return;
    if (images.length === 1) {
        toggleSingleImage(images[0]);
    } else {
        // Multi-image cycling
        if (currentIndex == 2) {
            step.focus();
            denlargeAllImages();
            currentIndex = 0;
        } else {
            denlargeAllImages();
            if (images[currentIndex]) {
                images[currentIndex].classList.add("enlarge");
                // images[currentIndex].style.zIndex = 100;
                currentIndex += 1;
            }
        }
    }

}
// --- Utility ---
export function denlargeAllImages() {
    allImgs.forEach(img => {
        if (img.classList.contains('enlarge')) img.classList.remove("enlarge");
        img.style.zIndex = 0;
    });
    // allVids.forEach(vid => {
    //     if (vid.classList.contains('first-vid-enlarge')) vid.classList.remove("first-vid-enlarge");
    // })
}