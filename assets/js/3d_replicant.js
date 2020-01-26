window.addEventListener('load', (event) => {

    setTimeout(() => {
        const sceneContainer = document.querySelector('.replicant3d-wrapper')
        const boundingClientRect = sceneContainer.getBoundingClientRect()
        console.log(boundingClientRect);

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
            let replicantScene = gltf.scene
            const box = new THREE.Box3().setFromObject(replicantScene)
            const center = box.getCenter(new THREE.Vector3())
            // Align scene
            replicantScene.position.x += (gltf.scene.position.x - center.x)
            replicantScene.position.y += (gltf.scene.position.y - center.y)
            replicantScene.position.z += (gltf.scene.position.z - center.z)
            console.log(replicantScene)

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
                //  hand.rotation.y += 0.01 
                renderer.render(scene, camera)
            }
            animate()

        }, undefined, function (error) {

            console.error(error)

        })

    }, 3100)
})