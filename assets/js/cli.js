window.onload = (event) => {
    let body = document.querySelector('body')
    let wrapper = document.querySelector('.wrapper')
    // DOM : Hide wrapper 
    wrapper.classList.add('hideOp')
    let modal = document.querySelector('.warning-modal')
    let modalButton = document.querySelector('.view-button')
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
        modalPosition = modal.getBoundingClientRect()
        modalButtonPosition = modalButton.getBoundingClientRect()
        cliInput.focus()
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

    cliInput = document.querySelector('.console-input')
    resultWrapper = document.querySelector('.results-wrapper')
    cliCursor = document.querySelector('.input-cursor')

    // Get initial cli position 
    cliInputPosition = cliInput.getBoundingClientRect()


    // get click position
    function getClickPosition(e) {
        e = e || window.event
        let pageX = e.pageX
        let pageY = e.pageY
        let clickPosition = {
            x: pageX,
            y: pageY
        }
        return clickPosition
    }

    // Listen click in function of position
    body.addEventListener('click', () => {
        if (
            // Listen click on terminal input 
            getClickPosition().x >= cliInputPosition.x &&
            getClickPosition().x <= cliInputPosition.x + cliInputPosition.width &&
            getClickPosition().y >= cliInputPosition.y &&
            getClickPosition().y <= cliInputPosition.y + cliInputPosition.height) {
            // Focus on input
            cliInput.focus()
        } else if (
            // Listen click on modal hover
            getClickPosition().x >= modalPosition.x &&
            getClickPosition().x <= modalPosition.x + modalPosition.width &&
            getClickPosition().y >= modalPosition.y &&
            getClickPosition().y <= modalPosition.y + modalPosition.height
        ) {
            // hide moddal 
            toggleModal()
        }
    })

    body.addEventListener('mouseover', () => {
        if (typeof modalButtonPosition === "function") {
            if (getClickPosition().x >= modalButtonPosition.x &&
                getClickPosition().x <= modalButtonPosition.x + modalButtonPosition.width &&
                getClickPosition().y >= modalButtonPosition.y &&
                getClickPosition().y <= modalButtonPosition.y + modalButtonPosition.height) {
                modalButton.classList.add('view-button-custom-hover')
            } else {
                modalButton.classList.remove('view-button-custom-hover')
            }
        }
    })



    function listenInputCli() {
        let inputValue = cliInput.value
        cliCursor.classList.add('hideDp')
        return inputValue
    }

    function getCliInputLocation() {
        cliInputPosition = cliInput.getBoundingClientRect()
    }

    cliInput.addEventListener('input', () => {
        listenInputCli()
    })


    function injectCliResult(cliString, input) {
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
        resultLine.innerHTML = cliString
        // update cli input position 
        getCliInputLocation()
    }


    // Input possibilities





    cliInput.addEventListener('keypress', function (e) {

        if (e.key === 'Enter') {
            let input = listenInputCli()
            const inputPossibilities = {
                'help': () => {
                    injectCliResult(
                        `shutdown    : close down the system </br>
                         disable --c : disable current replicant
                        `, input)
                },
                'shutdown': () => {
                    let cpt = 5
                    injectCliResult(
                        `The system will shutdown in 
                        ` + cpt + `s`, input)
                    setTimeout(() => {
                        self.close()
                    }, 5000);
                },
                'disable --c': () => {
                    injectCliResult(
                        `Request timeout for icmp_seq 0: 
                        Error : Unable to reach rep N6MAA10816
                        `, input)
                },
                'default': () => {
                    injectCliResult('command not found: ' + input, input)
                }
            };

            if (inputPossibilities.hasOwnProperty(input)) {
                inputPossibilities[input]()
            } else {
                inputPossibilities['default']()
            }
        }
    })



}