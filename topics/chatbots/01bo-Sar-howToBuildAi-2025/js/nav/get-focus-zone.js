//  get-focus-zone.js
export function getFocusZone({ e, el } = {}) {
    const target = el || e?.target || document.activeElement;

    if (!target) return null;

    if (target.closest('header')) return 'header';
    if (target.closest('aside.side-bar')) return 'sideBar';
    if (target.closest('#mainTargetDiv')) return 'mainTargetDiv';

    return null;
}
