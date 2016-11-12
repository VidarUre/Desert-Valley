
"use strict"

class Grass {

    constructor() {

    }

    generateGrass() {
        var grassGeometry = new THREE.Geometry();
        var sprite = new THREE.TextureLoader().load("../Oblig4/textures/grassbillboard.png");

        this.addGrass(245, 350, 250, grassGeometry);
        this.addGrass(282, 350, 327, grassGeometry);
        this.addGrass(1383, 350, 212, grassGeometry);
        this.addGrass(1389, 350, 489, grassGeometry);
        this.addGrass(289, 350, 219, grassGeometry);
        this.addGrass(238, 350, 429, grassGeometry);
        this.addGrass(390, 350, 182, grassGeometry);
        this.addGrass(428, 350, 249, grassGeometry);
        this.addGrass(981, 350, 918, grassGeometry);
        this.addGrass(891, 350, 138, grassGeometry);
        this.addGrass(289, 350, 218, grassGeometry);
        this.addGrass(908, 350, 289, grassGeometry);
        this.addGrass(189, 350, 248, grassGeometry);
        this.addGrass(849, 350, 127, grassGeometry);
        this.addGrass(901, 350, 1843, grassGeometry);
        this.addGrass(982, 350, 1895, grassGeometry);
        this.addGrass(819, 350, 2891, grassGeometry);
        this.addGrass(489, 350, 1839, grassGeometry);

        var grassMaterial = new THREE.PointsMaterial({
            size: 100,
            sizeAttenuation: true,
            map: sprite,
            alphaTest: 0.5,
            transparent: true
        });

        grassMaterial.color.setHSL(1.0, 0.3, 0.7);
        var particles = new THREE.Points(grassGeometry, grassMaterial);
        return particles;
    }

    addGrass(x, y, z, geometry) {
        var vertex = new THREE.Vector3(x, y, z);
        geometry.vertices.push(vertex);
    }
}