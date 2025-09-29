// letter-focus.js (module scope)
let lastLetterPressed = null;

// export keeps same call signature used in your main script: letterFocus({ e })
export function letterFocus({ e }) {
    if (!e || !e.key) return;

    // ignore typing/editing and modifier combos (allow Shift)
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    const key = e.key.toLowerCase();
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    // gather visible anchors and id'd elements that have an id
    const allEls = [...document.querySelectorAll('a, [id]')].filter(el => {
        if (!el.id) return false;                 // require an id for matching
        const rect = el.getBoundingClientRect();
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    const matching = allEls.filter(el => el.id.toLowerCase().startsWith(key));
    if (matching.length === 0) return;

    // prefer actual focused element when computing where we are
    const activeEl = document.activeElement;
    let activeIndex = matching.indexOf(activeEl);

    let newIndex;
    if (key !== lastLetterPressed) {
        // fresh letter press → go to first (or last with Shift)
        newIndex = e.shiftKey ? matching.length - 1 : 0;
    } else {
        // same letter → cycle forward/back
        if (activeIndex === -1) {
            newIndex = e.shiftKey ? matching.length - 1 : 0;
        } else {
            newIndex = e.shiftKey
                ? (activeIndex - 1 + matching.length) % matching.length
                : (activeIndex + 1) % matching.length;
        }
    }

    const target = matching[newIndex];
    if (!target) return;

    // ensure focusable then focus
    if (typeof target.focus !== 'function') {
        target.setAttribute('tabindex', '-1');
    }
    target.focus();

    lastLetterPressed = key;
}
