export function getFocusZone({ e }) {
    const target = e.target;
    if (target.closest('.side-bar')) return 'sideBar';
    if (target.closest('.page-header')) return 'header';
    if (target.closest('#mainTargetDiv')) return 'mainTargetDiv';
    return null;
}
