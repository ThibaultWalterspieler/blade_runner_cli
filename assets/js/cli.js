/**
 * @author Thibault Walterspieler <thibault@walterspieler.com>
 */

window.onload = (event) => {
    console.log([
        `                            `,
        `    ___  __   ___   ___  ____`,
        `   / _ )/ /  / _ | / _  / __/`,
        `  / _  / /__/ __ |/ // / _/`,
        ` /____/____/_/ |_/____/___/`,
        `                             `,
        `    ___   __  __ _  __ _  __ ____ ___`,
        `   / _ / / / / // |/ // |/ // __// _`,
        `  / , _// /_/ //    //    // _/ / , _/`,
        ` /_/|_| _____//_/|_//_/|_//___//_/|_|`,
        ``,
    ].join('\n'))
    console.log('%c CLI 0.1 by Thibault Walterspieler', 'color: #ecbb19');



    //  CLI VERSION 0.1 by Thibault Walterspieler

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
                         disable --c : disable current replicant</br>
                         sudo rm -rf * : s delete recursively all files without any confirmation</br>
                         More commands in cli.js
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
                'awwwards': () => {
                    injectCliResult(
                        `Redirection to 217.160.0.180
                        `, input)
                    setTimeout(() => {
                        window.open('https://bruno-simon.com', '_blank');
                    }, 1500);
                },
                'sudo rm -rf *': () => {
                    injectCliResult(
                        `エラ$_error エラ$_error エラ$_e_1rror エラ$_error
                        `, input)
                    // replicantScene.rotation.y = 400
                    function animate() {
                        requestAnimationFrame(animate)
                        // Replicatant rotation 
                        replicantScene.rotation.y += 400
                        replicantScene.rotation.z += 400
                        replicantScene.rotation.x += 400
                    }
                    animate()
                },

                'default': () => {
                    injectCliResult(`command not found: Type help for commands list` + input, input)
                }
            };

            if (inputPossibilities.hasOwnProperty(input)) {
                inputPossibilities[input]()
            } else {
                inputPossibilities['default']()
            }
        }
    })

    setTimeout(() => {
        const sceneContainer = document.querySelector('.replicant3d-wrapper')
        const boundingClientRect = sceneContainer.getBoundingClientRect()
        const sceneWidth = boundingClientRect.width
        const sceneHeight = boundingClientRect.height


        let scene = new THREE.Scene()
        let camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000)
        let renderer = new THREE.WebGLRenderer({
            antialias: true
        })
        renderer.setSize(sceneWidth, sceneHeight)
        sceneContainer.appendChild(renderer.domElement)

        // Set scene backgorund
        scene.background = new THREE.Color(0x252525)
        // Set light
        let light = new THREE.AmbientLight(0x404040)
        // Add light on scene 
        scene.add(light)

        camera.position.z = 5

        let loader = new THREE.GLTFLoader()
        let rep1
        loader.load('./assets/models_3d/replicant.glb', function (gltf) {
            replicantScene = gltf.scene
            const box = new THREE.Box3().setFromObject(replicantScene)
            const center = box.getCenter(new THREE.Vector3())
            // Align scene
            replicantScene.position.x += (gltf.scene.position.x - center.x)
            replicantScene.position.y += (gltf.scene.position.y - center.y)
            replicantScene.position.z += (gltf.scene.position.z - center.z)

            body = replicantScene.children[0]
            hand = replicantScene.children[1]


            body.material.wireframe = true
            hand.visible = true
            body.material.wireframeLinewidth = .000001
            hand.material.wireframe = true
            hand.material.wireframeLinewidth = .000001
            let light = new THREE.PointLight(0xecbb19)
            light.position.set(50, 50, 50)
            // body.geometry.center() 
            //  hand.geometry.center() 
            //  hand.material.color = new THREE.Color(0xecbb19) 
            // let rep = new THREE.Mesh(rep1, materialRep) 
            replicantScene.scale.set(.8, .8, .8)
            // replicantScene.geometry.center() 
            // body.geometry.center() 
            // body.geometry.center() 
            scene.add(replicantScene, light)

            function animate() {
                requestAnimationFrame(animate)
                // Replicatant rotation 
                replicantScene.rotation.y += .01
                // Glitch hand 
                setInterval(() => {
                    hand.visible = false
                    setInterval(() => {
                        hand.visible = true
                    }, 2000)
                }, 1000)
                renderer.render(scene, camera)
            }
            animate()

        }, undefined, function (error) {

            console.error(error)

        })

    }, 3100)
}