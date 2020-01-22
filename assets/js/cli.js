window.onload = (event) => {
    let wrapper = document.querySelector('.wrapper')
    // DOM : Hide wrapper 
    wrapper.classList.add('hideOp')
    let modal = document.querySelector('.warning-modal')
    let loader = document.querySelector('.loading-wrapper')



    function toggleModal() {
        wrapper.classList.remove('hideOp')
        wrapper.classList.add('scroll-dp')
        modal.classList.add('hideDp')
    }

    modal.addEventListener('click', toggleModal, false)


    setTimeout(function () {
        loader.classList.add('hideOp')
        modal.classList.remove('hideDp')
        document.getElementById('transition').classList.add('transition-dp');
    }, 3000);


    // Get current date | time
    const timeWrapper = document.querySelector('.hours')
    const dateWrapper = document.querySelector('.day')
    const optionMedDate = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    setInterval(() => {
        const date = new Date()
        const formatedDate = date.toLocaleDateString('en-us', optionMedDate)
        const formatedTime = date.toLocaleTimeString('en-US')
        dateWrapper.innerHTML = formatedDate
        timeWrapper.innerHTML = formatedTime
    }, 1)


    // CLI CONSOLE 


    cliInput = document.querySelector('.console-input');
    resultWrapper = document.querySelector('.results-wrapper')
    cliCursor = document.querySelector('.input-cursor')


    function listenInputCli() {
        let inputValue = cliInput.value
        cliCursor.classList.add('hideDp')
        return inputValue
    }

    cliInput.addEventListener('input', () => {
        listenInputCli()
    })


    cliInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            let input = listenInputCli()
            if (input === 'reset --force rep1 hand') {
                // reset input 
                cliInput.value = ""
                // Inject result 
                let commandHistory = document.createElement("div")
                commandHistory.className = "result-line"
                let resultLine = document.createElement("div")
                resultLine.className = "result-line"
                resultWrapper.appendChild(commandHistory, resultLine)
                resultWrapper.appendChild(resultLine)
                commandHistory.appendChild(document.createTextNode('$nwalace > ' + input))
                resultLine.appendChild(document.createTextNode('エラ$_error : Could not connect to replicant_N6MAA10816'))
            } else {
                // reset input 
                cliInput.value = ""
                // Inject result 
                let commandHistory = document.createElement("div")
                commandHistory.className = "result-line"
                let resultLine = document.createElement("div")
                resultLine.className = "result-line"
                resultWrapper.appendChild(commandHistory, resultLine)
                resultWrapper.appendChild(resultLine)
                commandHistory.appendChild(document.createTextNode('$nwalace > ' + input))
                resultLine.appendChild(document.createTextNode('エラ$_error^'))
            }
        }
    })



}