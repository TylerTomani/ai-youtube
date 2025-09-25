addEventListener('keydown', e => {
    let key = e.key.toLowerCase()
    if(key === 'b'){
       const backLink = document.querySelector('#backLink')
       backLink.focus()
    }
    if(key === 'c'){
        const codeComShortcutsLink = document.querySelector('#codeComShortcutsLink')
        codeComShortcutsLink.focus()
    }
    if(key === 'd'){
        const darkModeBtn = document.querySelector('#darkModeBtn')
        darkModeBtn.focus()
    }
    else if(key === 't' || key === 's'){
        const topicsTempId = document.querySelector('#topicsTempId')
        scroll(0,0)
        topicsTempId.focus()
        topicsTempId.style.transform = 'scale(2)'
        topicsTempId.style.marginLeft = '80%'
    } 
    else if(key === 'h'){
        const homePageLink = document.querySelector('#homePageLink')
        homePageLink.focus()
    } else if(key === 'm'){
        const mainTargetDiv = document.querySelector('#mainTargetDiv')
        mainTargetDiv.focus()
        scrollTo(0,0)
    } else if(key === 'n'){
        const navBarLessonTitle = document.querySelector('#navBarLessonTitle')
        navBarLessonTitle.focus()
    } else{
        topicsTempId.style.transform = 'scale(1)'
        topicsTempId.style.marginLeft = '0%'
    }
});