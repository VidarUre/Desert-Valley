"use strict"

class Terrain {

    constructor() {
        this.heightMapImage = document.getElementById('heightmap');
        this.terrainData = getPixelValues(this.heightMapImage, 'r');
        this.heightMapWidth = this.heightMapImage.width;
        this.heightMapDepth = this.heightMapImage.height;

        this.heightMapTexture = THREE.ImageUtils.loadTexture(this.heightMapImage.src);
    }

    init(worldMapWidth, worldMapMaxHeight, worldMapDepth) {
        var heightMapGeometry = new HeightMapBufferGeometry(this.terrainData, this.heightMapWidth, this.heightMapDepth);
        // We scale the geometry to avoid scaling the node, since scales propagate.
        heightMapGeometry.scale(worldMapWidth, worldMapMaxHeight, worldMapDepth);

        var sandTexture = this.wrapTexture('textures/sand4.jpg');
        var terrainMaterialImp = this.terrainMaterial(sandTexture);

        var terrainMesh = new HeightMapMesh(heightMapGeometry, terrainMaterialImp);
        terrainMesh.receiveShadow = true;

        return terrainMesh;
    }

    wrapTexture(textureString) {
        var objectTexture = THREE.ImageUtils.loadTexture(textureString);
        objectTexture.wrapS = THREE.RepeatWrapping;
        objectTexture.wrapT = THREE.RepeatWrapping;
        return objectTexture;
    }

    terrainMaterial(sandtexture) {
        var tmi = new THREE.MeshPhongMaterial({
            map: sandtexture
        });
        return tmi;
    }
}