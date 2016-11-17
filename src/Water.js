
"use strict"

class Water {

    constructor() {

    }

    createWaterMesh(worldMapWidth, worldMapDepth, renderer, camera, scene, light) {
        var water = this.getWater(renderer, camera, scene, light);
        var mirrorMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( worldMapWidth, worldMapDepth ),
            water.material
        );
        mirrorMesh.add( water );
        mirrorMesh.rotation.x = - Math.PI * 0.5;
        mirrorMesh.position.y = 194;
        return mirrorMesh;
    }

    getWater(renderer, camera, scene, light) {
        var waterNormals = new THREE.TextureLoader().load( 'textures/waternormals.jpg' );
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
        this.water = new THREE.Water( renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha: 	1.0,
            sunDirection: light.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0xffffff,
            distortionScale: 50.0,
        } );
        return this.water;
    }
}