// playStepVid.js
let playing = false;

function playPauseVideo({ vid }) {
    if(vid){
        if (vid && playing) {
            vid.play();
        } else {
            vid.pause();
        }
    }
}

export function videoControls({ vid, e }) {
    let key = e.keyCode;
    // playing = vidKeyCntrl({ vid, e, key });  // IMPORTANT FIX
    vidKeyCntrl({vid,e,key})
    console.log(playing)
}

function vidKeyCntrl({ vid, e, key }) {
    switch (key) {
        case 13: // Enter
            if (!vid.classList.contains('enlarge')) {
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