// letter-focus.js (module scope)
let lastLetterPressed = null;

export function letterFocus({ e, focusZone }) {
    if (!e || !e.key) return;

    // Ignore typing fields and modifier keys
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    const key = e.key.toLowerCase();
    if (key.length !== 1 || !/^[a-z0-9]$/.test(key)) return;

    // Determine which elements to focus
    let allEls = [...document.querySelectorAll('a, [id]')].filter(el => {
        const rect = el.getBoundingClientRect();
        return el.offsetParent !== null && rect.width > 0 && rect.height > 0;
    });

    // Automatically skip header links
    // if (focusZone === 'header') {
    //     allEls = allEls.filter(el => !(el.tagName === 'A' && el.closest('.page-header')));
    // }

    // Only consider elements whose ID starts with the pressed key
    const matching = allEls.filter(el => el.id.toLowerCase().startsWith(key));
    if (matching.length === 0) return;

    const activeEl = document.activeElement;
    let activeIndex = matching.indexOf(activeEl);

    let newIndex;
    if (key !== lastLetterPressed) {
        newIndex = e.shiftKey ? matching.length - 1 : 0;
    } else {
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

    if (typeof target.focus !== 'function') {
        target.setAttribute('tabindex', '-1');
    }
    target.focus();

    lastLetterPressed = key;

    // ✅ If it’s a header link, allow normal activation
    if (focusZone === 'header' && target.tagName === 'A') {
        // Do nothing special here — Enter or click will open the href naturally
        // Optionally you could add a small visual cue for focus
        target.style.outline = '2px solid blue';

    }
}
