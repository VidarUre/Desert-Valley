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
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshPhongMaterial({
                color:0xffffff,
                map: brickTexture,
                bumpMap: brickBumpMap
            })
        );
        scene.add(brick);
        brick.position.set(400, 400, 400);
        brick.receiveShadow = true;
        brick.castShadow = true;

    }
}