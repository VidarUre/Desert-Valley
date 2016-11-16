
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

    createWater2(worldMapWidth, worldMapDepth, renderer, camera, scene, light) {
        var waterNormals = new THREE.TextureLoader().load( 'textures/waternormals.jpg' );
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
        this.water = new THREE.Water( renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha: 	1.0,
            sunDirection: light.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0xadd8e6,
            distortionScale: 50.0,
        } );
        var mirrorMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( worldMapWidth, worldMapDepth ),
            this.water.material
        );
        mirrorMesh.add( this.water );
        mirrorMesh.rotation.x = - Math.PI * 0.5;
        mirrorMesh.position.y = 194;
        return mirrorMesh;
    }
}