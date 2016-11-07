"use strict"

class Terrain {

    constructor() {
        var heightMapImage = document.getElementById('heightmap');
        var terrainData = getPixelValues(heightMapImage, 'r');
        var heightMapWidth = heightMapImage.width;
        var heightMapHeight = heightMapImage.height;

        var heightMapTexture = THREE.imageUtils.loadTexture(heightMapImage.src);
    }

    init(worldMapWidth, worldMapHeight, worldMapDepth, scene) {
        var heightMapGeometry = new HeightMapBufferGeometry(terrainData, heightMapWidth, heightMapDepth);
        // We scale the geometry to avoid scaling the node, since scales propagate.
        heightMapGeometry.scale(worldMapWidth, worldMapMaxHeight, worldMapDepth);

        var grassTexture = wrapTexture('../texture/Gras_01.png');
        var terrainMaterialImp = HeightMapMesh(heightMapGeometry, terrainMaterial);

        var terrainMesh = new HeightMapMesh(heightMapGeometry, terrainMaterial())
    }

    wrapTexture(textureString) {
        var objectTexture = THREE.ImageUtils.loadTexture(textureString);
        objectTexture.wrapS = THREE.RepeatWrapping;
        objectTexture.wrapT = THREE.RepeatWrapping;
        return objectTexture;
    }

    terrainMaterial() {
        var tmi = new THREE.ShaderMaterial({
            // We are reusing vertex shader from MeshBasicMaterial

            defines: {
                'USE_MAP': true
            },

            uniforms: {
                'heightMap': {type: 't', value: heightMapTexture},

                'grass': {type: 't', value: grassTexture},

                'grassLevel': {type: 'f', value: 0.1},

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