// m-key-handler.js
import { lastStep } from "./step-nav.js";
import { mainTargetDiv } from "./main-content-nav.js";

export function handleMKey(e) {
    e.preventDefault();
    e.stopPropagation();

    // 1. If there is a lastStep → ALWAYS go there
    if (lastStep && document.body.contains(lastStep)) {
        lastStep.focus();
        return;
    }

    // 2. Otherwise ALWAYS go to mainTargetDiv
    if (mainTargetDiv && document.body.contains(mainTargetDiv)) {
        mainTargetDiv.focus();
    }
}
