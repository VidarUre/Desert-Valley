"use strict"

class Cube {

    constructor() {

    }

    createCube(scene) {
        var brick, brickTexture, brickBumpMap;

        var textureLoader = new THREE.TextureLoader();
        brickTexture = new textureLoader.load("../Oblig4/textures/brick/brick.jpg");
        brickBumpMap = new textureLoader.load("../Oblig4/textures/brick/brickMap.png");

        brick = new THREE.Mesh(
            new THREE.BoxGeometry(500, 500, 500),
            new THREE.MeshPhongMaterial({
                color:0xffffff,
                map: brickTexture,
                bumpMap: brickBumpMap
            })
        );
        scene.add(brick);
        var ambiColor = 0x404040 ;
        var ambientLight = new THREE.AmbientLight(ambiColor);
        brick.add(ambientLight);
        brick.position.set(1000, 1000, 1000);
        brick.receiveShadow = true;
        brick.castShadow = true;

    }
}