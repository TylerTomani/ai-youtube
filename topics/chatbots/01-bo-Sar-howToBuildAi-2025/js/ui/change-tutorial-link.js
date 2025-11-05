export function changeTutorialLink(targetLink) {
    const vidBase = targetLink.getAttribute("data-video");
    const ts = targetLink.getAttribute("data-timestamp");
    let vidHref = vidBase;
    if (ts) {
        vidHref += (vidBase.includes("?") ? "&" : "?") + `t=${ts}s`;
        tutorialLink.href = vidHref;
    }
}