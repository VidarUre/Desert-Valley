
"use strict"

class Water {

    constructor() {

    }

    createWater(wmw, wmd) {
        var geometry = new THREE.PlaneBufferGeometry(wmw, wmd);

        var texture = THREE.ImageUtils.loadTexture("../Oblig4/textures/water.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        texture.repeat.set(4, 4);

        var material = new THREE.MeshPhongMaterial({map: texture, transparent: true, opacity: 0.7, shininess: 40});
        var plane = new THREE.Mesh(geometry, material);
        plane.material.side = THREE.DoubleSide;
        plane.position.y = 194;
        plane.rotateX(Math.PI / 2);

        return plane;
    }
}