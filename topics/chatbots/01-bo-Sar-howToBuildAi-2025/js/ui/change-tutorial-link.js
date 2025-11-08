export function changeTutorialLink(e) {
    const targetLink = e.target
    console.log(e.target)
    const vidBase = targetLink.getAttribute("data-video");
    console.log(vidBase)
    const ts = targetLink.getAttribute("data-timestamp");
    let vidHref = vidBase;
    if (ts) {
        vidHref += (vidBase.includes("?") ? "&" : "?") + `t=${ts}s`;
        tutorialLink.href = vidHref;
    }
}