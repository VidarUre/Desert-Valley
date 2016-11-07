class World {

    constructor(state) {
        this.state = state; // Store the injected state

        // Skybox
        this.skybox = new Skybox();
        this.state.scene.add(this.skybox.getSkybox());


        // Terrain
        //this.terrain = new THREE.Object3D();
        //this.terrain.terrainMesh = Terrain.init(worldMapWidth, worldMapHeight, worldMapDepth, scene);
        //this.state.scene.add(this.terrain);

        // Rocks

        // Trees?

        // Flames

        // Water/Lava

        // Fog?
    }
}