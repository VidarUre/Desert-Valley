"use strict"

class Cube {

    constructor() {

    }

    createCube(scene) {
        let brick, brickTexture, brickBumpMap;

        let textureLoader = new THREE.TextureLoader();
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
        brick.position.set(1000, 1000, 1000);
        brick.receiveShadow = true;
        brick.castShadow = true;

    }
}