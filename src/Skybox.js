"use strict"

class Skybox {

    constructor() {

    }

    generateSkyboxMaterials() {
        this.textureURLs = [
            "../Oblig4/textures/skybox/TropicalSunnyDayLeft2048.png",
            "../Oblig4/textures/skybox/TropicalSunnyDayRight2048.png",
            "../Oblig4/textures/skybox/TropicalSunnyDayUp2048.png",
            "../Oblig4/textures/skybox/TropicalSunnyDayDown2048.png",
            "../Oblig4/textures/skybox/TropicalSunnyDayFront2048.png",
            "../Oblig4/textures/skybox/TropicalSunnyDayBack2048.png"
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