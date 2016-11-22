class World {

    // "Glues" all the application components together into the scene
    constructor(state) {
        this.state = state; // Store the injected state
        var scene = this.state.scene;
        var manager = new THREE.LoadingManager();
        var loader = new THREE.ObjectLoader(manager);

        // Light
        var dirLight = new THREE.DirectionalLight(0xffffbb, 1);
        dirLight.position.set(5600, 7000, 300);
        dirLight.castShadow = true;
        dirLight.shadowCameraRight = 5;
        dirLight.shadowCameraLeft = -5;
        dirLight.shadowCameraTop = 5;
        dirLight.shadowCameraBottom = -5;
        dirLight.shadowCameraVisible = true;

        scene.add(dirLight);

        //scene.add(new THREE.DirectionalLightHelper(dirLight, 10));

        // Terrain
        var heightMapWidth = 512;
        var heightMapDepth = 512;
        var worldMapWidth = 100 * 0.3 * heightMapWidth;
        var worldMapDepth = 100 * 0.3 * heightMapDepth;
        var worldMapMaxHeight = 1000;
        var terrain = new Terrain();
        var terrainMesh = terrain.init(worldMapWidth, worldMapMaxHeight, worldMapDepth);
        scene.add(terrainMesh);

        // Skybox
        var skybox = new Skybox();
        var skyboxMaterials = skybox.generateSkyboxMaterials();
        var skyboxWidth = 3*worldMapWidth;
        var skyboxDepth = 3*worldMapDepth;
        var skyboxHeight = 20000;
        this.cube = new THREE.Mesh(new THREE.CubeGeometry(skyboxWidth, skyboxHeight, skyboxDepth), new THREE.MeshFaceMaterial(skyboxMaterials));
        scene.add(this.cube);

        // Fog
        // var fog = new Fog();
        // fog.makeFog(scene);

        // Cactus
        var cactus = new Cactus();
        cactus.setUpCacti(scene, loader);

        // UFO to camera
        var ufo = new UFO();
        ufo.createUFO(this.state.camera, loader);

        // Pyramid
        var pyramid = new Pyramid();
        pyramid.createPyramid(scene, loader);

        // Brick with bump mapping
        this.cube = new Cube();
        this.cube.createCube(scene);

        // Water
        var waterInstance = new Water();
        this.water = waterInstance.createWaterMesh(worldMapWidth, worldMapDepth, this.state.renderer, this.state.camera, scene, dirLight);
        scene.add(this.water);

        // Grass
        var grassInstance = new Grass();
        var grass = grassInstance.generateGrass();
        scene.add(grass);
    }

    // Changes values in the water material for every rendered frame, creating wave movement
    animateWater() {
        this.water.material.uniforms.time.value += 1.0/60.0;
    }

    animateCube() {
        this.cube.rotateCube();
    }

}