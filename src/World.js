class World {

    constructor(state) {
        this.state = state; // Store the injected state
        let scene = this.state.scene;
        let manager = new THREE.LoadingManager();
        let loader = new THREE.ObjectLoader(manager);

        // Light
        let ambLight = new THREE.AmbientLight(0xFFFFFF);
        scene.add(ambLight)

        var dirLight = new THREE.DirectionalLight( 0xffffbb, 1 );
        dirLight.position.set( - 1, 1, - 1 );
        scene.add( dirLight );

        // Terrain
        let heightMapWidth = 512;
        let heightMapDepth = 512;
        let worldMapWidth = 100 * heightMapWidth;
        let worldMapDepth = 100 * heightMapDepth;
        let worldMapMaxHeight = 1000;
        var terrain = new Terrain();
        var terrainMesh = terrain.init(worldMapWidth, worldMapMaxHeight, worldMapDepth);
        scene.add(terrainMesh);

        // Skybox
        let skybox = new Skybox();
        let skyboxMaterials = skybox.generateSkyboxMaterials();
        let skyboxWidth = worldMapWidth;
        let skyboxDepth = worldMapDepth;
        let skyboxHeight = 20000;
        this.cube = new THREE.Mesh(new THREE.CubeGeometry(skyboxWidth, skyboxHeight, skyboxDepth), new THREE.MeshFaceMaterial(skyboxMaterials));
        scene.add(this.cube);

        //Palace?

        // Palm trees?

        // Camels

        // Cactus
        let cactusFile = '../Oblig4/models/cactus.json';
        this.addObject(scene, loader, cactusFile, 3600, 550, 3600, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 4500, 600, 3600, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 5000, 600, 4000, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 5300, 600, 4300, 500, 500, 500);
        this.addObject(scene, loader, cactusFile, 5600, 600, 3600, 500, 500, 500);

        // Water
        //let water = new Water(this.state.renderer, this.state.camera, scene, dirLight);
        //scene.add(water.createWater());

        // Grass

        // Fog
    }

    addObject(scene, loader, file, posx, posy, posz, scalex, scaley, scalez) {

        loader.load(file, function ( object ) {

            object.position.x = posx;
            object.position.y = posy;
            object.position.z = posz;
            object.scale.x = scalex;
            object.scale.y = scaley;
            object.scale.z = scalez;
            scene.add(object);
        });
    }
}