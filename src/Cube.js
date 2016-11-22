"use strict"

class Cube {

    constructor() {
        this.brick;
    }

    createCube(scene) {
        var brickTexture, brickBumpMap;

        var textureLoader = new THREE.TextureLoader();
        brickTexture = new textureLoader.load("../Oblig4/textures/brick/brick.jpg");
        brickBumpMap = new textureLoader.load("../Oblig4/textures/brick/brickMap.png");

        this.brick = new THREE.Mesh(
            new THREE.BoxGeometry(500, 500, 500),
            new THREE.MeshPhongMaterial({
                color:0xffffff,
                map: brickTexture,
                bumpMap: brickBumpMap
            })
        );
        scene.add(this.brick);
        var ambiColor = 0x404040;
        var ambientLight = new THREE.AmbientLight(ambiColor);
        this.brick.add(ambientLight);
        this.brick.position.set(1000, 1000, 1000);
        this.brick.receiveShadow = true;
        this.brick.castShadow = true;

    }

    rotateCube() {
        var rotation = [0.0, 0.015, 0.005];
        this.brick.rotation.x += rotation[0];
        this.brick.rotation.y += rotation[1];
        this.brick.rotation.z += rotation[2];
    }
}