
"use strict"

class Water {

    constructor() {

    }

    createWater(renderer, camera, scene, light) {

        let waterNormals = new THREE.TextureLoader().load( '../Oblig4/textures/waternormals.jpg' );
        waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

        this.water = new THREE.Water( renderer, camera, scene, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            alpha:  1.0,
            sunDirection: light.position.clone().normalize(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 50.0,
        } );


        this.mirrorMesh = new THREE.Mesh(
            new THREE.PlaneBufferGeometry( parameters.width * 500, parameters.height * 500 ),
            this.water.material
        );

        this.mirrorMesh.add( water );
        this.mirrorMesh.rotation.x = - Math.PI * 0.5;
        return this.mirrorMesh;
    }
}