// playStepVid.js
let playing = false;

function playPauseVideo({ vid }) {
    if (!vid) return
    if(vid){
        if (vid && playing) {
            vid.play();
        } else {
            vid.pause();
        }
    }
}

export function videoControls({ vid, e }) {
    if (!vid) return
    let key = e.keyCode;
    vidKeyCntrl({vid,e,key})
}

function vidKeyCntrl({ vid, e, key }) {
    if(!vid)return
    switch (key) {
        case 13: // Enter
            if (vid.classList.contains('enlarge')) {
                playing = true;
            }
            break;
        case 32: // Space
            e.preventDefault();
            if (vid.currentTime === vid.duration) {
                vid.currentTime = 0;
                playing = false;
            } else {
                playing = !playing;
            }
            break;
        case 37: // Left arrow
            vid.currentTime -= 0.5;
            playing = true;
            break;
        case 39: // Right arrow
            vid.currentTime += 0.5;
            playing = true;
            break;
    }
    playPauseVideo({ vid });
    return playing;
}


export function pauseAllVideos({ allVids }) {
    if (!allVids || !allVids.forEach) return;
    allVids.forEach(vid => {
        vid.classList.remove("enlarge");
        vid.classList.remove("first-vid-enlarge");
        vid.style.border = "none";
        if (!vid.paused) {
            vid.pause();
        }
    });
}

export function toggleVideoSizeClick({ vid, e, steps, stepFloat }) {
    if (!vid) return
    // e.preventDefault()
    // // if (e.target === steps[0] || stepFloat == steps[0]) {
    // //     vid.classList.add('first-vid-enlarge');
    // // } else {
    // // }
    // videoControls({ vid, e })
    // e.target.scrollIntoView({ behavior: 'instant', block: 'center' });
    // console.log(vid)
    // if(vid.classList.contains('enlarge')){
    //     vid.classList.remove('enlarge')
    // }else {
    //     vid.classList.add('enlarge')
    // }
}