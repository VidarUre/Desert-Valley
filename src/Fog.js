"use strict"

class Fog {
    constructor() {

    }

    makeFog(scene) {
        scene.fog = new THREE.FogExp2( 0xefd1b5, 0.00025 );
    }
}