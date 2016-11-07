"use strict"

class Skybox {

    constructor() {

    }

    generateSkyboxMaterials() {
        this.textureURLs = [
            "../Oblig4/textures/skybox/DarkStormyLeft2048.png",
            "../Oblig4/textures/skybox/DarkStormyRight2048.png",
            "../Oblig4/textures/skybox/DarkStormyUp2048.png",
            "../Oblig4/textures/skybox/DarkStormyDown2048.png",
            "../Oblig4/textures/skybox/DarkStormyFront2048.png",
            "../Oblig4/textures/skybox/DarkStormyBack2048.png"
        ];

        this.materials = [];
        for (var i = 0; i < 6; i++) {
            var texture = THREE.ImageUtils.loadTexture(this.textureURLs[i]);
            this.materials.push( new THREE.MeshBasicMaterial( {
                color: "white",  // Color will be multiplied by texture color.
                side: THREE.BackSide,  // IMPORTANT: To see the inside of the cube,
                                       //            back faces must be rendered!
                map: texture
            } ) );

        }

        return this.materials;
    }
}