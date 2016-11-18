"use strict"

class Terrain {

    // Constructs the Terrain with the height map file, width and depth
    constructor() {
        this.heightMapImage = document.getElementById('heightmap');
        this.terrainData = getPixelValues(this.heightMapImage, 'r');
        this.heightMapWidth = this.heightMapImage.width;
        this.heightMapDepth = this.heightMapImage.height;
    }

    // Initializes the terrain mesh
    init(worldMapWidth, worldMapMaxHeight, worldMapDepth) {
        var heightMapGeometry = new HeightMapBufferGeometry(this.terrainData, this.heightMapWidth, this.heightMapDepth);
        heightMapGeometry.scale(worldMapWidth, worldMapMaxHeight, worldMapDepth);

        var sandTexture = this.wrapTexture('textures/sand4.jpg');
        var terrainMaterialImp = this.terrainMaterial(sandTexture);

        var terrainMesh = new HeightMapMesh(heightMapGeometry, terrainMaterialImp);
        terrainMesh.receiveShadow = true;

        return terrainMesh;
    }

    // Wraps the texture and returns it
    wrapTexture(textureString) {
        var objectTexture = THREE.ImageUtils.loadTexture(textureString);
        objectTexture.wrapS = THREE.RepeatWrapping;
        objectTexture.wrapT = THREE.RepeatWrapping;
        return objectTexture;
    }

    // Creates the terrain material as a MeshPhongMaterial to apply reflection
    terrainMaterial(sandtexture) {
        var tmi = new THREE.MeshPhongMaterial({
            map: sandtexture
        });
        return tmi;
    }
}