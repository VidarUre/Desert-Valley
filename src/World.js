class World {

    // "Glues" all the application components together into the scene
    constructor(state) {
        this.state = state; // Store the injected state
        let scene = this.state.scene;
        let manager = new THREE.LoadingManager();
        let loader = new THREE.ObjectLoader(manager);

        // Light
        var dirLight = new THREE.DirectionalLight(0xffffbb, 1);
        dirLight.position.set(5600, 7000, 300);
        dirLight.castShadow = true;
        dirLight.shadowCameraVisible = true;
        dirLight.shadowDarkness = 0.5;
        dirLight.shadowCameraRight = 5;
        dirLight.shadowCameraLeft = -5;
        dirLight.shadowCameraTop = 5;
        dirLight.shadowCameraBottom = -5;
        scene.add(dirLight);

        //scene.add(new THREE.DirectionalLightHelper(dirLight, 10));

        // Terrain
        let heightMapWidth = 512;
        let heightMapDepth = 512;
        let worldMapWidth = 100 * 0.3 * heightMapWidth;
        let worldMapDepth = 100 * 0.3 * heightMapDepth;
        let worldMapMaxHeight = 1000;
        var terrain = new Terrain();
        var terrainMesh = terrain.init(worldMapWidth, worldMapMaxHeight, worldMapDepth);
        scene.add(terrainMesh);

        // Skybox
        let skybox = new Skybox();
        let skyboxMaterials = skybox.generateSkyboxMaterials();
        let skyboxWidth = 3*worldMapWidth;
        let skyboxDepth = 3*worldMapDepth;
        let skyboxHeight = 20000;
        this.cube = new THREE.Mesh(new THREE.CubeGeometry(skyboxWidth, skyboxHeight, skyboxDepth), new THREE.MeshFaceMaterial(skyboxMaterials));
        scene.add(this.cube);

        // Fog
        // let fog = new Fog();
        // fog.makeFog(scene);

        // Cactus
        let cactus = new Cactus();
        cactus.setUpCacti(scene, loader);

        // UFO to camera
        let ufo = new UFO();
        ufo.createUFO(this.state.camera, loader);

        // Pyramid
        let pyramid = new Pyramid();
        pyramid.createPyramid(scene, loader);

        // Water
        let waterInstance = new Water();
        this.water = waterInstance.createWaterMesh(worldMapWidth, worldMapDepth, this.state.renderer, this.state.camera, scene, dirLight);
        scene.add(this.water);

        // Grass
        let grassInstance = new Grass();
        let grass = grassInstance.generateGrass();
        scene.add(grass);
    }

    // Changes values in the water material for every rendered frame, creating wave movement
    animateWater() {
        this.water.material.uniforms.time.value += 1.0/60.0;
    }

}