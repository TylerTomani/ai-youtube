const dropSnips = document.querySelectorAll('.drop-snips');

export function initDropDowns({e}) {
    

    let target;

    if (e.type === "keydown") {
        if ((e.key === "Enter" || e.key === " ") && document.activeElement.classList.contains("drop-down")) {
            e.preventDefault();
            target = document.activeElement;
        } else {
            // return; // ignore other keys
        }
    } else if (e.type === "click") {
        if (e.target.classList.contains('resource')) {
            window.location.href = e.target.href;
            return;
        } else {
            e.preventDefault();
            if (e.detail === 0) return; // ignore synthetic clicks
            target = e.target.closest(".drop-down");
            if (!target) return;
        }
    }

    // Only toggle the **immediate next <ol>** of the clicked drop-down
    // const nextOl = target.nextElementSibling;
    // if (nextOl && nextOl.classList.contains('drop-snips')) {
    //     nextOl.classList.toggle('show');
    //     nextOl.classList.toggle('hide');
    // }
    
}

export function hideTopicSnips() {
    dropSnips.forEach(el => {
        if (!el.classList.contains('show')) {
            el.classList.add('hide');
        }
    });
}
