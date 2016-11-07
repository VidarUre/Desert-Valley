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

        var grassTexture = this.wrapTexture('textures/Gras_01.png');
        var rockTexture = this.wrapTexture('textures/rock.jpg');
        var terrainMaterialImp = this.terrainMaterial(grassTexture, rockTexture);

        var terrainMesh = new HeightMapMesh(heightMapGeometry, terrainMaterialImp);

        return terrainMesh;
    }

    wrapTexture(textureString) {
        var objectTexture = THREE.ImageUtils.loadTexture(textureString);
        objectTexture.wrapS = THREE.RepeatWrapping;
        objectTexture.wrapT = THREE.RepeatWrapping;
        return objectTexture;
    }

    terrainMaterial(grassTexture, rockTexture) {
        var tmi = new THREE.ShaderMaterial({
            // We are reusing vertex shader from MeshBasicMaterial

            defines: {
                'USE_MAP': true
            },

            uniforms: {
                'heightMap': {type: 't', value: this.heightMapTexture},

                'grass': {type: 't', value: grassTexture},

                'rock': {type: 't', value: rockTexture},

                'grassLevel': {type: 'f', value: 0.1},

                'rockLevel': {type: 'f', value: 0.6},

                // Scale the texture coordinates when coloring the terrain
                'terrainTextureScale': {type: 'v2', value: new THREE.Vector2(200, 200)},

                // This is a default offset (first two numbers), and repeat (last two values)
                // Just use the default values to avoid fiddling with the uv-numbers from the vertex-shader
                'offsetRepeat': {type: 'v4', value: new THREE.Vector4(0, 0, 1, 1)}
            },

            vertexShader: THREE.ShaderLib['basic'].vertexShader,
            fragmentShader: document.getElementById('terrain-fshader').textContent,
        });
        return tmi;
    }
}