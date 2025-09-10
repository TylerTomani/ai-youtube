// drop-downs.js
function initDropDowns() {
    document.addEventListener("click", handleToggle);
    document.addEventListener("keydown", handleToggle);
    function handleToggle(e) {
        let target;
        
        if (e.type === "keydown") {
            
            if ((e.key === "Enter" || e.key === " ") && document.activeElement.classList.contains("drop-topic")) {
                e.preventDefault();
                target = document.activeElement;
            } else {
                return; // ignore other keys
            }
        } else if (e.type === "click") {
            // Ignore clicks triggered by keyboard
            if (e.detail === 0) return;
            target = e.target.closest(".drop-topic");
            if (!target) return;
        }
        // Unified toggle logic
        const topic = target.closest(".topic");
        // console.log("Toggled dropdown:", topic);
        if (topic) {
            toggleTopicSnips(topic)
        }
        if (!topic) return;
    }
}
function toggleTopicSnips(topic) {
    console.log(topic)
    const topicSnips = topic.querySelector('.topic-snips')
    topicSnips.classList.toggle("hide"); // example toggle

}
initDropDowns()