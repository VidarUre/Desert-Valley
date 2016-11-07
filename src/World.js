class World {

    constructor(state) {
        this.state = state; // Store the injected state

        // Terrain
        let heightMapWidth = 512;
        let heightMapDepth = 512;
        let worldMapWidth = 100 * heightMapWidth;
        let worldMapDepth = 100 * heightMapDepth;
        let worldMapMaxHeight = 1000;
        var terrain = new Terrain();
        var terrainMesh = terrain.init(worldMapWidth, worldMapMaxHeight, worldMapDepth);
        this.state.scene.add(terrainMesh);

        // Skybox
        let skybox = new Skybox();
        let skyboxMaterials = skybox.generateSkyboxMaterials();
        let skyboxWidth = worldMapWidth;
        let skyboxDepth = worldMapDepth;
        let skyboxHeight = 20000;
        this.cube = new THREE.Mesh(new THREE.CubeGeometry(skyboxWidth, skyboxHeight, skyboxDepth), new THREE.MeshFaceMaterial(skyboxMaterials));
        this.state.scene.add(this.cube);

        // Palace?

        // Palm trees?

        // Water

        // Camels

        // Light
        let amb = new THREE.AmbientLight(0xFFFFFF);
        this.state.scene.add(amb)

        // Fog
    }
}